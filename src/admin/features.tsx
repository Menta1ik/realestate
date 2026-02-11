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
import * as LucideIcons from "lucide-react";

export const FeatureList = () => {
  const { data, isLoading } = useList({
    resource: "features",
  });
  const { mutate: deleteMutate } = useDelete();
  const { edit, create } = useNavigation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Features</h2>
        <Button onClick={() => create("features")}>Create Feature</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name (EN)</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((feature: any) => {
              const IconComponent = (LucideIcons as any)[feature.icon];
              return (
              <TableRow key={feature.id}>
                <TableCell className="font-medium">{feature.nameEn}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                    <span>{feature.icon}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => edit("features", feature.id)}>
                      <HugeiconsIcon icon={PencilEdit02Icon} className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" 
                      onClick={() => {
                        if(confirm("Are you sure?")) {
                          deleteMutate({ resource: "features", id: feature.id });
                        }
                      }}
                    >
                      <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              );
            })}
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

const formSchema = z.object({
    nameEn: z.string().min(2, "Required"),
    nameRu: z.string().min(2, "Required"),
    icon: z.string().min(2, "Required"),
});

export const FeatureEdit = () => {
    const form = useHookForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const {
        refineCore: { onFinish, formLoading },
        handleSubmit,
    } = form;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Feature</h2>
            <Form {...form}>
                <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="nameEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name (EN)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Swimming Pool" {...field} />
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
                                    <Input placeholder="Бассейн" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icon (Lucide Name)</FormLabel>
                                <FormControl>
                                    <Input placeholder="waves" {...field} />
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

export const FeatureCreate = () => {
    const form = useHookForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nameEn: "",
            nameRu: "",
            icon: "",
        },
    });

    const {
        refineCore: { onFinish, formLoading },
        handleSubmit,
    } = form;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Create Feature</h2>
            <Form {...form}>
                <form onSubmit={handleSubmit(onFinish)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="nameEn"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name (EN)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Swimming Pool" {...field} />
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
                                    <Input placeholder="Бассейн" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icon (Lucide Name)</FormLabel>
                                <FormControl>
                                    <Input placeholder="waves" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={formLoading}>
                        {formLoading ? "Creating..." : "Create Feature"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
