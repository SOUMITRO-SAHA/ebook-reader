import * as React from "react";
import { DefaultSideBar, DefaultSideBarType } from "@/constants";

const SideBar = () => {
  // Take this Information from the Redux Store:
  const [menuItems] = React.useState<DefaultSideBarType[]>(DefaultSideBar);
  const renderMenuItem = () => {
    return (
      <div className="w-full h-screen bg-muted">
        {/* Title */}
        <div className="flex items-center justify-center py-2">
          <h1 className="mx-auto font-bold text-balance text-primary">
            Ebook Reader
          </h1>
        </div>
        {menuItems.map((item) => {
          return (
            <div className="p-2 px-3" key={item.label}>
              <h3 className="text-xs font-semibold text-accent">
                {item.label}
              </h3>
              <ul className="mt-1">
                {item?.submenu?.map(({ label, icon, shortcut }) => (
                  <li
                    key={`${item.label}__${label}`}
                    className="flex items-center gap-3 p-1 px-4 text-sm rounded cursor-pointer text-slate-200 hover:bg-gray-700"
                  >
                    <span>{icon && icon("w-4 h-4")}</span>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };
  return <div className="w-full h-full bg-background">{renderMenuItem()}</div>;
};

export default SideBar;
