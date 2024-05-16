"use client";

import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { open } from "@tauri-apps/api/dialog";
import { metadata } from "@/app/layout";
import { useToast } from "./ui/use-toast";

const fileInputTypes = ["epub", "pdf", "doc", "docx"];

export const FileUpload = ({
  children,
  setLoading,
}: {
  children: React.ReactNode;
  setLoading: (value: boolean) => void;
}) => {
  const { toast } = useToast();

  const [fileMetadata, setFileMetadata] = useState<any>(null);

  const handleFileUpload = async () => {
    setLoading(true);
    try {
      const filepath = await open({
        multiple: false,
        filters: [
          {
            name: "Documents",
            extensions: fileInputTypes,
          },
        ],
      });

      if (filepath) {
        const metadata = (await invoke("handle_upload", {
          filePath: filepath,
        })) as unknown as {
          success: boolean;
          data: { name: string; extension: string };
          error: any;
        };

        // TODO: Destructure the response and the display the toast properly
        console.log("Meta Data ===> ", metadata);

        if (metadata.success) {
          toast({
            title: `New ${metadata.data.extension} File`,
            description: `${metadata.data.name} has been added to your library`,
          });
        } else if (metadata.error instanceof Error) {
          toast({
            title: "Error",
            description: metadata.error.message,
            variant: "destructive",
          });
          console.error(metadata.error);
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div onClick={handleFileUpload}>{children}</div>
      {/* <div>
        {fileMetadata && (
          <div className="bg-green-400 p-1 text-sm px-5 text-green-900 flex gap-1 rounded-full">
            <span className="font-semibold">{fileMetadata?.name}</span>
            <span>has been added to your library</span>
          </div>
        )}
      </div> */}
    </div>
  );
};
