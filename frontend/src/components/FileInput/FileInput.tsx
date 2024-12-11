import React, { useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Button, TextField } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

interface Props {
  name: string;
  label: string;
  onGetFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<Props> = ({ name, label, onGetFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
    onGetFile(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        type={"file"}
        name={name}
        onChange={onFileChange}
        ref={inputRef}
      />
      <Grid
        container
        marginTop={1}
        spacing={2}
        direction="row"
        alignItems={"center"}
      >
        <Grid>
          <TextField
            disabled
            label={label}
            value={fileName}
            onClick={activateInput}
          />
        </Grid>
        <Grid>
          <Button
            variant={"text"}
            onClick={activateInput}
            style={{ height: "50px" }}
          >
            <AttachFileIcon fontSize={"large"} />
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
