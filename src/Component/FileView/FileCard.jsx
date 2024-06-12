import DescriptionIcon from "@mui/icons-material/Description";

const FileCard = ({ name }) => {
  return (
    <div className="fileCard border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
      <div className="fileCard--top bg-gradient-to-r from-blue-400 to-blue-500 flex justify-center items-center p-6">
        <DescriptionIcon style={{ fontSize: 80 }} className="text-white" />
      </div>
      <div className="fileCard--bottom p-4 bg-white">
        <p className="text-center text-gray-900 font-semibold">{name}</p>
      </div>
    </div>
  );
};

export default FileCard;
