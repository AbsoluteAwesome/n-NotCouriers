"use client";
import { Button } from "@mantine/core";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function MenageInvoices({ invoice, title }) {
  const router = useRouter();
  const handleEdit = (id) => {
    router.push(`/admin/Invoices/${id}`);
  };

  function getFormattedDate(dateStr) {
    const [day, month, year] = dateStr.split("/");
    const formattedDate = new Date(`${month}/${day}/${year}`);

    if (isNaN(formattedDate)) {
      console.error(`Invalid date: ${dateStr}`);
      return null;
    }

    const dayOfMonth = formattedDate.getDate();
    const monthName = new Intl.DateTimeFormat("en", {
      month: "short",
    }).format(formattedDate);
    const yearDigits = formattedDate.getFullYear();

    return `${dayOfMonth}/${monthName.toUpperCase()}/${yearDigits}`;
  }

  function getFormattedDateJob(dateStr) {
    // Extract month, day, and year components
    const [month, day, year] = dateStr.split("/");

    // Create a new date using the rearranged components
    const formattedDate = new Date(`${month}/${day}/${year}`);

    // Check if the date is valid before formatting
    if (isNaN(formattedDate)) {
      console.error(`Invalid date: ${dateStr}`);
      return null; // or throw an error, depending on your use case
    }

    const dayOfMonth = formattedDate.getDate();
    const monthName = new Intl.DateTimeFormat("en", {
      month: "short",
    }).format(formattedDate);
    const yearDigits = formattedDate.getFullYear();

    return `${dayOfMonth}/${monthName.toUpperCase()}/${yearDigits}`;
  }

  const renderTableRow = (row) => (
    <TableRow key={row.docId}>
      <TableCell>{title}</TableCell>
      <TableCell>{row.docId}</TableCell>
      <TableCell>
        {row.serviceInformation
          ? getFormattedDateJob(row.serviceInformation.date)
          : getFormattedDate(row.date)}
      </TableCell>
      <TableCell>
        {row.serviceInformation ? row.serviceInformation.time : row.time}
      </TableCell>
      <TableCell>$ {row.totalPrice}</TableCell>
      {/* <TableCell>address</TableCell>
      <TableCell>address</TableCell> */}
      <TableCell>
        {(row.serviceInformation && row.serviceInformation.service) ||
          row.service}
      </TableCell>
      <TableCell>
        {(row.progressInformation && row.progressInformation.booked) ||
          "Not Yet"}
      </TableCell>
      <TableCell>
        {(row.progressInformation && row.progressInformation.delivered) ||
          "Not Yet"}
      </TableCell>
      <TableCell>
        <Button
          variant="light"
          color="cyan"
          onClick={() => handleEdit(row.docId)}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );

  return (
    <TableContainer
      component={Paper}
      style={{ width: "80%", margin: "2rem auto" }}
    >
      <h1>Manage {title}</h1>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Job Number</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Invoice(Incl)</TableCell>
            {/* <TableCell>From</TableCell> */}
            {/* <TableCell>To</TableCell> */}
            <TableCell>Service</TableCell>
            <TableCell>Booked</TableCell>
            <TableCell>Delivered</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoice && invoice.map(renderTableRow)}
          {/* {place_job && place_job.map(renderTableRow)} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
