import FormAddNewEntry from "../../components/FormAddNewEntry/FormAddNewEntry.tsx";
import EntryItem from "../../components/EntryItem/EntryItem.tsx";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  selectEntries,
  selectFetchLoading,
} from "../../slices/EntriesSlice.ts";

import { fetchAllEntries } from "../../thunks/EntriesThunk.ts";
import {
  Box,
  CircularProgress,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { animateScroll } from "react-scroll";

const GuestBook = () => {
  const entries = useAppSelector(selectEntries);
  const dispatch = useAppDispatch();
  const isAllFetchLoading = useAppSelector(selectFetchLoading);

  const fetchEntries = useCallback(async () => {
    await dispatch(fetchAllEntries());
    const options = {
      duration: 500,
      smooth: true,
    };
    animateScroll.scrollToBottom(options);
  }, [dispatch]);

  useEffect(() => {
    void fetchEntries();
  }, [fetchEntries]);

  return (
    <>
      <Toolbar variant={"dense"}>
        <Typography
          variant={"h3"}
          marginTop={3}
          marginBottom={3}
          color={"primary"}
          marginInline={"auto"}
          align={"center"}
        >
          Guest book
        </Typography>
      </Toolbar>
      <Container maxWidth={"md"}>
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
    </>
  );
};

export default GuestBook;
