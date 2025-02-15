import {
  Save,
  Edit,
  Cancel,
  ShoppingCart,
  AddCircle,
} from "@mui/icons-material";
import { TbFileInvoice } from "react-icons/tb";
import Spinner from "./spinner";

const PrimaryButton = ({
  onClick,
  label,
  filled = true, // Default to a filled button
  iconType = "save", // Default icon
  icon = true,
  shortcut = "", // Optional shortcut
  customClasses = "",
  fullWidth = false,
  disabled = false,
  loading = false,
  customIcon,
  size = "base",
}) => {
  const getIconSize = (size) => {
    switch (size) {
      case "extrasmall":
        return "inherit";
      case "small":
        return "small";
      case "medium":
        return "medium";
      case "base":
        return "medium";
      case "large":
        return "large";
      case "extraLarge":
        return "inherit";
      case "extraExtraLarge":
        return "inherit";
    }
  };

  const icons = icon && {
    save: <Save fontSize={`${getIconSize(size)}`} />,
    add: <AddCircle fontSize={`${getIconSize(size)}`} />,
    edit: <Edit fontSize={`${getIconSize(size)}`} />,
    cancel: <Cancel fontSize={`${getIconSize(size)}`} />,
    shop: <ShoppingCart fontSize={`${getIconSize(size)}`} />,
    invoice: <TbFileInvoice fontSize={`${getIconSize(size)}`} />,
    // if icon is provided, render the icon
    custom: customIcon,
  };

  const baseClasses =
    "text-center font-bold px-6 border border-primary rounded-full flex items-center justify-center gap-2 transition-all duration-200";

  const filledClasses = `bg-primary text-accentSecondary ${
    !loading ? "hover:bg-accentSecondary hover:text-primary" : ""
  }`;
  const outlinedClasses = `text-primary ${
    !loading ? "hover:bg-primary hover:text-accentSecondary" : ""
  }`;

  const getSize = (size) => {
    switch (size) {
      case "extrasmall":
        return "text-xs py-1";
      case "small":
        return "text-sm py-1";
      case "medium":
        return "text-md py-1";
      case "base":
        return "text-base py-2";
      case "large":
        return "text-lg py-2";
      case "extraLarge":
        return "text-xl py-2";
      case "extraExtraLarge":
        return "text-2xl py-2";
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group ${baseClasses} ${getSize(size)} ${
        filled ? filledClasses : outlinedClasses
      } ${customClasses} ${fullWidth ? "w-full" : ""} ${
        loading || disabled ? "opacity-70 w" : ""
      }`}
      disabled={loading || disabled}
    >
      {loading ? (
        <Spinner bg={filled ? "dark" : "light"} />
      ) : (
        <>
          {icons[iconType]} {/* Render the selected icon */}
          <span>{label}</span> {/* Render the label */}
          {shortcut && // Render the shortcut if provided
            shortcut
              .split(",")
              .map((shortcut, index) => (
                <span
                  key={index}
                  className={`text-xs py-1 px-2 rounded font-mono ${
                    filled
                      ? "text-primary bg-white group-hover:text-white group-hover:bg-primary"
                      : "text-primary bg-primary/10 group-hover:bg-white"
                  }`}
                ></span>
              ))}
        </>
      )}
    </button>
  );
};

export default PrimaryButton;
