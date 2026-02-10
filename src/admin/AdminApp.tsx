import React from "react";
import { Refine } from "@refinedev/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { Routes, Route, Outlet } from "react-router-dom";
import { Layout } from "./layout";
import { Dashboard } from "./dashboard";
import { DeveloperList, DeveloperEdit, DeveloperCreate } from "./developers";
import { PropertyList, PropertyEdit, PropertyCreate } from "./properties";
import { LeadList } from "./leads";
import { AreaList, AreaEdit, AreaCreate } from "./areas";
import { FeatureList, FeatureEdit, FeatureCreate } from "./features";
import { ProjectList, ProjectEdit, ProjectCreate } from "./projects";
import { TagCategoryList, TagCategoryEdit, TagCategoryCreate } from "./tag-categories";
import { LayoutTypeList, LayoutTypeEdit, LayoutTypeCreate } from "./layout-types";

const AdminApp = () => {
  return (
      <Refine
        dataProvider={dataProvider("/api")}
        routerProvider={routerProvider}
        resources={[
          {
            name: "dashboard",
            list: "/admin",
          },
          {
            name: "developers",
            list: "/admin/developers",
            create: "/admin/developers/create",
            edit: "/admin/developers/edit/:id",
            meta: { label: "Developers" }
          },
          {
            name: "projects",
            list: "/admin/projects",
            create: "/admin/projects/create",
            edit: "/admin/projects/edit/:id",
            meta: { label: "Projects" }
          },
          {
            name: "properties",
            list: "/admin/properties",
            create: "/admin/properties/create",
            edit: "/admin/properties/edit/:id",
            meta: { label: "Units" }
          },
          {
            name: "areas",
            list: "/admin/areas",
            create: "/admin/areas/create",
            edit: "/admin/areas/edit/:id",
            meta: { label: "Areas" }
          },
          {
            name: "tag-categories",
            list: "/admin/tag-categories",
            create: "/admin/tag-categories/create",
            edit: "/admin/tag-categories/edit/:id",
            meta: { label: "Tags Catalog" }
          },
          {
            name: "layout-types",
            list: "/admin/layout-types",
            create: "/admin/layout-types/create",
            edit: "/admin/layout-types/edit/:id",
            meta: { label: "Layout Types" }
          },
          {
            name: "features",
            list: "/admin/features",
            create: "/admin/features/create",
            edit: "/admin/features/edit/:id",
            meta: { label: "Features" }
          },
          {
            name: "leads",
            list: "/admin/leads",
            meta: { label: "Leads" }
          }
        ]}
        options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
        }}
      >
        <Routes>
            <Route element={<Layout><Outlet /></Layout>}>
                <Route index element={<Dashboard />} />
                
                <Route path="developers">
                    <Route index element={<DeveloperList />} />
                    <Route path="create" element={<DeveloperCreate />} />
                    <Route path="edit/:id" element={<DeveloperEdit />} />
                </Route>

                <Route path="projects">
                    <Route index element={<ProjectList />} />
                    <Route path="create" element={<ProjectCreate />} />
                    <Route path="edit/:id" element={<ProjectEdit />} />
                </Route>

                <Route path="properties">
                    <Route index element={<PropertyList />} />
                    <Route path="create" element={<PropertyCreate />} />
                    <Route path="edit/:id" element={<PropertyEdit />} />
                </Route>

                <Route path="areas">
                    <Route index element={<AreaList />} />
                    <Route path="create" element={<AreaCreate />} />
                    <Route path="edit/:id" element={<AreaEdit />} />
                </Route>

                <Route path="tag-categories">
                    <Route index element={<TagCategoryList />} />
                    <Route path="create" element={<TagCategoryCreate />} />
                    <Route path="edit/:id" element={<TagCategoryEdit />} />
                </Route>

                <Route path="layout-types">
                    <Route index element={<LayoutTypeList />} />
                    <Route path="create" element={<LayoutTypeCreate />} />
                    <Route path="edit/:id" element={<LayoutTypeEdit />} />
                </Route>

                <Route path="features">
                    <Route index element={<FeatureList />} />
                    <Route path="create" element={<FeatureCreate />} />
                    <Route path="edit/:id" element={<FeatureEdit />} />
                </Route>

                <Route path="leads">
                    <Route index element={<LeadList />} />
                </Route>

                <Route path="*" element={<div>Not Found</div>} />
            </Route>
        </Routes>
      </Refine>
  );
};

export default AdminApp;
