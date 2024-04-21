'use server'
import { join } from "path";

const BE_HOST = process.env.BE_HOST ?? "";

// public
export async function getForumV2(forumId: string) {
  if(!forumId) {
		alert("forumId is null");
		return null;
	}

  const res = await fetch(join(BE_HOST, `v2/forum/get?forumId=${forumId}`), {
    method: "GET",
		next: {
			revalidate: 10 // 10 seconds
		}
  });
  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}