"use client";

import { getAllBooks } from "@/actions";
import { FileUpload } from "@/components";
import { Button } from "@/components/ui/button";
import { Book } from "@prisma/client";
import { LibraryBig, Loader2Icon } from "lucide-react";
import * as React from "react";

export const DefaultScreens: React.FC = () => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [fileLoading, setFileLoading] = React.useState<boolean>(false);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);

    const res = await getAllBooks();

    if (res.success) {
      setBooks(res.data || []);
    } else if (res.error) {
      console.error(res.error);
      setError("Failed to fetch books. Please try again later.");
    }

    setLoading(false);
  };

  // Side Effects
  React.useEffect(() => {
    fetchBooks();
  }, []);

  const renderWhenEmpty = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center text-accent">
        <LibraryBig className="w-60 h-60 stroke-accent" />
        <h1 className="text-2xl font-semibold">No Books Added Yet</h1>
        <p className="mt-3 mb-8">Open a book and start reading.</p>
        <FileUpload setLoading={setFileLoading}>
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm leading-loose font-semibold">
              (.epub, .pdf is the only supported file type for now)
            </p>
            <Button size="lg" disabled={fileLoading}>
              {fileLoading && (
                <Loader2Icon className="w-4 h-4 animate-spin mr-2" />
              )}
              <span>Open</span>
            </Button>
          </div>
        </FileUpload>
      </div>
    </div>
  );

  const renderError = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-red-500">{error}</div>
    </div>
  );

  const renderBooks = () => <div>{/* Render your books here */}</div>;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return renderError();
  }

  return (
    <div className="w-full h-screen">
      {books.length === 0 ? renderWhenEmpty() : renderBooks()}
    </div>
  );
};
