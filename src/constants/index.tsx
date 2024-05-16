import { BarChart2, Library } from "lucide-react";
import { cn } from "@/lib/utils";

export const currentPage = {
  default: 1,
  reading: 2,
  stats: 3,
};

export type DefaultSideBarType = {
  label: string;
  icon?: (className: string) => React.ReactNode;
  onclick?: () => void;
  shortcut?: string;
  submenu?: DefaultSideBarType[];
};

export const DefaultSideBar: DefaultSideBarType[] = [
  {
    label: "Library",
    onclick: () => console.log("Library clicked"),
    shortcut: "cmdOrCtrl+L",
    submenu: [
      {
        label: "All Books",
        onclick: () => {
          console.log("All Books");
        },
        icon: (className: string) => <Library className={cn(className)} />,
      },
    ],
  },
  {
    label: "Stats",
    submenu: [
      {
        label: "Readings",
        icon: (className: string) => <BarChart2 className={cn(className)} />,
        onclick: () => {
          console.log("Readings");
        },
      },
    ],
  },
];

export const ReadingSideBar = [
  {
    label: "Content",
    onclick: () => console.log("Content clicked"),
    submenu: [],
  },
];
