"use client";

import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { BracesIcon, FileSpreadsheetIcon } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { FileTextIcon } from "lucide-react";
import { FolderDownIcon } from "lucide-react";
import {
  exportOrdersToJson,
  exportOrdersToXlsx,
  exportOrdersToCsv,
  downloadFile,
} from "@/helpers";

export default function ExportOrdersDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" title="Export orders to a file">
          <FolderDownIcon />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Orders</DialogTitle>
        </DialogHeader>
        <DialogDescription>Export all orders to a file.</DialogDescription>
        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
