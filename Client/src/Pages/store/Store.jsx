import { useEffect, useState } from "react";
import { useGetStoreQuery } from "../../features/storeApiSlice";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import PrimaryButton from "../../globals/PirmaryButton";
import { Grid } from "@mui/material";
import Invoice from "./Invoice";
import EditStore from "./EditStore";

const Store = () => {
  const { storeId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const { data: store, isLoading, isError } = useGetStoreQuery(storeId);

  if (isLoading) {
    return <div className="text-center mt-8">Loading store details...</div>;
  }

  if (isError) {
    return (
      <div className="text-center mt-8 text-red-500">
        Error loading store details
      </div>
    );
  }

  if (!store) return null;

  const formattedEndDate = format(
    new Date(store.subscriptionEndDate),
    "d MMM yyyy"
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{store.name}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Store Information
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Contact Name
                </dt>
                <dd className="mt-1 text-gray-900">{store.contactName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-gray-900">{store.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-gray-900">{store.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">GSTIN</dt>
                <dd className="mt-1 text-gray-900">{store.gstin}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  License Number
                </dt>
                <dd className="mt-1 text-gray-900">{store.licenseNumber}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Address
            </h2>
            <address className="space-y-3 mb-8 not-italic">
              <p className="text-gray-900">
                {store.address.addressLine1}
                <br />
                {store.address.addressLine2 && (
                  <>
                    {store.address.addressLine2}
                    <br />
                  </>
                )}
                {store.address.locality}
                <br />
                {store.address.state} - {store.address.pincode}
              </p>
            </address>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Subscription Details
            </h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Subscription End Date
                </dt>
                <dd className="mt-1 text-gray-900">{formattedEndDate}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Scans Remaining
                </dt>
                <dd className="mt-1 text-gray-900">{store.scansRemaining}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd
                  className={`mt-1 ${
                    store.isSubscriptionActive
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {store.isSubscriptionActive ? "Active" : "Inactive"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          <p>Api Key: {store.apiKey}</p>
          <p>Member Since {format(new Date(store.createdAt), "d MMM yyyy")}</p>
        </div>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <PrimaryButton
            label="Edit Store"
            iconType="edit"
            fullWidth={true}
            customClasses="mt-4"
            filled={true}
            onClick={() => setIsOpen(true)}
          />

          <EditStore store={store} isOpen={isOpen} handleClose={handleClose} />
        </Grid>
        <Invoice store={store} />
      </div>
    </div>
  );
};

export default Store;
