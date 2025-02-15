import React, { useContext } from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { Dropdown, SidebarItem, SidebarSubItem } from "../globals/Dropdown";
import { Link } from "react-router-dom";
import { List } from "@mui/material";
import { Help, Home } from "@mui/icons-material";
import { SidebarContext } from "../globals/sidebarContext";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

  return (
    <div className="relative">
      <aside
        className={`z-1 fixed top-1 left-1 mr-2 rounded-xl bg-primary text-white transition-all duration-500
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 w-full max-w-[17rem] mt-20 h-[calc(100vh-6rem)] md:mt-0 md:h-[calc(100vh-.5rem)] shadow-lg`}
      >
        <div className="flex items-center justify-center h-16">
          <h1 className="mt-4 text-2xl font-semibold">MediFlux</h1>
        </div>

        <div className="h-px bg-accentSecondary/75 mt-3 mx-4" />

        <div className="flex-1 relative overflow-y-auto scrollbar-hide md:h-[calc(100vh-10.5rem)] h-[calc(100vh-16rem)]">
          <nav className="flex-1 mt-6 mr-4">
            <ul className="flex flex-col space-y-2">
              <SidebarItem to="/" icon={<Home />} label="Home" />

              <Dropdown icon={<List />} label="Main Menu" parentRoute="/menu">
                <SidebarSubItem to="/stores/" icon={<List />} label="Stores" />
                <SidebarSubItem
                  to="/create_store/"
                  icon={<List />}
                  label="Create Store"
                />
                <SidebarSubItem
                  href="https://github.com/elangosundar/awesome-pakistan"
                  icon={<List />}
                  label="Purchases"
                />
                <SidebarSubItem
                  href="https://github.com/elangosundar/awesome-pakistan"
                  icon={<List />}
                  label="Customers"
                />
                <SidebarSubItem
                  href="https://github.com/elangosundar/awesome-pakistan"
                  icon={<List />}
                  label="Suppliers"
                />
                <SidebarSubItem
                  href="https://github.com/elangosundar/awesome-pakistan"
                  icon={<List />}
                  label="Reports"
                />
                <SidebarSubItem
                  href="https://github.com/elangosundar/awesome-pakistan"
                  icon={<List />}
                  label="Inventory"
                />
              </Dropdown>

              <SidebarItem
                href="https://github.com/elangosundar/awesome-pakistan"
                icon={<Help />}
                label="Help"
              />
            </ul>
          </nav>
        </div>
      </aside>

      {/* Toggle Button */}
      <button
        className={`z-20 fixed top-1/2 transform -translate-y-1/2 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
          isSidebarOpen ? "left-[16rem]" : "left-[-1.4rem]"
        }`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <MdOutlineArrowBackIos size={20} />
        ) : (
          <MdOutlineArrowForwardIos size={20} />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
