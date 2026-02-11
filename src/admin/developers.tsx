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
import { HugeiconsIcon } from "@hugeicons/react";
import { PencilEdit02Icon, Delete02Icon } from "@hugeicons/core-free-icons";

export const DeveloperList = () => {
  const { data, isLoading } = useList({
    resource: "developers",
  });
  const { mutate: deleteMutate } = useDelete();
  const { edit, create } = useNavigation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold tracking-tight">Developers</h2>
            <Button onClick={() => create("developers")}>Create Developer</Button>
        </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Year</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((developer: any) => (
              <TableRow key={developer.id}>
                <TableCell className="font-medium">{developer.name}</TableCell>
                <TableCell>{developer.slug}</TableCell>
                <TableCell>{developer.year}</TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => edit("developers", developer.id)}>
                            <HugeiconsIcon icon={PencilEdit02Icon} className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" 
                            onClick={() => {
                                if(confirm("Are you sure?")) {
                                    deleteMutate({ resource: "developers", id: developer.id });
                                }
                            }}
                        >
                            <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
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

import { useForm } from "@refinedev/react-hook-form";
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

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    slug: z.string().min(2, { message: "Slug must be at least 2 characters." }),
    year: z.coerce.number().optional(),
    nameEn: z.string().optional(),
    nameRu: z.string().optional(),
    office: z.string().optional(),
});

export const DeveloperEdit = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const {
        refineCore: { onFinish, formLoading },
        handleSubmit,
        saveButtonProps,
    } = form;

    return (
        <div className="p-4 max-w-xl">
            <h2 className="text-2xl font-bold mb-6">Edit Developer</h2>
            <Form {...form}>
                <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name (Internal)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Emaar" {...field} />
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
                                    <Input placeholder="emaar" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="nameEn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name (EN)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Emaar Properties" {...field} />
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
                                        <Input placeholder="Emaar Properties" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year Established</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="1997" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="office"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Head Office</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dubai, UAE" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="submit" disabled={formLoading}>
                            {formLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export const DeveloperCreate = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            year: new Date().getFullYear(),
            nameEn: "",
            nameRu: "",
            office: "",
        },
    });

    const {
        refineCore: { onFinish, formLoading },
        handleSubmit,
    } = form;

    return (
        <div className="p-4 max-w-xl">
            <h2 className="text-2xl font-bold mb-6">Create Developer</h2>
            <Form {...form}>
                <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name (Internal)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Emaar" {...field} />
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
                                    <Input placeholder="emaar" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="nameEn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name (EN)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Emaar Properties" {...field} />
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
                                        <Input placeholder="Emaar Properties" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="year"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Year Established</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="1997" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="office"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Head Office</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Dubai, UAE" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="submit" disabled={formLoading}>
                            {formLoading ? "Creating..." : "Create Developer"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
