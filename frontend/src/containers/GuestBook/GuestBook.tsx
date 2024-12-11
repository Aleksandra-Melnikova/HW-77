import FormAddNewEntry from "../../components/FormAddNewEntry/FormAddNewEntry.tsx";
import EntryItem from "../../components/EntryItem/EntryItem.tsx";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectEntries,
  selectFetchLoading,
} from '../../slices/EntriesSlice.ts';

import {
  fetchAllEntries
} from '../../thunks/EntriesThunk.ts';
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { animateScroll } from "react-scroll";

const GuestBook = () => {
  const entries = useAppSelector(selectEntries);
  const dispatch = useAppDispatch();
  const isAllFetchLoading = useAppSelector(selectFetchLoading);


  const fetchMessages = useCallback(async () => {
    await dispatch(fetchAllEntries());
    const options = {
      duration: 500,
      smooth: true,
    };
    animateScroll.scrollToBottom(options);
  }, [dispatch]);

  useEffect(() => {
    void fetchMessages();
  }, [fetchMessages]);

  return (
    <Container maxWidth={"md"}>
      <Typography
        variant={"h3"}
        marginTop={3}
        marginBottom={3}
        align={"center"}
      >
        Chat
      </Typography>

      {isAllFetchLoading ? (
        <Box textAlign={"center"}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {" "}
          {entries.length === 0 && !isAllFetchLoading ? (
            <Typography align={"center"} variant="h6">
              No entries
            </Typography>
          ) : (
            <Box style={{ position: "relative" }}>
              {" "}
              {entries.map((entry) => (
                <EntryItem
                  key={entry.id}
                  message={entry.message}
                  author={entry.author}
                  image={entry.image}
                />
              ))}
            </Box>
          )}
        </>
      )}
      <Box marginBottom={2} padding={3}>
        <FormAddNewEntry />
      </Box>
    </Container>
  );
};

export default GuestBook;
