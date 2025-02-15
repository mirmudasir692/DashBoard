import React from "react";
import Sidebar from "./sidebar";

const Main = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main
        className={`flex-1 transition-all duration-300 md:ml-72 px-2 lg:ml-70 mb-10`}
      >
        {children}
      </main>
    </div>
  );
};

export default Main;
