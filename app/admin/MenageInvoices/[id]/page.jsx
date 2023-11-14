"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDocById } from "@/api/firebase/functions/fetch";
import { InvoicesDetials } from "@/components/Index";
import { format } from "date-fns";
import { updateDoc } from "@/api/firebase/functions/upload";
import { Button, Text } from "@mantine/core";
import { statuses } from "@/components/static";

export default function Page() {
  const pathname = usePathname();
  const [invoice, setInvoice] = useState(null);
  const [job, setJob] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      const match = pathname && pathname.match(/\/([^/]+)$/);
      const id = match && match[1];

      if (id) {
        let data = await fetchDocById(id, "place_bookings");

        if (!data) {
          data = await fetchDocById(id, "place_job");
          setJob(true);
        }

        setInvoice(data);
      }
    };

    fetchInvoice();
  }, [pathname]);

  const updateStatus = async (newStatusIndex) => {
    if (!invoice || newStatusIndex >= statuses.length) {
      return;
    }

    const currentStatus = statuses[newStatusIndex].val;
    const currentDate = format(new Date(), "MM/dd/yyyy");

    const data = {
      ...invoice,
      progressInformation: {
        ...invoice.progressInformation,
        [currentStatus]: currentDate,
      },
    };

    setInvoice(data);

    const updatedInvoice = await updateDoc(
      job === true ? "place_job" : "place_bookings",
      invoice.docId,
      data
    );
    console.log(updatedInvoice);
  };

  return (
    <div>
      {invoice ? (
        <>
          {job === true ? (
            <InvoicesDetials {...invoice} job={true} />
          ) : (
            <InvoicesDetials {...invoice} />
          )}
          <div>
            <Text tt="uppercase" size="lg" fw={500} c={"gray"}>
              Change Status:
            </Text>
            {statuses.map((status, index) => (
              <Button
                variant="filled"
                color="red"
                m={3}
                key={index}
                onClick={() => updateStatus(index)}
              >
                {status.status}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
