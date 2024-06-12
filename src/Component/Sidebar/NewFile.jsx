import { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import firebase from "firebase";
import { storage, db, auth } from "../../../firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import LinearProgress from "@material-ui/core/LinearProgress";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const NewFile = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(null); // Clear any previous error
  };

  const handleChange = (e) => {
    setError(null); // Clear any previous error when a new file is selected
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("User not authenticated.");
      setUploading(false);
      return;
    }

    const uploadTask = storage
      .ref(`files/${currentUser.uid}/${file.name}`)
      .put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
      },
      (error) => {
        setError("An error occurred while uploading the file.");
        setUploading(false);
      },
      () => {
        storage
          .ref(`files/${currentUser.uid}`)
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("myFiles").add({
              userId: currentUser.uid,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: file.name,
              fileUrl: url,
              size: file.size,
            });

            setUploading(false);
            setOpen(false);
            setFile(null);

            alert("Upload successful!");
          });
      }
    );
  };

  return (
    <div className="newFile p-2 ml-2 bg-gray-100 rounded-full mt-5 border border-sky-200 hover:bg-sky-200 shadow-md relative">
      <div
        className="newFile__container flex items-center cursor-pointer"
        onClick={handleOpen}
      >
        <AddIcon fontSize="large" className="text-blue-500" />
        <p className="ml-2 text-lg font-semibold text-blue-500">New</p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div
          style={modalStyle}
          className={`${classes.paper} bg-white p-6 rounded-lg shadow-lg`}
        >
          <p className="text-lg font-medium mb-4">Select a file to upload:</p>
          {uploading && <LinearProgress value={uploadProgress} />}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {!uploading && (
            <>
              <input type="file" onChange={handleChange} className="mb-4" />
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Upload
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default NewFile;
