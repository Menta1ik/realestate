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

export const TagCategoryList = () => {
  const { data, isLoading } = useList({
    resource: "tag-categories",
  });
  const { mutate: deleteItem } = useDelete();
  const { push } = useNavigation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tag Catalog</h1>
        <Button onClick={() => push("/admin/tag-categories/create")}>
          Create Tag
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name (ID)</TableHead>
              <TableHead>EN / RU</TableHead>
              <TableHead>Preview</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: any) => {
              // Construct styles for preview
              const style = {
                backgroundColor: item.bgColor || 'rgba(107, 114, 128, 0.1)',
                color: item.color || '#4B5563',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600
              };

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">{item.nameEn}</div>
                    <div className="text-xs text-muted-foreground">{item.nameRu}</div>
                  </TableCell>
                  <TableCell>
                     <span style={style}>
                        {item.nameEn || item.name}
                     </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => push(`/admin/tag-categories/edit/${item.id}`)}
                    >
                      <HugeiconsIcon icon={PencilEdit02Icon} className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => {
                        if (confirm("Are you sure?")) {
                          deleteItem({
                            resource: "tag-categories",
                            id: item.id,
                          });
                        }
                      }}
                    >
                      <HugeiconsIcon icon={Delete02Icon} className="h-4 w-4" />
                    </Button>
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

// --- Create ---
import { useForm } from "@refinedev/react-hook-form";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

export const TagCategoryCreate = () => {
  const { saveButtonProps, register, formState: { errors } } = useForm({
    refineCoreProps: { resource: "tag-categories" }
  });

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create Tag</h1>
      <form className="space-y-4">
        
        <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
                <Label>System Name (Unique ID)</Label>
                <Input {...register("name", { required: true })} placeholder="e.g. Top, Hot, View" />
                {errors.name && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Name (EN)</Label>
                    <Input {...register("nameEn")} placeholder="Top" />
                </div>
                <div className="space-y-2">
                    <Label>Name (RU)</Label>
                    <Input {...register("nameRu")} placeholder="Топ" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Text Color (HEX)</Label>
                    <Input {...register("color")} placeholder="#10B981" />
                </div>
                <div className="space-y-2">
                    <Label>Background Color (RGBA/HEX)</Label>
                    <Input {...register("bgColor")} placeholder="rgba(16, 185, 129, 0.1)" />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Icon Name (Lucide)</Label>
                <Input {...register("icon")} placeholder="optional" />
            </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
            <Button {...saveButtonProps}>Save</Button>
        </div>
      </form>
    </div>
  );
};

// --- Edit ---
export const TagCategoryEdit = () => {
  const { saveButtonProps, register, formState: { errors } } = useForm({
    refineCoreProps: { resource: "tag-categories", action: "edit" }
  });

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Edit Tag</h1>
      <form className="space-y-4">
        
        <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
                <Label>System Name (Unique ID)</Label>
                <Input {...register("name", { required: true })} />
                {errors.name && <span className="text-red-500 text-sm">Required</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Name (EN)</Label>
                    <Input {...register("nameEn")} />
                </div>
                <div className="space-y-2">
                    <Label>Name (RU)</Label>
                    <Input {...register("nameRu")} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Text Color (HEX)</Label>
                    <Input {...register("color")} />
                </div>
                <div className="space-y-2">
                    <Label>Background Color (RGBA/HEX)</Label>
                    <Input {...register("bgColor")} />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Icon Name (Lucide)</Label>
                <Input {...register("icon")} />
            </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
            <Button {...saveButtonProps}>Save</Button>
        </div>
      </form>
    </div>
  );
};
