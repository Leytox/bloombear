import { getAllOrders } from "@/actions/order";
import { json2csv } from "json-2-csv";
import xlsx from "json-as-xlsx";

export async function exportOrdersToCsv(): Promise<string> {
  const orders = await getAllOrders();
  if (!orders) return "";
  return json2csv(orders);
}

export async function exportOrdersToJson(): Promise<string> {
  const orders = await getAllOrders();
  if (!orders) return "";
  return JSON.stringify(orders);
}


export async function exportOrdersToXlsx(){
    const orders = await getAllOrders();
    if (!orders) return "";
    const data = [{
        sheet: "Orders",
        columns: [
            { label: "ID", value: "id" },
            { label: "Status", value: "status" },
            { label: "Created At", value: "createdAt" },
            { label: "Updated At", value: "updatedAt" },
            { label: "Customer Name", value: "customerName" },
            { label: "Customer Email", value: "customerEmail" },
            { label: "Customer Phone", value: "customerPhone" },
            { label: "Delivery Area", value: "deliveryArea" },
            { label: "Delivery Address", value: "deliveryAddress" },
            { label: "Delivery Date", value: "deliveryDate" },
            { label: "Delivery Time", value: "deliveryTime" },
            { label: "Payment Method", value: "paymentMethod" },
            { label: "Payment Status", value: "paymentStatus" },
            { label: "Total Amount", value: "totalAmount" },
            { label: "Payment Intent ID", value: "paymentIntentId" },
            { label: "Comment", value: "comment" },
            { label: "Items", value: "items" },
        ],
        content: orders
    }];
    return xlsx(data, {
        fileName: "orders"
    });
}

export function downloadFile(data: string, filename: string, type: string) {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }