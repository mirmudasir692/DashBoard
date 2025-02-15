import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Dropdown = ({ icon, label, children, parentRoute, disabled = false }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Check if any child link is active and keep the dropdown open
  useEffect(() => {
    const isActive = React.Children.toArray(children).some(
      (child) => child.props.to === location.pathname
    );

    // Check if the current route starts with the parent route (for routes like /drugs/:drugId)
    const isParentRouteActive = location.pathname.startsWith(parentRoute);

    setIsOpen(isActive || isParentRouteActive);
  }, [location.pathname, children]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <li>
      <button
        disabled={disabled}
        onClick={toggleDropdown}
        className={`inline-flex items-center px-4 py-2 w-full text-left text-white hover:bg-accentSecondary/75 hover:text-textPrimary transition-colors duration-200 rounded-r-full disabled:cursor-not-allowed disabled:opacity-75`}
      >
        <span className="flex text-2xl mr-3">{icon}</span>
        <span className="text-lg font-medium truncate flex-1 inline-flex flex-col">
          {disabled && (
            <span className="text-xs">
              <span className="bg-slate-700 text-white px-2 rounded-full font-mono">
                Comming Soon
              </span>
            </span>
          )}
          <span>{label}</span>
        </span>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </button>
      <ul
        className={`transition-all duration-200 ease-in-out overflow-hidden ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        {children}
      </ul>
    </li>
  );
};

const SidebarItem = ({
  to,
  icon,
  label,
  bottom = false,
  logout = false,
  onClick,
  className,
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className="list-none">
      <Link
        to={to}
        className={`flex items-center px-4 py-2 transition-colors duration-200 rounded-r-full ${
          isActive
            ? "bg-accentSecondary/75 text-textPrimary"
            : logout
            ? "hover:bg-error hover:text-accentSecondary"
            : "hover:bg-accentSecondary/75 hover:text-textPrimary"
        } ${bottom ? "mr-4" : ""}`}
        onClick={onClick}
      >
        <span className="flex text-2xl mr-3">{icon}</span>
        <span className="text-lg font-medium truncate flex-1">{label}</span>
      </Link>
    </li>
  );
};

const SidebarSubItem = ({ to, icon, label, disabled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses = `flex items-center px-8 mr-6 my-1 py-1 transition-colors duration-200 rounded-r-full ${
    isActive
      ? "bg-accentSecondary/75 text-textPrimary"
      : "hover:bg-accentSecondary/75 hover:text-textPrimary"
  }`;

  return (
    <li>
      {disabled ? (
        <div className={`${baseClasses} cursor-not-allowed opacity-75`}>
          <span className="flex text-md mr-3">{icon}</span>
          <span className="text-md font-medium truncate flex-1">{label}</span>
          <span className="ml-2 text-xs bg-slate-700 text-white px-2 rounded-full font-mono">
            Coming Soon
          </span>
        </div>
      ) : (
        <Link to={to} className={baseClasses}>
          <span className="flex text-md mr-3">{icon}</span>
          <span className="text-md font-medium truncate flex-1">{label}</span>
        </Link>
      )}
    </li>
  );
};

export { Dropdown, SidebarItem, SidebarSubItem };
