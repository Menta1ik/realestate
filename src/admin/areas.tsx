import React from "react";
import { useList, useDelete, useNavigation } from "@refinedev/core";
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

export const AreaList = () => {
  const { data, isLoading } = useList({
    resource: "areas",
  });
  const { mutate: deleteMutate } = useDelete();
  const { edit, create } = useNavigation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Areas</h2>
        <Button onClick={() => create("areas")}>Create Area</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name (EN)</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((area: any) => (
              <TableRow key={area.id}>
                <TableCell className="font-medium">{area.nameEn}</TableCell>
                <TableCell>{area.slug}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => edit("areas", area.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" 
                      onClick={() => {
                        if(confirm("Are you sure?")) {
                          deleteMutate({ resource: "areas", id: area.id });
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

import { useForm } from "@refinedev/core";
import { useForm as useHookForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

const formSchema = z.object({
    nameEn: z.string().min(2, "Required"),
    nameRu: z.string().min(2, "Required"),
    slug: z.string().min(2, "Required"),
    descriptionEn: z.string().optional(),
    descriptionRu: z.string().optional(),
});

export const AreaEdit = () => {
    const form = useHookForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const {
        refineCore: { onFinish, formLoading },
        handleSubmit,
    } = form;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Area</h2>
            <Form {...form}>
                <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="nameEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name (EN)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Downtown Dubai" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nameRu"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name (RU)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Даунтаун Дубай" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="downtown-dubai" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="descriptionEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description (EN)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Area description in English" className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="descriptionRu"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description (RU)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Area description in Russian" className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={formLoading}>
                        {formLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export const AreaCreate = () => {
    const form = useHookForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nameEn: "",
            nameRu: "",
            slug: "",
            descriptionEn: "",
            descriptionRu: "",
        },
    });

    const {
        refineCore: { onFinish, formLoading },
        handleSubmit,
    } = form;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Create Area</h2>
            <Form {...form}>
                <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="nameEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name (EN)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Downtown Dubai" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nameRu"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name (RU)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Даунтаун Дубай" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Slug</FormLabel>
                                <FormControl>
                                    <Input placeholder="downtown-dubai" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="descriptionEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description (EN)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Area description in English" className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="descriptionRu"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description (RU)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Area description in Russian" className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={formLoading}>
                        {formLoading ? "Creating..." : "Create Area"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
