import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";

const Orders = ({ orders }) => {
  const [list, setList] = useState(orders);
  const setStatus = (id, status) =>
    setList((arr) => arr.map((o) => (o.id === id ? { ...o, status } : o)));

  useEffect(() => {
    document.title = "Orders - MediCare Admin";
  }, []);
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Desktop / Tablet View */}
        <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Total ($)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-medium">{o.id}</TableCell>
                  <TableCell>{o.user}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    {o.product}{" "}
                    {o.product === "Adderall 30mg" && (
                      <Badge variant="destructive" className="rounded-full">
                        Rx/Controlled
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{o.qty}</TableCell>
                  <TableCell>{o.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className="rounded-full">{o.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Select onValueChange={(v) => setStatus(o.id, v)}>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder={o.status} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Payment Pending">
                            Payment Pending
                          </SelectItem>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="Awaiting Rx Verification">
                            Awaiting Rx Verification
                          </SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                          <SelectItem value="Refunded">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile View: Card Layout */}
        <div className="space-y-4 sm:hidden">
          {list.map((o) => (
            <div
              key={o.id}
              className="border rounded-xl p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">#{o.id}</span>
                <Badge className="rounded-full">{o.status}</Badge>
              </div>

              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Customer:</span> {o.user}
              </p>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                <span className="font-medium">Product:</span> {o.product}
                {o.product === "Adderall 30mg" && (
                  <Badge variant="destructive" className="rounded-full">
                    Rx/Controlled
                  </Badge>
                )}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Qty:</span> {o.qty}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Total:</span> ${o.total.toFixed(2)}
              </p>

              <div className="flex flex-col gap-2">
                <Select onValueChange={(v) => setStatus(o.id, v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={o.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Payment Pending">
                      Payment Pending
                    </SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Awaiting Rx Verification">
                      Awaiting Rx Verification
                    </SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                    <SelectItem value="Refunded">Refunded</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl w-full"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default Orders;