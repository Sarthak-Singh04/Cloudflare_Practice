
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Suspense } from "react";

import PublicProjectsList from "./PublicProjectList";
import LoadingCardGrid from "@/components/LoadingCardGrid";

export default function ProjectsTab() {
  return (
    <div className="w-full">
      <Tabs defaultValue="public" className="w-full">
        <TabsList className="w-auto inline-flex border-b border-gray-200">
          <TabsTrigger
            value="public"
            className="px-4 py-2 text-sm font-medium transition-all hover:text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
          >
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="my"
            className="px-4 py-2 text-sm font-medium transition-all hover:text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-gray-900"
          >
            My Projects
          </TabsTrigger>
        </TabsList>
        <TabsContent value="public" className="w-full mt-4 py-8">
          <Suspense fallback={<LoadingCardGrid count={10} />}>
            <PublicProjectsList />
          </Suspense>
        </TabsContent>
        <TabsContent value="my" className="w-full mt-4 py-8">
          <p>My projects will be displayed here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}