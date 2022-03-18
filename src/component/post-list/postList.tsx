/* eslint-disable jsx-a11y/no-redundant-roles */
import { Component } from "react";
import PostItem from "./postItem";
import { observer } from "mobx-react";
import { PostStore } from "../../store/PostStore";
import { IPost } from "../../store/PostStore";

interface IProps {
  mainStore: PostStore;
}
interface IState {
  title: string;
  id: number;
}
@observer
class PostList extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { title: "", id: 0 };
  }
  handleDeletePost = async (id: number) => {
    await this.props.mainStore.onDelete(id);
    try {
      console.log("success");
    } catch (e) {
      console.log(e);
    }
  };
  handleEditPost = async (post: IPost) => {
    await this.props.mainStore.editPost(post);
    try {
      console.log("success");
    } catch (e) {
      console.log(e);
    }
  };
  // renderFunc = () => {
  //   return <div>ABC</div>
  // }
  render(): JSX.Element {
    const { posts } = this.props.mainStore;
    return (
      <>
        {/* {this.renderFunc()} */}
        <form className="w-full max-w-sm"></form>

        <ul role="list" className=" text-left p-2 divide-y divide-slate-200 ">
          {/* {posts.length > 1 ? (
            posts.map((post) => (
              <PostItem storePost={post} onDelete={this.handleDeletePost} />
            ))
          ) : (
            <PostItem storePost={posts} onDelete={this.handleDeletePost} />
          )} */}
          {posts.map((post) => (
            <PostItem
              storePost={post}
              onDelete={this.handleDeletePost}
              onEdit={this.handleEditPost}
            />
          ))}
        </ul>
      </>
    );
  }
}

export default PostList;
