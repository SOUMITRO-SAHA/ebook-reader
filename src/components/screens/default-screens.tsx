import { LibraryBig } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DefaultScreens = () => {
  const renderWhenEmpty = () => {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center text-accent">
          <LibraryBig className="w-60 h-60 stroke-accent" />
          <h1 className="text-2xl font-semibold">No Books Added Yet</h1>
          <p className="mt-3 mb-8">Open a books and start Reading.</p>
          <Button size={"lg"}>Open</Button>
        </div>
      </div>
    );
  };

  return <div className="w-full h-screen">{renderWhenEmpty()}</div>;
};
