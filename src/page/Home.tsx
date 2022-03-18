import { useState, useEffect } from "react";

import * as post from "../store/PostStore";
import LinearProgress from "@mui/material/LinearProgress";

import { observer } from "mobx-react-lite";
import PostList from "../component/post-list/postList";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const Home = observer(() => {
  const { postStore } = post.useStore();
  const [title, setTitle] = useState<string>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    postStore.getList();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
  };
  const submitSearch = (id: string | undefined) => {
    postStore.getListById(id);
  };
  const handleAdd = async (tit?: string) => {
    await postStore.postList(tit);
  };
  return (
    <div>
      {postStore.loading ? (
        <LinearProgress />
      ) : (
        <>
          <div className="flex items-center justify-center text-center my-2">
            <h1 className="text-5xl text-center font-light underline ">
              Post List
            </h1>
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={handleClickOpen}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <form className="w-full max-w-sm">
            <div className="flex ">
              {/* <div className="flex items-center border-b border-teal-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Title name"
                  aria-label="Name"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <button
                  className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="button"
                  onClick={(e) => handleAdd(title)}
                >
                  Add post
                </button>
              </div> */}

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add post</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Write a new title. We will send updates occasionally.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Title post"
                    type="text"
                    fullWidth
                    variant="standard"
                    placeholder="Write your title post"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button
                    onClick={(e) => {
                      handleAdd(title);
                      handleClose();
                    }}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
              {/* <div className="flex items-center border-b border-teal-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="ID"
                  aria-label="Name"
                  value={id}
                  onChange={(e) => {
                    setID(e.target.value);
                  }}
                />
                <button
                  className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="button"
                  onClick={() => {
                    submitSearch(id);
                  }}
                >
                  Search By Id
                </button>
              </div> */}
            </div>
          </form>
          {/* <PostList storeDB={posts} mainStore={postStore} /> */}
          <PostList mainStore={postStore} />
        </>
      )}
    </div>
  );
});
export default Home;
