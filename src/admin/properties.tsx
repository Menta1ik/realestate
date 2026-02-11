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

export const PropertyList = () => {
  const { data, isLoading } = useList({
    resource: "properties",
  });
  const { mutate: deleteMutate } = useDelete();
  const { edit, create } = useNavigation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Units</h2>
        <Button onClick={() => create("properties")}>Create Unit</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name (EN)</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bedrooms</TableHead>
              <TableHead>Price (AED)</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((property: any) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.nameEn}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>{property.status}</TableCell>
                <TableCell>{property.bedrooms}</TableCell>
                <TableCell>{property.priceFromAED?.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => edit("properties", property.id)}>
                      <HugeiconsIcon icon={PencilEdit02Icon} className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" 
                      onClick={() => {
                        if(confirm("Are you sure?")) {
                          deleteMutate({ resource: "properties", id: property.id });
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

import { useForm, useSelect } from "@refinedev/core";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./components/ui/select";

const formSchema = z.object({
    nameEn: z.string().min(2, "Required"),
    nameRu: z.string().min(2, "Required"),
    ref: z.string().min(2, "Required"),
    status: z.string().optional(),
    type: z.string().optional(),
    priceFromAED: z.coerce.number().optional(),
    descriptionEn: z.string().optional(),
    descriptionRu: z.string().optional(),
    developerId: z.string().optional(),
    areaId: z.string().optional(),
    bedrooms: z.string().optional(),
    size: z.string().optional(),
});

export const PropertyEdit = () => {
    const form = useHookForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const {
        refineCore: { onFinish, formLoading, queryResult },
        handleSubmit,
        saveButtonProps,
    } = form;

    const { options: developerOptions } = useSelect({
        resource: "developers",
        optionLabel: "name",
        optionValue: "id",
        defaultValue: queryResult?.data?.data?.developerId,
    });

    const { options: areaOptions } = useSelect({
        resource: "areas",
        optionLabel: "nameEn",
        optionValue: "id",
        defaultValue: queryResult?.data?.data?.areaId,
    });

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Unit</h2>
            <Form {...form}>
                <form onSubmit={handleSubmit(onFinish)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="ref"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reference ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="PR-001" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="priceFromAED"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price From (AED)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="1000000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="nameEn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name (EN)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Property Name EN" {...field} />
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
                                        <Input placeholder="Property Name RU" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="developerId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Developer</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select developer" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {developerOptions?.map((option) => (
                                                <SelectItem key={option.value} value={String(option.value)}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="areaId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select area" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {areaOptions?.map((option) => (
                                                <SelectItem key={option.value} value={String(option.value)}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                     <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Off-plan">Off-plan</SelectItem>
                                            <SelectItem value="Ready">Ready</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="villa">Villa</SelectItem>
                                            <SelectItem value="townhouse">Townhouse</SelectItem>
                                            <SelectItem value="penthouse">Penthouse</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                     <div className="grid grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="bedrooms"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bedrooms</FormLabel>
                                    <FormControl>
                                        <Input placeholder="1, 2, 3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size (Sq.Ft)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="780 - 1200" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="descriptionEn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (EN)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description in English" className="min-h-[100px]" {...field} />
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
                                        <Textarea placeholder="Description in Russian" className="min-h-[100px]" {...field} />
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

export const PropertyCreate = () => {
    const form = useHookForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nameEn: "",
            nameRu: "",
            ref: "",
            status: "Off-plan",
            type: "apartment",
            priceFromAED: 0,
            descriptionEn: "",
            descriptionRu: "",
            developerId: "",
            areaId: "",
            bedrooms: "",
            size: "",
        },
    });

    const {
        refineCore: { onFinish, formLoading },
        handleSubmit,
    } = form;

     const { options: developerOptions } = useSelect({
        resource: "developers",
        optionLabel: "name",
        optionValue: "id",
    });

    const { options: areaOptions } = useSelect({
        resource: "areas",
        optionLabel: "nameEn",
        optionValue: "id",
    });

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Create Unit</h2>
            <Form {...form}>
                <form onSubmit={handleSubmit(onFinish)} className="space-y-6">
                    {/* Same fields as Edit - duplicating for simplicity in this context, but should extract to Component */}
                    <div className="grid grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="ref"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reference ID</FormLabel>
                                    <FormControl>
                                        <Input placeholder="PR-001" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="priceFromAED"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price From (AED)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="1000000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="nameEn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name (EN)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Property Name EN" {...field} />
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
                                        <Input placeholder="Property Name RU" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="developerId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Developer</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select developer" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {developerOptions?.map((option) => (
                                                <SelectItem key={option.value} value={String(option.value)}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="areaId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select area" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {areaOptions?.map((option) => (
                                                <SelectItem key={option.value} value={String(option.value)}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                     <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Off-plan">Off-plan</SelectItem>
                                            <SelectItem value="Ready">Ready</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="apartment">Apartment</SelectItem>
                                            <SelectItem value="villa">Villa</SelectItem>
                                            <SelectItem value="townhouse">Townhouse</SelectItem>
                                            <SelectItem value="penthouse">Penthouse</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                     <div className="grid grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="bedrooms"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Bedrooms</FormLabel>
                                    <FormControl>
                                        <Input placeholder="1, 2, 3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size (Sq.Ft)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="780 - 1200" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         <FormField
                            control={form.control}
                            name="descriptionEn"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description (EN)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description in English" className="min-h-[100px]" {...field} />
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
                                        <Textarea placeholder="Description in Russian" className="min-h-[100px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                        <Button type="submit" disabled={formLoading}>
                            {formLoading ? "Creating..." : "Create Property"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
