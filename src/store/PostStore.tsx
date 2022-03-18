import { createContext, useContext } from "react";
import {
  observable,
  action,
  makeObservable,
  runInAction,
  computed,
} from "mobx";
import axios from "axios";

export interface IPost {
  title?: string;
  id: number;
  body?: string;
  userId: string;
}

export class PostStore {
  @observable title = "Test List";
  @observable posts: IPost[] = [];

  @observable loading: boolean = false;
  constructor() {
    makeObservable(this);
  }
  @action
  getList = async () => {
    this.loading = true;

    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);

    runInAction(() => {
      res && (this.posts = res.data);
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
    return this.posts;
  };
  @action
  getListById = async (id: string | undefined) => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    runInAction(() => {
      res && (this.posts = res.data);
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
    return res.data;
  };
  @action
  postList = async (tit?: string) => {
    this.loading = true;
    const res = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
      title: tit,
    });
    runInAction(() => {
      this.posts.push(res.data);
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });

    return this.posts;
  };
  @action
  editPost = async (pos: IPost) => {
    this.loading = true;
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${pos.id}`,
      {
        post: pos,
      }
    );
    runInAction(() => {
      this.posts = this.posts.map((post) => (post.id === pos.id ? pos : post));
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
    console.log(this.posts);
    return this.posts;
  };
  getIn = () => {
    console.log("get in");
  };
  @action
  onDelete = async (id: number) => {
    this.loading = true;

    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    runInAction(() => {
      this.posts = this.posts.filter((post) => post.id !== Number(id));
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
    return this.posts;
  };
}

export const rootStore = {
  postStore: new PostStore(),
};

export type TRootStore = typeof rootStore;
const RootStoreContext = createContext<null | TRootStore>(null);

export const Provider = RootStoreContext.Provider;

export function useStore() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
