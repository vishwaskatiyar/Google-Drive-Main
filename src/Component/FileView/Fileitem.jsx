import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import GetAppIcon from "@material-ui/icons/GetApp";
import PropTypes from "prop-types";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const FileItem = ({ caption, timestamp, fileUrl, size }) => {
  const fileDate = `${timestamp?.toDate().getDate()} ${
    monthNames[timestamp?.toDate().getMonth() + 1]
  } ${timestamp?.toDate().getFullYear()}`;

  const getReadableFileSizeString = (fileSizeInBytes) => {
    let i = -1;
    const byteUnits = [" kB", "B", "B", "B", "PB", "EB", "ZB", "YB"];
    do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  };

  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = caption;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fileItem p-4 hover:bg-gray-100 rounded-md flex items-center justify-between">
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center no-underline"
      >
        <div className="fileItem--left flex items-center">
          <InsertDriveFileIcon className="text-blue-500 mr-2" />
          <p className="text-gray-700">{caption}</p>
        </div>
        <div className="fileView__titles--right flex-1 flex justify-end space-x-16">
          <GetAppIcon
            className="text-blue-500 cursor-pointer"
            onClick={handleDownload}
          />
          <p className="flex-shrink-0">{fileDate}</p>
          <p className="flex-shrink-0">{getReadableFileSizeString(size)}</p>
        </div>
      </a>
    </div>
  );
};

FileItem.propTypes = {
  caption: PropTypes.string.isRequired,
  timestamp: PropTypes.instanceOf(Date).isRequired,
  fileUrl: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default FileItem;
