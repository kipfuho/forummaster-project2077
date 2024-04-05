import { PostFetch } from "./custom";

// function to fetch a forum with its id
export async function GetSingleForum(forum_id: number) {
  const response = await PostFetch(
    "forum/get-forum",
    { forum_id: forum_id },
    null
  );

  if(response.ok) {
    return response.json();
  } else {
    return null;
  }
}

// function to fetch forums of a category
export async function GetForumData(category: string) {
  const response = await PostFetch(
    "forum/get-forum-category",
    { category: category },
    null
  );

  if(response.ok) {
    return response.json();
  } else {
    return null;
  }
}