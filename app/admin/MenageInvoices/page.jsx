"use client";
import { MenageInvoices } from "@/components/Index";
import { useEffect, useState } from "react";
import { getCollection } from "@/api/firebase/functions/fetch";

export default function Page() {
  const [place_booking, setPlace_booking] = useState([]);
  const [place_job, setPlace_job] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPlace_booking = await getCollection("place_bookings");
        const fetchedPlace_job = await getCollection("place_job");
        setPlace_booking(fetchedPlace_booking);
        setPlace_job(fetchedPlace_job);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchData();
  }, []);

  return <MenageInvoices place_booking={place_booking} place_job={place_job} />;
}
