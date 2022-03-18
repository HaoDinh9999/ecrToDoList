import { useState, useEffect } from "react";

import * as post from "../store/PostStore";
import LinearProgress from "@mui/material/LinearProgress";

import { observer } from "mobx-react-lite";
const EditPost = observer(() => {
  const { postStore } = post.useStore();
  const [title1, setTitle] = useState<string>();
  useEffect(() => {
    handleGetPost();
  }, []);
  const handleGetPost = async () => {
    const res = await postStore.getListById(
      window.location.pathname.split("/")[2]
    );
    try {
      setTitle(res.title);
    } catch {}
  };
  const handleEdit = async (tit?: string) => {
    const result = await postStore.editPost({
      title: title1,
      id: Number(window.location.pathname.split("/")[2]),
      body: "",
      userId: "",
    });
    console.log(result);
  };
  return (
    <div>
      {postStore.loading ? (
        <LinearProgress />
      ) : (
        <>
          <form className="w-full max-w-sm">
            <div className="flex ">
              <div className="flex items-center border-b border-teal-500 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  placeholder="Title name"
                  aria-label="Name"
                  value={title1}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <button
                  className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                  type="button"
                  // onClick={(e) => handleEdit(title1)}
                >
                  Edit post
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
});
export default EditPost;
