import PropTypes from "prop-types";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const SidebarItems = ({ arrow, icon, label }) => {
  return (
    <div className="sidebarItems flex items-center py-3 px-4 hover:text-blue-500 hover:bg-gray-200 rounded-lg cursor-pointer">
      <div className="sidebarItems_arrow mr-2">
        {arrow && <ArrowRightIcon />}
      </div>
      <div className="sidebarItems_content flex items-center ">
        <div className="mr-2 text-gray-600">{icon}</div>
        <p className="text-gray-800">{label}</p>
      </div>
    </div>
  );
};

SidebarItems.propTypes = {
  arrow: PropTypes.bool,
  icon: PropTypes.element,
  label: PropTypes.string,
};

export default SidebarItems;
