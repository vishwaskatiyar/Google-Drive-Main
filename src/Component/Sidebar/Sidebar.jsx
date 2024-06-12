import NewFile from "./NewFile";
import SidebarItems from "./SidebarItems";

import AddToDriveTwoToneIcon from "@mui/icons-material/AddToDriveTwoTone";
import ComputerTwoToneIcon from "@mui/icons-material/ComputerTwoTone";
import ShareTwoToneIcon from "@mui/icons-material/ShareTwoTone";
import ScheduleTwoToneIcon from "@mui/icons-material/ScheduleTwoTone";
import StarRateTwoToneIcon from "@mui/icons-material/StarRateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import CloudDownloadTwoToneIcon from "@mui/icons-material/CloudDownloadTwoTone";

const Sidebar = () => {
  return (
    <div className="sideBar bg-white w-64 h-full flex flex-col justify-between">
      <NewFile />
      <div className="sidebar_itemContainer">
        <SidebarItems
          arrow
          icon={<AddToDriveTwoToneIcon />}
          label={"My Drive"}
        />
        <SidebarItems
          arrow
          icon={<ComputerTwoToneIcon />}
          label={"Computers"}
        />
        <SidebarItems icon={<ShareTwoToneIcon />} label={"Shared with me"} />
        <SidebarItems icon={<ScheduleTwoToneIcon />} label={"Recent"} />
        <SidebarItems icon={<StarRateTwoToneIcon />} label={"Starred"} />
        <SidebarItems icon={<DeleteTwoToneIcon />} label={"Bin"} />
        <hr className="my-2 border-t border-gray-300" />
        <SidebarItems icon={<CloudDownloadTwoToneIcon />} label={"Storage"} />
      </div>
    </div>
  );
};

export default Sidebar;
