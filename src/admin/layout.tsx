import React from "react";
import { useMenu, useNavigation, useGo } from "@refinedev/core";
import { Link, Outlet } from "react-router-dom";
import { cn } from "../lib/utils";
import { LayoutDashboard, Users, Building, MapPin, Tag, MessageSquare } from "lucide-react";

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { menuItems, selectedKey } = useMenu();
  const go = useGo();

  const iconMap: Record<string, React.ReactNode> = {
    dashboard: <LayoutDashboard className="h-4 w-4 mr-2" />,
    developers: <Users className="h-4 w-4 mr-2" />,
    projects: <Building className="h-4 w-4 mr-2" />,
    properties: <Building className="h-4 w-4 mr-2" />,
    areas: <MapPin className="h-4 w-4 mr-2" />,
    "tag-categories": <Tag className="h-4 w-4 mr-2" />,
    features: <Tag className="h-4 w-4 mr-2" />,
    leads: <MessageSquare className="h-4 w-4 mr-2" />,
  };

  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link to="/admin" className="flex items-center gap-2 font-semibold">
            <Building className="h-6 w-6" />
            <span className="">Real Estate Admin</span>
          </Link>
        </div>
        <nav className="flex flex-col gap-4 px-2 py-4">
            {menuItems.map((item) => (
                <Link
                    key={item.key}
                    to={item.route ?? "/admin"}
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                        selectedKey === item.key ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                >
                    {iconMap[item.key as string] || <Tag className="h-4 w-4 mr-2" />}
                    {item.label}
                </Link>
            ))}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64 w-full">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* Breadcrumbs or Title could go here */}
          <div className="ml-auto flex items-center gap-2">
             {/* User Menu Placeholder */}
          </div>
        </header>
        <main className="flex flex-col flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-full">
            {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};
