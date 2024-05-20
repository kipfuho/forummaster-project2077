'use server'
import { Suspense } from "react";
import Category from "./(route)/categories/components/Category";
import Loading from "./components/layout/Loading";
import { getAllCategoryV2 } from "./components/utils/fetch/v2/category";

/**
 * User class
 */
export type UserDocument = {
  _id: string;
  oldUsername: string;
  username: string;
  email: string;
  create_time: Date;
  avatar: string;
  messages: number;
  likes: number;
  class: number;
}

/**
 * User class with sensitive information
 */
export type FullUserDocument = {
  _id: string;
  oldUsername: string;
  username: string;
  email: string;
  create_time: Date;
  avatar: string;
  messages: number;
  likes: number;
  followings: string[];
  followers: string[];
  signature: string;
  class: number;
  setting: {
    date_of_birth: string;
    location: string;
    website: string;
    about: string;
    twofa: string;
  }
}

/**
 * Category class
 */
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
  privilege: {
    view: number,
    reply: number,
    upload: number,
    delete: number
  }
}

export type ThreadDocument = {
  _id: string;
  forum: string;
  user: string;
  title: string;
  tag: TagDocument[];
  prefix: PrefixDocument[];
  create_time: Date;
  update_time: Date;
  replies: number;
  views: number;
  privilege: {
    view: number,
    reply: number,
    upload: number,
    delete: number
  }
}

export type MessageDocument = {
  _id: string;
  thread: string;
  user: string;
  create_time: Date;
  update_time: Date;
  content: string;
  attachments: string[];
  reactions: {
    like: number,
    love: number,
    care: number,
    haha: number,
    wow: number,
    sad: number,
    angry: number
  };
  threadPage: Record<string, number>;
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

export type AlertDocument = {
  _id: string;
  user: string;
  detail: string;
  create_time: Date;
  read: boolean;
}

export type BookmarkDocument = {
  _id: string;
  message: string;
  thread: string;
  user: string;
  detail: string;
  create_time: Date;
}

export type PrefixDocument = {
  _id: string;
  id: number;
  name: string;
  color: string;
}

export type ProfilePostingDocument = {
  _id: string;
  user: string;
  user_wall: string;
  message: string;
  replies: Array<{
    user: string,
    message: string,
    create_time: Date
  }>;
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
