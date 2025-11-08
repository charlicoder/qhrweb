"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

// Define the props for our new component
interface AnimatedTabsProps {
  tabs: {
    value: string;
    label: string;
    content: React.ReactNode;
  }[];
  defaultValue: string;
}

export function AnimatedTabs({ tabs, defaultValue }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <Tabs
      defaultValue={defaultValue}
      onValueChange={setActiveTab}
      className="w-full my-5"
    >
      {/* Updated TabsList with responsiveness */}
      <TabsList className="
        w-full h-[60px] justify-start rounded-none bg-transparent p-0 
        border-b border-gray-200 dark:border-gray-700
        overflow-x-auto
        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
      ">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="
              h-full rounded-none px-3 sm:px-4 text-sm sm:text-base font-medium flex-shrink-0
              border-b-2 border-transparent 
              transition-all duration-300
              
              /* Light mode styles */
              text-gray-500
              data-[state=active]:border-b-blue-500 
              data-[state=active]:text-blue-500 
              data-[state=active]:shadow-none

              /* Dark mode styles */
              dark:text-gray-400
              dark:data-[state=active]:border-b-yellow-400
              dark:data-[state=active]:text-yellow-400
            "
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="bg-gray-200">
              {tab.content}
            </TabsContent>
          ))}
        </motion.div>
      </AnimatePresence>
    </Tabs>
  );
}