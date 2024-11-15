import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BandItem from "./BandItem";
import LoadingComponent from "./LoadingComponent";

function BandList({ bandData, isLoading, onSearch, city, bandCount }) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    onSearch(city, page + 1, limit);
  };

  const handlePrevPage = () => {
    if (page >= 0) {
      setPage((prev) => prev - 1);
      onSearch(city, page - 1, limit);
    }
  };

  const totalPages = Math.ceil(bandCount / limit);
  const isNextPageDisabled = page >= totalPages - 1;
  const isPrevPageDisabled = page <= 0;

  return (
    <TableContainer>
      <Typography variant="h6" sx={{ padding: 2 }}>
        Band List
      </Typography>
      {bandData?.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Artist Name</TableCell>
                <TableCell>Active Since</TableCell>
                <TableCell>Current Location</TableCell>
                <TableCell>Tags</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bandData?.map((artist, index) => (
                <TableRow key={index}>
                  <TableCell>{artist?.name || "N/A"}</TableCell>
                  <TableCell>{artist?.["life-span"]?.begin || "N/A"}</TableCell>
                  <TableCell>{artist?.area?.name || "N/A"}</TableCell>
                  <TableCell>
                    {artist?.tags ? (
                      <BandItem tags={artist?.tags} />
                    ) : (
                      "No Tags Available"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                mb: 2,
              }}
            >
              <Button
                variant="contained"
                onClick={handlePrevPage}
                disabled={isPrevPageDisabled}
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  "&:disabled": { backgroundColor: "#ddd" },
                }}
              >
                Previous
              </Button>
              <Typography variant="body1">Page: {page + 1}</Typography>
              <Button
                disabled={isNextPageDisabled}
                variant="contained"
                onClick={handleNextPage}
                sx={{ backgroundColor: "#4CAF50", color: "white" }}
              >
                Next
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <FormControl variant="outlined" size="small">
                <InputLabel>Results per page</InputLabel>
                <Select
                  value={limit}
                  onChange={(e) => {
                    onSearch(city, page, Number(e.target.value));
                    setLimit(Number(e.target.value));
                  }}
                  label="Results per page"
                >
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Typography>
        </>
      ) : isLoading ? (
        <LoadingComponent text={"Loading..."} />
      ) : (
        <LoadingComponent text={"No data found"} />
      )}
    </TableContainer>
  );
}

export default BandList;
