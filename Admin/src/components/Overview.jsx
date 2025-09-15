// -------------------------------------------------------
// OVERVIEW

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

// -------------------------------------------------------
const Stat = ({ title, value, delta }) => (
  <Card className="rounded-2xl shadow-sm">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm text-gray-500">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold">{value}</div>
        <Badge variant={delta?.startsWith("-") ? "destructive" : "default"} className="rounded-full">
          {delta}
        </Badge>
      </div>
    </CardContent>
  </Card>
);

const Overview = ({ visitors, searches, orders, topProducts }) => {
  const pieData = useMemo(() => {
    return topProducts.map((p) => ({ name: p.name, value: p.sales ?? 1 }));
  }, [topProducts]);

  return (
    <div className="grid gap-4 md:gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Stat title="Visitors (7d)" value={visitors.reduce((a, c) => a + c.visitors, 0)} delta={"+8.4%"} />
        <Stat title="Searches (7d)" value={searches.reduce((a, c) => a + c.count, 0)} delta={"+4.1%"} />
        <Stat title="Orders (7d)" value={orders.length} delta={"+2.0%"} />
        <Stat title="Conv. Rate" value={"6.7%"} delta={"+0.6%"} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
        <Card className="rounded-2xl shadow-sm xl:col-span-2">
          <CardHeader>
            <CardTitle>Visitors & Conversions</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" strokeWidth={2} />
                <Line type="monotone" dataKey="conversions" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Top Products (share)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie dataKey="value" isAnimationActive data={pieData} outerRadius={90} label>
                  {pieData.map((_, i) => (
                    <Cell key={i} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Trending Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Term</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searches.map((s) => (
                  <TableRow key={s.term}>
                    <TableCell className="font-medium">{s.term}</TableCell>
                    <TableCell className="text-right">{s.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Search Volume (7d)</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={searches.map((s, i) => ({ ...s, day: i + 1 }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Overview;