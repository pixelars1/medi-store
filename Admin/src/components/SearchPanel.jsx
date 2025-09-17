import { useEffect } from "react";
import { mockSearches } from "../utils/constant";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const SearchesPanel = ({ searches }) =>{
  useEffect(() => {
    document.title = "Searches - MediCare Admin";
  },[])
  return (
  <div className="grid gap-4">
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Top Search Terms</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Term</TableHead>
              <TableHead className="text-right">Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSearches.map((s) => (
              <TableRow key={s.term}>
                <TableCell className="font-medium">{s.term}</TableCell>
                <TableCell className="text-right">{s.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
)};
export default SearchesPanel;