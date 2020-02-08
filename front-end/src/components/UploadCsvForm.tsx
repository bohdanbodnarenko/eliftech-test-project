import React, { useCallback, useState } from "react";
import { Modal, Paper, CircularProgress, Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";

interface Props {
  open: boolean;
  uploadedPercent: number;
  onClose: () => void;
  onFilesSubmit: (files: File[]) => void;
}

const UploadCsvForm = ({
  open,
  uploadedPercent,
  onClose,
  onFilesSubmit
}: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv"
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Paper className={"modal-body"}>
        <div {...getRootProps()} className={"input-wrapper"}>
          <input
            {...getInputProps()}
            className={"file-input"}
            data-directory=""
            data-webkitdirectory=""
          />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : selectedFiles.length ? (
            <p>{selectedFiles.map(({ name }) => name).join(", ")}</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        <Button color={"primary"} onClick={() => onFilesSubmit(selectedFiles)}>
          Upload
        </Button>
        {uploadedPercent > 0 && (
          <CircularProgress variant={"indeterminate"} value={uploadedPercent} />
        )}
      </Paper>
    </Modal>
  );
};

export default UploadCsvForm;
