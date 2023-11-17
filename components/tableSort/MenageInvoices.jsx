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

export default function MenageInvoices({ place_booking, place_job }) {
  const router = useRouter();

  const handleEdit = (id) => {
    router.push(`/admin/MenageInvoices/${id}`);
  };

  const renderTableRow = (row) => (
    <TableRow key={row.docId}>
      <TableCell>{row.docId}</TableCell>
      <TableCell>
        {row.serviceInformation ? row.serviceInformation.date : row.date}
      </TableCell>
      <TableCell>
        {row.serviceInformation ? row.serviceInformation.time : row.time}
      </TableCell>
      <TableCell>{0.0}</TableCell>
      <TableCell>{0.0}</TableCell>
      <TableCell>{0.0}</TableCell>
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
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Invoice(Excl)</TableCell>
            <TableCell>GST</TableCell>
            <TableCell>Invoice(Incl)</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {place_booking && place_booking.map(renderTableRow)}
          {place_job && place_job.map(renderTableRow)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}