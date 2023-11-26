"use client";

import React from "react";
import { Paper } from "@mui/material";
import { Text } from "@mantine/core";

const renderDetails = (title, details) => (
  <div>
    <br />
    <br />
    <Text tt="uppercase" size="xl" fw={900} c={"rgba(59, 58, 58, 1)"}>
      {title || "something went wrong"}
    </Text>
    {details &&
      details.map(({ label, value }, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h4 tt="uppercase" size="lg" fw={700} style={{ color: "grey" }}>
            {label || "Not Found"}:
          </h4>
          <h4 tt="uppercase" size="lg" fw={500} style={{ color: "gray" }}>
            {value || "Not Found"}
          </h4>
        </div>
      ))}
  </div>
);

const InvoiceDetails = ({ invoice, job }) => {
  const serviceInfo = invoice.serviceInformation || invoice;

  // const getAddress = (addressObj) =>
  //   addressObj && addressObj.address !== "none" ? addressObj.address : null;

  // const formatCoordinates = (coordinates) =>
  //   coordinates ? `${coordinates.lat} ${coordinates.lng}` : null;

  // const pAddress = (details) => {
  //   if (details && details.pickupDetails) {
  //     const pickupDetails = details.pickupDetails;
  //     const selectedOriginDetails = pickupDetails.selectedOriginDetails;

  //     return (
  //       formatCoordinates(selectedOrigin) ||
  //       (selectedOriginDetails && getAddress(selectedOriginDetails)) ||
  //       (pickupDetails.pickupFrequentAddress &&
  //         formatCoordinates(pickupDetails.pickupFrequentAddress)) ||
  //       "Empty"
  //     );
  //   }

  //   return "Empty";
  // };

  // const dAddress = (details) => {
  //   if (details && details.dropDetails) {
  //     const dropDetails = details.dropDetails;
  //     const selectedDestinationDetails = dropDetails.selectedDestinationDetails;

  //     return (
  //       (selectedDestinationDetails &&
  //         getAddress(selectedDestinationDetails.address)) ||
  //       (dropDetails.dropFrequentAddress &&
  //         formatCoordinates(dropDetails.dropFrequentAddress)) ||
  //       formatCoordinates(selectedDestination) ||
  //       "Empty"
  //     );
  //   }

  //   return "Empty";
  // };
  // Example usage:
  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: 20,
          margin: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "70%",
        }}
      >
        <Text tt="uppercase" size="xl" fw={900} c={"rgba(59, 58, 58, 1)"}>
          Invoice Details
        </Text>
        <div style={{ width: "80%" }}>
          {renderDetails("Account", [
            { label: "Email", value: invoice.userEmail },
            { label: "Job Number", value: invoice.docId },
          ])}

          {renderDetails("Distance Information", [
            { label: "Duration", value: invoice.distanceData.duration.text },
            { label: "Distance", value: invoice.distanceData.distance.text },
          ])}

          {renderDetails("Service Information", [
            {
              label: "Service",
              value: (serviceInfo && serviceInfo.service) || "null",
            },
            {
              label: "Weight",
              value: (serviceInfo && serviceInfo.weight) || "null",
            },
            {
              label: "Date Created",
              value: (serviceInfo && serviceInfo.date) || "null",
            },
            { label: "Distance", value: invoice.distanceData.distance.text },
            { label: "Time Created", value: serviceInfo.time },
            { label: "Cost", value: invoice.totalPrice },
          ])}

          {renderDetails("Pickup Details", [
            {
              label: "Suburb",
              value:
                (invoice.pickupDetails && invoice.pickupDetails.pickupSuburb) ||
                invoice.pickupSuburb ||
                "null",
            },
            {
              label: "Address",
              value: "soon",
            },
            {
              label: "Special Instruction",
              value:
                (invoice.pickupDetails &&
                  invoice.pickupDetails.pickupGoodsDescription) ||
                "Empty",
            },
          ])}

          {renderDetails("Drop Details", [
            {
              label: "Suburb",
              value:
                (invoice.dropDetails && invoice.dropDetails.dropSuburb) ||
                invoice.dropSuburb ||
                "null",
            },
            {
              label: "Address",
              value: "soon",
            },
            {
              label: "Drop Reference 1",
              value:
                (invoice.dropDetails && invoice.dropDetails.dropReference1) ||
                "Empty",
            },
          ])}

          {renderDetails("Progress Information", [
            {
              label: "Booked",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.booked) ||
                "Not Completed",
            },
            {
              label: "E.T.D.",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.etd) ||
                "Not Completed",
            },
            {
              label: "Allocated",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.allocated) ||
                "Not Completed",
            },
            {
              label: "Pick Up",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.pickedup) ||
                "Not Completed",
            },
            {
              label: "Delivered",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.delivered) ||
                "Not Completed",
            },
            {
              label: "P.O.D.",
              value:
                (invoice.progressInformation &&
                  invoice.progressInformation.pod) ||
                "Not Completed",
            },
          ])}
        </div>
      </Paper>
    </section>
  );
};

export default InvoiceDetails;
