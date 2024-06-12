import GDdriveLogo from "../../src/assets/5968523.png";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AppsIcon from "@mui/icons-material/Apps";
import PropTypes from "prop-types";

const Header = ({ userPhoto, onLogout }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
      <div className="flex items-center">
        <img src={GDdriveLogo} alt="Google Drive Logo" className="h-6 mr-2" />
        <span className="text-lg font-semibold text-gray-800">Drive</span>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <div className="relative w-full max-w-xl">
          <SearchIcon className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search in Drive"
            className="pl-10 pr-5 py-3 rounded-full bg-gray-200 text-gray-800 focus:outline-none focus:ring focus:ring-blue-400 w-full"
          />
          <ExpandMoreIcon className="absolute right-3 top-3 text-gray-500" />
        </div>
      </div>
      <div className="flex items-center space-x-5">
        <div className="flex items-center space-x-4">
          <HelpOutlineIcon className="text-gray-600 cursor-pointer hover:text-blue-500" />
          <SettingsIcon className="text-gray-600 cursor-pointer hover:text-blue-500" />
        </div>
        <div>
          <AppsIcon className="text-gray-600 cursor-pointer hover:text-blue-500" />
        </div>
        <img
          src={userPhoto}
          alt="User Photo"
          className="h-8 w-8 rounded-full"
        />
        <button
          className="rounded-full p-2 text-black hover:bg-sky-600 border-2 border-sky-500 hover:text-white font-semibold transition-colors duration-300"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
Header.propTypes = {
  userPhoto: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Header;
