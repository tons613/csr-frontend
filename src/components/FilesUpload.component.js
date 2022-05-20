import React, { Fragment, useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Box, Typography, Button, withStyles, Chip } from "@material-ui/core";
import UploadService from "services/upload-files.service";
import Input from "@material-tailwind/react/Input";
import { Alert } from "@material-tailwind/react";
import api from "../utils/config";
import Swal from "sweetalert2";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
  },
}))(LinearProgress);

const UploadFiles = (props) => {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [fileInfos, setFileInfos] = useState([]);
  const { title, docType, getPassport } = props;
  const [show, setShow] = useState(true);

  useEffect(() => {
    UploadService.getFiles(docType).then((response) => {
      setFileInfos(response.data);
    });
  }, []);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
    setMessage("");
  };
  const upload = () => {
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);
    UploadService.upload(currentFile, docType, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then((response) => {
        setMessage(response.data.message);
        setIsError(false);
        if (getPassport) {
          getPassport();
        }

        return UploadService.getFiles(docType);
      })
      .then((files) => {
        setFileInfos(files.data);
      })
      .catch(() => {
        setProgress(0);
        setMessage("Could not upload the file!");
        setCurrentFile(undefined);
        setIsError(true);
      });
    setSelectedFiles(undefined);
  };

  const deleteFile = (docId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        UploadService.deleteFile(docId).then(() => {
          if (getPassport) {
            getPassport();
          }
          setCurrentFile(undefined);
          setFileInfos([]);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  };
  return (
    <div className="lg:w-6/12 w-full">
      <Typography variant="caption">{title}</Typography>
      {currentFile && (
        <Box className="mb25" display="flex" alignItems="center">
          <Box width="100%" mr={1}>
            <BorderLinearProgress variant="determinate" value={progress} />
          </Box>
          <Box minWidth={35}>
            <Typography
              variant="body2"
              color="textSecondary"
            >{`${progress}%`}</Typography>
          </Box>
        </Box>
      )}
      {fileInfos && Object.keys(fileInfos).length > 0 ? (
        getPassport ? (
          <>
            <span className="bg-[#D56947] px-1 rounded  ml-5 cursor-pointer">
              <i
                className="fa-solid fa-xmark"
                onClick={() => deleteFile(fileInfos.docId)}
              ></i>
            </span>
          </>
        ) : (
          <div className="w-11/12">
            <Fragment>
              <div className="bg-[#8CC1C1] p-1 px-2 rounded ">
                <a
                  href={`${api.API_URL}/${fileInfos.filepath}`}
                  target="_blank"
                  className="text-white"
                >
                  View uploaded file
                </a>
                <span className="bg-[#D56947] px-1 rounded float-right cursor-pointer">
                  <i
                    className="fa-solid fa-xmark"
                    onClick={() => deleteFile(fileInfos.docId)}
                  ></i>
                </span>
              </div>
            </Fragment>
          </div>
        )
      ) : (
        <div>
          <input
            id="btn-upload"
            name="btn-upload"
            style={{
              opacity: 0,
              overflow: "hidden",
              position: "absolute",
              zIndex: 10,
              width: 132,
              height: 38,
            }}
            type="file"
            onChange={selectFile}
          />
          <label htmlFor="btn-upload" className="mr-2">
            <Button
              className="btn-choose"
              color="primary"
              variant="outlined"
              component="span"
            >
              Choose Files
            </Button>
          </label>
          <Button
            className="btn-upload"
            color="primary"
            variant="contained"
            component="span"
            disabled={!selectedFiles}
            onClick={upload}
          >
            Upload
          </Button>
        </div>
      )}
      <div className="file-name">
        {selectedFiles && selectedFiles.length > 0
          ? selectedFiles[0].name
          : null}
      </div>
      <Typography
        variant="subtitle2"
        color={`${isError ? "error" : "primary"}`}
        className={`upload-message ${isError ? "error" : ""}`}
      >
        {message}
      </Typography>
    </div>
  );
};
export default UploadFiles;
