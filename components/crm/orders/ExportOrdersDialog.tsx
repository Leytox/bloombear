"use client";

import { Button } from "@/components/ui/button";
import { BracesIcon, FileSpreadsheetIcon } from "lucide-react";
import { FileTextIcon } from "lucide-react";
import {
  exportOrdersToJson,
  exportOrdersToXlsx,
  exportOrdersToCsv,
  downloadFile,
} from "@/lib/export";

export default function ExportOrdersDialog() {
  return (
    <>
      <Button
        onClick={async () =>
          downloadFile(await exportOrdersToCsv(), "orders.csv", "text/csv")
        }
      >
        CSV <FileTextIcon />
      </Button>
      <Button onClick={async () => exportOrdersToXlsx()}>
        Excel <FileSpreadsheetIcon />
      </Button>
      <Button
        onClick={async () =>
          downloadFile(
            await exportOrdersToJson(),
            "orders.json",
            "application/json"
          )
        }
      >
        JSON <BracesIcon />
      </Button>
    </>
  );
}
