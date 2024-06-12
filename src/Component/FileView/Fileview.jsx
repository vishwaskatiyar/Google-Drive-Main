import { useEffect, useState } from "react";
import { db, auth } from "../../../firebase";
import FileItem from "./Fileitem";
import FileCard from "./FileCard";

const FilesView = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      db.collection("myFiles")
        .where("userId", "==", currentUser.uid)
        .onSnapshot((snapshot) => {
          setFiles(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              item: doc.data(),
            }))
          );
        });
    }
  }, []);

  console.log(files);

  return (
    <div className="fileView p-4">
      <div
        className="fileView__row w-3/4 mx-auto mb-8"
        style={{ position: "absolute", left: "350px", top: "100px" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.slice(0).map(({ id, item }) => (
            <FileCard key={id} name={item.caption} />
          ))}
        </div>
      </div>

      <div className="fileView__titles flex justify-between items-center border-b border-gray-300 py-2 mb-4">
        <div className="fileView__titles--left flex-1">
          <p className="text-gray-600 font-medium">Name</p>
        </div>
        <div className="fileView__titles--right flex-1 flex justify-end space-x-16">
          <p className="text-gray-600 font-medium">Last modified</p>
          <p className="text-gray-600 font-medium">File size</p>
        </div>
      </div>
      <div className="fileView__items space-y-4">
        {files.map(({ id, item }) => (
          <FileItem
            key={id}
            id={id}
            caption={item.caption}
            timestamp={item.timestamp}
            fileUrl={item.fileUrl}
            size={item.size}
          />
        ))}
      </div>
    </div>
  );
};

export default FilesView;
