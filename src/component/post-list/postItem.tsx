import { Component } from "react";
import { Link } from "react-router-dom";
import { IPost } from "../../store/PostStore";
import { useState } from "react";
interface IProps {
  storePost: IPost;
  onDelete: (id: number) => void;
  onEdit: (post: IPost) => void;
}

class PostItem extends Component<IProps> {
  state = {
    isChecking: false,
    title: this.props.storePost.title,
  };
  deleteItem = (id: number) => {
    id && this.props.onDelete(id);
  };
  editItem = (post: IPost) => {
    post.title && this.props.onEdit(post);
  };
  checkHandle = () => {
    this.setState({ isChecking: !this.state.isChecking });
    console.log(this.state.isChecking);
  };
  render() {
    return (
      <>
        {!this.state.isChecking ? (
          <li key={this.props.storePost.id} style={{ display: "flex" }}>
            {this.props.storePost.id}. {this.props.storePost.title}
            <div style={{ marginLeft: "10px" }}>
              <button
                style={{ color: "#1d4ed8" }}
                type="button"
                onClick={() => {
                  this.setState({ isChecking: !this.state.isChecking });
                }}
              >
                {/* <Link to={`/editpost/${this.props.storePost.id}`}>Edit</Link> */}
                Edit
              </button>
              /
              <button
                onClick={() => this.deleteItem(this.props.storePost.id)}
                style={{ color: "#dc2626" }}
                type="button"
              >
                Delete
              </button>
            </div>
          </li>
        ) : (
          <li key={this.props.storePost.id} style={{ alignItems: "top" }}>
            {this.props.storePost.id}.
            <div style={{ display: "flex" }}>
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Title name"
                aria-label="Name"
                value={this.state.title}
                onChange={(e) => {
                  this.setState({ title: e.target.value });
                }}
              />
              <div style={{ marginLeft: "10px", display: "flex" }}>
                <button
                  style={{ color: "#1d4ed8" }}
                  type="button"
                  onClick={() => {
                    this.setState({ isChecking: !this.state.isChecking });
                    this.props.storePost.title = this.state.title;
                    this.editItem(this.props.storePost);
                  }}
                >
                  {/* <Link to={`/editpost/${this.props.storePost.id}`}>Edit</Link> */}
                  Save
                </button>
                /
                <button
                  onClick={() => this.deleteItem(this.props.storePost.id)}
                  style={{ color: "#dc2626" }}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        )}
      </>
    );
  }
}

export default PostItem;
