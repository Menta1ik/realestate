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
import { PencilEdit02Icon, Delete02Icon, PlusSignIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useForm as useHookForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
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

export const ProjectList = () => {
  const { data, isLoading } = useList({
    resource: "projects",
    pagination: { pageSize: 50 }
  });
  const { mutate: deleteMutate } = useDelete();
  const { edit, create } = useNavigation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <Button onClick={() => create("projects")}>Create Project</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name (EN)</TableHead>
              <TableHead>Ref</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((project: any) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.nameEn}</TableCell>
                <TableCell>{project.ref}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => edit("projects", project.id)}>
                      <HugeiconsIcon icon={PencilEdit02Icon} className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive" 
                      onClick={() => {
                        if(confirm("Are you sure?")) {
                          deleteMutate({ resource: "projects", id: project.id });
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

const formSchema = z.object({
    nameEn: z.string().min(2, "Required"),
    nameRu: z.string().min(2, "Required"),
    ref: z.string().min(2, "Required"),
    status: z.string().optional(),
    type: z.string().optional(),
    descriptionEn: z.string().optional(),
    descriptionRu: z.string().optional(),
    developerId: z.string().optional(),
    areaId: z.string().optional(),
    priceFromAED: z.coerce.number().min(0),
    handoverEn: z.string().optional(),
    handoverRu: z.string().optional(),
    paymentPlanEn: z.string().optional(),
    paymentPlanRu: z.string().optional(),
    bedrooms: z.string().optional(),
    size: z.string().optional(),
    
    // Arrays
    unitTypes: z.array(z.object({
        kind: z.string(),
        priceFromAED: z.coerce.number(),
        sizeFromSqFt: z.coerce.number().optional(),
        pricePerSqFt: z.coerce.number().optional(),
        image: z.string().optional(),
    })).optional(),
    photos: z.array(z.object({ url: z.string() })).optional(),
    amenities: z.array(z.object({ code: z.string() })).optional(),
    tags: z.array(z.object({ name: z.string() })).optional(),
    documents: z.array(z.object({
        labelEn: z.string(),
        labelRu: z.string(),
        type: z.string(),
        url: z.string()
    })).optional(),
});

const ProjectForm = ({ action, defaultValues, onFinish, formLoading }: any) => {
    const form = useHookForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            nameEn: "", nameRu: "", ref: "", status: "Off-plan", type: "apartment",
            descriptionEn: "", descriptionRu: "", developerId: "", areaId: "",
            priceFromAED: 0, handoverEn: "", handoverRu: "",
            paymentPlanEn: "", paymentPlanRu: "",
            bedrooms: "", size: "",
            unitTypes: [], photos: [], amenities: [], tags: [], documents: []
        },
    });

    const { control, handleSubmit, setValue, watch } = form;
    
    // Resources
    const { options: developerOptions } = useSelect({ resource: "developers", optionLabel: "name", optionValue: "id" });
    const { options: areaOptions } = useSelect({ resource: "areas", optionLabel: "nameEn", optionValue: "id" });
    const { options: layoutTypeOptions } = useSelect({ 
        resource: "layout-types", 
        optionLabel: "nameEn", 
        optionValue: "code",
        sorters: [{ field: "sortOrder", order: "asc" }]
    });
    const { data: featuresData } = useList({ resource: "features", pagination: { pageSize: 100 } });
    const { data: tagsData } = useList({ resource: "tag-categories", pagination: { pageSize: 100 } });

    // Field Arrays
    const { fields: unitFields, append: appendUnit, remove: removeUnit } = useFieldArray({ control, name: "unitTypes" });
    const { fields: photoFields, append: appendPhoto, remove: removePhoto } = useFieldArray({ control, name: "photos" });
    const { fields: docFields, append: appendDoc, remove: removeDoc } = useFieldArray({ control, name: "documents" });

    // Amenities Handling
    const selectedAmenities = watch("amenities") || [];
    const toggleAmenity = (code: string) => {
        const current = selectedAmenities;
        const exists = current.find((a: any) => a.code === code);
        if (exists) {
            setValue("amenities", current.filter((a: any) => a.code !== code));
        } else {
            setValue("amenities", [...current, { code }]);
        }
    };

    // Tags Handling
    const selectedTags = watch("tags") || [];
    const toggleTag = (name: string) => {
        const current = selectedTags;
        const exists = current.find((t: any) => t.name === name);
        if (exists) {
            setValue("tags", current.filter((t: any) => t.name !== name));
        } else {
            setValue("tags", [...current, { name }]);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onFinish)} className="space-y-8">
                {/* Basic Info */}
                <div className="border p-4 rounded-md space-y-4">
                    <h3 className="font-semibold text-lg">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={control} name="ref" render={({ field }) => (
                            <FormItem><FormLabel>Reference ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="status" render={({ field }) => (
                            <FormItem><FormLabel>Status</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                                    <SelectContent><SelectItem value="Off-plan">Off-plan</SelectItem><SelectItem value="Ready">Ready</SelectItem></SelectContent>
                                </Select>
                            <FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="nameEn" render={({ field }) => (
                            <FormItem><FormLabel>Name (EN)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="nameRu" render={({ field }) => (
                            <FormItem><FormLabel>Name (RU)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="developerId" render={({ field }) => (
                            <FormItem><FormLabel>Developer</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                                    <SelectContent>{developerOptions?.map(o => <SelectItem key={o.value} value={String(o.value)}>{o.label}</SelectItem>)}</SelectContent>
                                </Select>
                            <FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="areaId" render={({ field }) => (
                            <FormItem><FormLabel>Area</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                                    <SelectContent>{areaOptions?.map(o => <SelectItem key={o.value} value={String(o.value)}>{o.label}</SelectItem>)}</SelectContent>
                                </Select>
                            <FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="type" render={({ field }) => (
                            <FormItem><FormLabel>Type</FormLabel><FormControl><Input placeholder="apartment, villa" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="priceFromAED" render={({ field }) => (
                            <FormItem><FormLabel>Price From (AED)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="handoverEn" render={({ field }) => (
                            <FormItem><FormLabel>Handover (EN)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="handoverRu" render={({ field }) => (
                            <FormItem><FormLabel>Handover (RU)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                {/* Description */}
                <div className="border p-4 rounded-md space-y-4">
                    <h3 className="font-semibold text-lg">Description</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={control} name="descriptionEn" render={({ field }) => (
                            <FormItem><FormLabel>Description (EN)</FormLabel><FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="descriptionRu" render={({ field }) => (
                            <FormItem><FormLabel>Description (RU)</FormLabel><FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                {/* Specs */}
                <div className="border p-4 rounded-md space-y-4">
                    <h3 className="font-semibold text-lg">Specifications</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={control} name="bedrooms" render={({ field }) => (
                            <FormItem><FormLabel>Bedrooms (e.g. "1, 2, 3")</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="size" render={({ field }) => (
                            <FormItem><FormLabel>Size Range (e.g. "780 - 1200 sq.ft")</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                {/* Payment Plan */}
                <div className="border p-4 rounded-md space-y-4">
                    <h3 className="font-semibold text-lg">Payment Plan</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={control} name="paymentPlanEn" render={({ field }) => (
                            <FormItem><FormLabel>Payment Plan (EN)</FormLabel><FormControl><Textarea placeholder="e.g. 50/50" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={control} name="paymentPlanRu" render={({ field }) => (
                            <FormItem><FormLabel>Payment Plan (RU)</FormLabel><FormControl><Textarea placeholder="e.g. 50/50" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                </div>

                {/* Unit Types (Floor Plans) */}
                <div className="border p-4 rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Floor Plans / Unit Types</h3>
                        <Button type="button" variant="outline" size="sm" onClick={() => appendUnit({ kind: "1BR", priceFromAED: 0 })}>
                            <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4 mr-2" /> Add Unit Type
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {unitFields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-6 gap-2 border p-2 rounded">
                                <FormField control={control} name={`unitTypes.${index}.kind`} render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel className="text-xs">Kind</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {layoutTypeOptions?.map(o => (
                                                    <SelectItem key={o.value} value={String(o.value)}>
                                                        {o.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )} />
                                <FormField control={control} name={`unitTypes.${index}.priceFromAED`} render={({ field }) => (
                                    <FormItem className="col-span-1"><FormLabel className="text-xs">Price (AED)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
                                )} />
                                <FormField control={control} name={`unitTypes.${index}.sizeFromSqFt`} render={({ field }) => (
                                    <FormItem className="col-span-1"><FormLabel className="text-xs">Size (Sq.Ft)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
                                )} />
                                <FormField control={control} name={`unitTypes.${index}.pricePerSqFt`} render={({ field }) => (
                                    <FormItem className="col-span-1"><FormLabel className="text-xs">Price/Sq.Ft</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
                                )} />
                                <FormField control={control} name={`unitTypes.${index}.image`} render={({ field }) => (
                                    <FormItem className="col-span-1"><FormLabel className="text-xs">Image URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                                )} />
                                <div className="col-span-1">
                                    <div className="space-y-2">
                                        <span className="block text-xs font-medium text-transparent select-none">Action</span>
                                        <Button type="button" variant="destructive" className="w-full" onClick={() => removeUnit(index)}><HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Amenities */}
                <div className="border p-4 rounded-md space-y-4">
                    <h3 className="font-semibold text-lg">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {featuresData?.data?.map((feature: any) => {
                             const isSelected = selectedAmenities.some((a: any) => a.code === feature.nameEn);
                             return (
                                <div key={feature.id} className="flex items-center space-x-2">
                                    <input 
                                        type="checkbox" 
                                        id={`amenity-${feature.id}`}
                                        checked={isSelected}
                                        onChange={() => toggleAmenity(feature.nameEn)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor={`amenity-${feature.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {feature.nameEn}
                                    </label>
                                </div>
                             );
                        })}
                    </div>
                </div>

                {/* Tags */}
                <div className="border p-4 rounded-md space-y-4">
                    <h3 className="font-semibold text-lg">Tags</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {tagsData?.data?.map((tag: any) => {
                             const isSelected = selectedTags.some((t: any) => t.name === tag.name);
                             return (
                                <div key={tag.id} className="flex items-center space-x-2">
                                    <input 
                                        type="checkbox" 
                                        id={`tag-${tag.id}`}
                                        checked={isSelected}
                                        onChange={() => toggleTag(tag.name)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label htmlFor={`tag-${tag.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {tag.name}
                                    </label>
                                </div>
                             );
                        })}
                    </div>
                </div>

                {/* Photos */}
                <div className="border p-4 rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Photos</h3>
                        <Button type="button" variant="outline" size="sm" onClick={() => appendPhoto({ url: "" })}>
                            <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4 mr-2" /> Add Photo
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {photoFields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-center">
                                <FormField control={control} name={`photos.${index}.url`} render={({ field }) => (
                                    <FormItem className="flex-1"><FormControl><Input {...field} placeholder="https://..." /></FormControl></FormItem>
                                )} />
                                <Button type="button" variant="destructive" size="icon" onClick={() => removePhoto(index)}><HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" /></Button>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Documents */}
                 <div className="border p-4 rounded-md space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-lg">Documents</h3>
                        <Button type="button" variant="outline" size="sm" onClick={() => appendDoc({ labelEn: "", labelRu: "", type: "brochure", url: "" })}>
                            <HugeiconsIcon icon={PlusSignIcon} className="h-4 w-4 mr-2" /> Add Document
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {docFields.map((field, index) => (
                            <div key={field.id} className="grid grid-cols-4 gap-2 border p-2 rounded">
                                <FormField control={control} name={`documents.${index}.labelEn`} render={({ field }) => (
                                    <FormItem><FormLabel className="text-xs">Label (EN)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                                )} />
                                <FormField control={control} name={`documents.${index}.labelRu`} render={({ field }) => (
                                    <FormItem><FormLabel className="text-xs">Label (RU)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                                )} />
                                <FormField control={control} name={`documents.${index}.type`} render={({ field }) => (
                                    <FormItem><FormLabel className="text-xs">Type</FormLabel><FormControl><Input {...field} placeholder="brochure" /></FormControl></FormItem>
                                )} />
                                <div className="flex gap-2 items-start">
                                     <FormField control={control} name={`documents.${index}.url`} render={({ field }) => (
                                        <FormItem className="flex-1"><FormLabel className="text-xs">URL</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                                    )} />
                                    <div className="space-y-2">
                                        <span className="block text-xs font-medium text-transparent select-none">Action</span>
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeDoc(index)}><HugeiconsIcon icon={Cancel01Icon} className="h-4 w-4" /></Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={formLoading} size="lg">
                        {formLoading ? "Saving..." : "Save Project"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export const ProjectEdit = () => {
    const { refineCore: { onFinish, formLoading, queryResult } } = useForm({
        meta: {
            populate: ["unitTypes", "photos", "amenities", "tags", "documents"]
        }
    });

    const defaultValues = queryResult?.data?.data;

    if (!defaultValues) return <div>Loading...</div>;

    return (
        <div className="p-4 max-w-5xl mx-auto pb-20">
            <h2 className="text-2xl font-bold mb-6">Edit Project: {defaultValues.ref}</h2>
            <ProjectForm action="edit" defaultValues={defaultValues} onFinish={onFinish} formLoading={formLoading} />
        </div>
    );
};

export const ProjectCreate = () => {
    const { refineCore: { onFinish, formLoading } } = useForm();

    return (
        <div className="p-4 max-w-5xl mx-auto pb-20">
            <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
            <ProjectForm action="create" onFinish={onFinish} formLoading={formLoading} />
        </div>
    );
};
