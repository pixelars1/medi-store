import { useState } from "react";
import { brand } from "../utils/constant";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader2, Pencil, Plus, Save, ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";

const ProductForm = ({ product, onSave, onCancel }) => {
  const [form, setForm] = useState(
    product || {
      name: "",
      category: "General",
      image: "",
      price: "",
      originalPrice: "",
      description: "",
      prescriptionRequired: false,
      controlledSubstance: false,
      stock: 0,
      active: true,
    }
  );
  const [saving, setSaving] = useState(false);

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e) => {
    e?.preventDefault();
    setSaving(true);
    // TODO: replace with API call
    setTimeout(() => {
      onSave?.(form);
      setSaving(false);
    }, 600);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Product name</Label>
          <Input value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={form.category} onValueChange={(v) => update("category", v)}>
            <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="OTC">OTC</SelectItem>
              <SelectItem value="Prescription">Prescription</SelectItem>
              <SelectItem value="Stronger One">Stronger One</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Price (range allowed)</Label>
          <Input value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="$389.00 – $509.00" />
        </div>
        <div className="space-y-2">
          <Label>Original price</Label>
          <Input value={form.originalPrice} onChange={(e) => update("originalPrice", e.target.value)} placeholder="$509.00" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Image URL</Label>
          <Input value={form.image} onChange={(e) => update("image", e.target.value)} placeholder="https://…" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Description</Label>
          <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={5} />
          <p className="text-xs text-gray-500">For prescription-only or controlled substances, include safety, dosage, storage, and legal disclaimers. Upload Rx verification only via secure workflow.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center justify-between rounded-xl border p-3">
          <div>
            <Label className="block">Prescription required</Label>
            <p className="text-xs text-gray-500">Enforce Rx verification at checkout.</p>
          </div>
          <Switch checked={form.prescriptionRequired} onCheckedChange={(v) => update("prescriptionRequired", v)} />
        </div>
        <div className="flex items-center justify-between rounded-xl border p-3">
          <div>
            <Label className="block">Controlled substance</Label>
            <p className="text-xs text-gray-500">Enable extra compliance steps.</p>
          </div>
          <Switch checked={form.controlledSubstance} onCheckedChange={(v) => update("controlledSubstance", v)} />
        </div>
        <div className="space-y-2">
          <Label>Stock</Label>
          <Input type="number" value={form.stock} onChange={(e) => update("stock", Number(e.target.value))} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          {form.controlledSubstance ? (
            <><ShieldAlert className="h-4 w-4" /> Additional checks required</>
          ) : (
            <><ShieldCheck className="h-4 w-4" /> Standard checks</>
          )}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className={`bg-gradient-to-r ${brand.primary} ${brand.hover}`}>
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin"/> : <Save className="h-4 w-4 mr-2" />}Save
          </Button>
        </div>
      </div>
    </form>
  );
};
const Products = ({ products, setProducts }) => {
  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState(null);
  const [showNew, setShowNew] = useState(false);

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(filter.toLowerCase()) || p.category.toLowerCase().includes(filter.toLowerCase())
  );

  const save = (data) => {
    if (editing) {
      setProducts((list) => list.map((p) => (p.id === editing.id ? { ...p, ...data } : p)));
      setEditing(null);
    } else {
      setProducts((list) => [{ id: `p${Date.now()}`, sales: 0, ...data }, ...list]);
      setShowNew(false);
    }
  };

  const remove = (id) => setProducts((list) => list.filter((p) => p.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Search product…" className="max-w-xs" />
        <Dialog open={showNew} onOpenChange={setShowNew}>
          <DialogTrigger asChild>
            <Button className={`ml-auto rounded-2xl bg-gradient-to-r ${brand.primary} ${brand.hover}`}><Plus className="h-4 w-4 mr-2"/>New product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl rounded-2xl">
            <DialogHeader>
              <DialogTitle>Add new product</DialogTitle>
            </DialogHeader>
            <ProductForm onSave={save} onCancel={() => setShowNew(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="h-10 w-10 rounded-xl object-cover"/>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {p.name}
                          {p.prescriptionRequired && <Badge variant="secondary" className="rounded-full">Rx</Badge>}
                          {p.controlledSubstance && <Badge variant="destructive" className="rounded-full">Controlled</Badge>}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-1">{p.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{p.price}</span>
                      {p.originalPrice && <span className="text-xs text-gray-500 line-through">{p.originalPrice}</span>}
                    </div>
                  </TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>
                    {p.active ? (
                      <Badge className="rounded-full">Active</Badge>
                    ) : (
                      <Badge variant="secondary" className="rounded-full">Hidden</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={editing?.id === p.id} onOpenChange={(o) => !o && setEditing(null)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setEditing(p)} className="rounded-xl"><Pencil className="h-4 w-4"/></Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-2xl rounded-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit product</DialogTitle>
                          </DialogHeader>
                          <ProductForm product={p} onSave={save} onCancel={() => setEditing(null)} />
                        </DialogContent>
                      </Dialog>
                      <Button variant="destructive" size="sm" onClick={() => remove(p.id)} className="rounded-xl"><Trash2 className="h-4 w-4"/></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
export default Products;