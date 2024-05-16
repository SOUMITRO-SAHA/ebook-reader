"use client";

import SideBar from "@/components/sidebar/sidebar";
import { StoreProvider } from "@/redux/store";
import { DefaultScreens } from "@/components/screens";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  const currentPage = 1;

  const renderActivePage = (currentPage: number) => {
    switch (currentPage) {
      case 1:
        return <DefaultScreens />;
      default:
        return <DefaultScreens />;
    }
  };

  return (
    <StoreProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <main className="flex w-screen h-screen overflow-hidden bg-background">
          {/* Sidebar */}
          <section className="w-[250px]">
            <SideBar />
          </section>
          {/* Other Pages */}
          <section className="w-[calc(100%-250px)]">
            {renderActivePage(currentPage)}
          </section>
        </main>
      </ThemeProvider>
    </StoreProvider>
  );
}
