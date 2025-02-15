import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetStoresQuery } from "../../features/storeApiSlice";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetStoresQuery({ page });

  useEffect(() => {
    if (data?.stores) {
      setStores((prevStores) => {
        const storeMap = new Map(prevStores.map((s) => [s.id, s]));

        data.stores.forEach((store) => storeMap.set(store.id, store));

        return Array.from(storeMap.values());
      });
    }
  }, [data]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <InfiniteScroll
      dataLength={stores.length}
      next={fetchMoreData}
      hasMore={data?.has_next || false}
      loader={<h4>Loading...</h4>}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Subscription Ends On</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store) => (
              <TableRow
                key={store.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover={true}
                component={Link}
                to={`/store/${store.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <TableCell component="th" scope="row">
                  {store.name}
                </TableCell>
                <TableCell>{store.phone}</TableCell>
                <TableCell align="left">{store.address.addressLine1}</TableCell>
                <TableCell align="left">
                  {store.subscriptionEndDate.split("T")[0]}
                </TableCell>
                <TableCell align="right">
                  {store.isSubscriptionActive && !store.isOnTrial
                    ? "Subscribed"
                    : "OnTrial"}
                </TableCell>
                <TableCell align="right">
                  {store.isSupplier ? "Supplier" : "Retailer"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </InfiniteScroll>
  );
};

export default Stores;
