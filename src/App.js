import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import BandList from "./components/BandList";

function App() {
  const [bands, setBands] = useState([]);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const city = await getCityByCoordinates(
          position.coords.latitude,
          position.coords.longitude
        );
        searchBands(city, 1, 10);
      },
      async () => {
        const response = await axios.get(process.env.REACT_APP_GEO_API);
        searchBands(response.data.city, 1, 10);
      }
    );
  }, []);

  const getCityByCoordinates = async (latitude, longitude) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const url = `${process.env.REACT_APP_OPENCAGEDATA_API}?q=${latitude}+${longitude}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.results && data.results.length > 0) {
        const city = data.results[0].components.city;
        return city || "city not found";
      }

      return "city not found";
    } catch (error) {
      console.error("Error fetching city name:", error);
      return "Error retrieving city";
    }
  };

  const searchBands = async (city, page = 1, limit = 10) => {
    setIsLoading(true);
    const tenYearsAgo = new Date().getFullYear() - 10;
    try {
      const response = await axios.get(process.env.REACT_APP_MUSIC_API, {
        params: {
          location: `${city}`,
          fmt: "json",
          limit: limit,
          offset: page,
        },
      });
      console.log("response", response);
      const bands = response.data.artists
        .filter((band) => {
          const yearFounded = parseInt(band["life-span"]?.begin);
          return yearFounded >= tenYearsAgo;
        })
        .slice(0, 50);
      setBands(bands);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="conttainer">
        <SearchBar onSearch={searchBands} city={city} setCity={setCity} />
        <BandList
          bandData={bands}
          isLoading={isLoading}
          onSearch={searchBands}
          city={city}
        />
      </div>
    </div>
  );
}

export default App;
