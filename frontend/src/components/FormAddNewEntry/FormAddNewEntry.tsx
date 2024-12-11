import React, { useCallback, useState } from "react";
import { IInputEntry } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid2";
import { Box, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { selectAddLoading } from "../../slices/EntriesSlice.ts";
import FileInput from "../FileInput/FileInput.tsx";
import { createEntry, fetchAllEntries } from "../../thunks/EntriesThunk.ts";
import { animateScroll } from "react-scroll";

const initialState: IInputEntry = {
  author: "",
  message: "",
  image: null,
};

const FormAddNewEntry = () => {
  const [inputEntry, setInputEntry] = useState<IInputEntry>(initialState);
  const isAddLoading = useAppSelector(selectAddLoading);
  const dispatch = useAppDispatch();
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputEntry((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fetchMessages = useCallback(async () => {
    await dispatch(fetchAllEntries());
    const options = {
      duration: 500,
      smooth: true,
    };
    animateScroll.scrollToBottom(options);
  }, [dispatch]);

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputEntry.message.trim().length > 0) {
      setInputEntry({
        ...inputEntry,
        author: inputEntry.author,
        message: inputEntry.message,
      });
      postNewMessage().catch((e) => console.error(e));
      setTimeout(fetchMessages, 3000);
    } else {
      toast.error("Fill all fields.");
    }
  };

  const postNewMessage = useCallback(async () => {
    if (inputEntry.message.trim().length > 0) {
      await dispatch(createEntry(inputEntry));
      toast.success("Message added successfully!");
      setInputEntry(initialState);
    }
  }, [dispatch, inputEntry]);

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setInputEntry((prevState) => ({
        ...prevState,
        [name]: files[0] || null,
      }));
    }
  };

  return (
    <Box marginBottom={2}>
      <form onSubmit={submitForm}>
        <Grid size={12} marginTop={3} marginBottom={1}>
          <TextField
            fullWidth
            rows={4}
            id="decoded"
            label="Your name"
            value={inputEntry.author}
            onChange={inputChangeHandler}
            name="author"
          />
        </Grid>
        <Grid size={8}>
          <TextField
            fullWidth
            multiline
            rows={4}
            id="message"
            label="Your message:"
            value={inputEntry.message}
            onChange={inputChangeHandler}
            name="message"
          />
        </Grid>
        <Grid size={8}>
          <FileInput
            onGetFile={fileEventChangeHandler}
            name={"image"}
            label={"Image"}
          />
        </Grid>
        <Box marginTop={1} marginBottom={4}>
          <LoadingButton
            disabled={isAddLoading}
            loading={isAddLoading}
            variant={"contained"}
            type={"submit"}
          >
            Send
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default FormAddNewEntry;
