'use server'
import { Suspense } from "react";
import Category from "./(route)/categories/components/Category";
import Loading from "./components/layout/Loading";
import { getAllCategoryV2 } from "./components/utils/fetch/v2/category";

export type UserDocument = {
  _id: string;
  username: string;
  email: string;
  create_time: Date;
  avatar: string;
  messages: number;
  likes: number;
  class: number;
}

export type FullUserDocument = {
  _id: string;
  username: string;
  email: string;
  create_time: Date;
  avatar: string;
  messages: number;
  likes: number;
  class: number;
  setting: {
    date_of_birth: string;
    location: string;
    website: string;
    about: string;
    twofa: string;
  }
}

export type CategoryDocument = {
  _id: string;
  name: string;
  title: string;
  about: string;
  forums: string[];
}

export type ForumDocument = {
  _id: string;
  name: string;
  about: string;
  threads: number;
  messages: number;
  delete: boolean;
  privilege: number;
}

export type ThreadDocument = {
  _id: string;
  forum: string;
  user: string;
  title: string;
  tag: TagDocument[];
  create_time: Date;
  update_time: Date;
  replies: number;
  views: number;
  delete: boolean;
  privilege: number;
}

export type MessageDocument = {
  _id: string;
  thread: string;
  user: string;
  create_time: Date;
  update_time: Date;
  content: string;
  reactions: {
    like: string[],
    love: string[],
    care: string[],
    haha: string[],
    wow: string[],
    sad: string[],
    angry: string[]
  };
  delete: boolean;
}

export type TagDocument = {
  _id: string;
  name: string;
  color: string;
}

export type ReactionDocument = {
  _id: string;
  message: string;
  user: string;
  type: string;
  create_time: Date;
}

// Home page
export default async function Home() {
  const categories: CategoryDocument[] = await getAllCategoryV2()
  if(categories) {
    return (
      <Suspense fallback={<Loading/>}>
        <div className="space-y-5">
          <input
            className="rounded bg-gray-500 w-full p-2 focus:outline-none focus:brightness-[110%]"
            placeholder="Quick search..."
          />
          {categories.map((category, index) => (
            <Category category={category} key={index}/>
          ))}
        </div>
      </Suspense>
    );
  } else {
    return (
      "Error, categories = null"
    )
  }
}
