import CreateStore from "../Pages/store/CreateStore";
import Store from "../Pages/store/Store";
import Stores from "../Pages/store/Stores";

const storeRoutes = [
  {
    path: "/stores",
    element: (
      <>
        <title>MediFlux Stores</title>
        <Stores />
      </>
    ),
  },
  {
    path: "/create_store/",
    element: (
      <>
        <title>Create Store</title>
        <CreateStore />
      </>
    ),
  },
  {
    path: "/store/:storeId/",
    element: (
      <>
        <title>Store</title>
        <Store />
      </>
    ),
  },
];

export default storeRoutes;
