"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push("/dashboard")
  }, [])
  return (
    <div className="">
      <h1>Hello</h1>
      <p>I've created a Next.js app with all the features you requested:
        Features:

        Top Navbar: Sticky header with logo, mobile menu trigger, and theme switcher
        Sidebar: Desktop sidebar (hidden on mobile) with navigation items
        Mobile Responsive: Sheet component opens sidebar on mobile devices
        Theme Switcher: Toggle between light and dark themes with sun/moon icons
        shadcn/ui Components: Uses Button and Sheet components

        Key Components:</p>
    </div>
  );
}
