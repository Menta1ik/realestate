import React from "react";
import { useList, useDelete, useNavigation } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { Button } from "./components/ui/button";
import { Edit, Trash } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";

const formSchema = z.object({
    code: z.string().min(1, "Required"),
    nameEn: z.string().min(1, "Required"),
    nameRu: z.string().min(1, "Required"),
    sortOrder: z.coerce.number().int().default(0),
});

export const LayoutTypeList = () => {
  const { data, isLoading } = useList({
    resource: "layout-types",
    sorters: [{ field: "sortOrder", order: "asc" }],
    pagination: { pageSize: 50 }
  });
  const { mutate: deleteItem } = useDelete();
  const { push } = useNavigation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Layout Types Dictionary</h1>
        <Button onClick={() => push("/admin/layout-types/create")}>
          Create Layout Type
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Name (EN)</TableHead>
              <TableHead>Name (RU)</TableHead>
              <TableHead>Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.code}</TableCell>
                <TableCell>{item.nameEn}</TableCell>
                <TableCell>{item.nameRu}</TableCell>
                <TableCell>{item.sortOrder}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => push(`/admin/layout-types/edit/${item.id}`)}
                    >
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => {
                        if (confirm("Are you sure?")) {
                            deleteItem({
                            resource: "layout-types",
                            id: item.id,
                            });
                        }
                        }}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export const LayoutTypeCreate = () => {
    const { refineCore: { onFinish, formLoading }, ...form } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { code: "", nameEn: "", nameRu: "", sortOrder: 0 },
        refineCoreProps: { resource: "layout-types", action: "create", redirect: "list" }
    });

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Create Layout Type</h1>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onFinish)} className="space-y-4 max-w-lg">
                    <FormField control={form.control} name="code" render={({ field }) => (
                        <FormItem><FormLabel>Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="nameEn" render={({ field }) => (
                        <FormItem><FormLabel>Name (EN)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="nameRu" render={({ field }) => (
                        <FormItem><FormLabel>Name (RU)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="sortOrder" render={({ field }) => (
                        <FormItem><FormLabel>Sort Order</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" disabled={formLoading}>Save</Button>
                </form>
            </Form>
        </div>
    );
};

export const LayoutTypeEdit = () => {
    const { refineCore: { onFinish, formLoading, queryResult }, ...form } = useForm({
        resolver: zodResolver(formSchema),
        refineCoreProps: { resource: "layout-types", action: "edit", redirect: "list" }
    });

    if (queryResult?.isLoading) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Layout Type</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onFinish)} className="space-y-4 max-w-lg">
                    <FormField control={form.control} name="code" render={({ field }) => (
                        <FormItem><FormLabel>Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="nameEn" render={({ field }) => (
                        <FormItem><FormLabel>Name (EN)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="nameRu" render={({ field }) => (
                        <FormItem><FormLabel>Name (RU)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="sortOrder" render={({ field }) => (
                        <FormItem><FormLabel>Sort Order</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <Button type="submit" disabled={formLoading}>Save</Button>
                </form>
            </Form>
        </div>
    );
};
