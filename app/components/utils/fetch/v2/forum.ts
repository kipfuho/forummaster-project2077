'use server'
import { publicRequest } from "./common";

// public
export async function getForumV2(forumId: string) {
  if(!forumId) {
		alert("forumId is null");
		return null;
	}

  return await publicRequest({
    method: 'GET',
    endpoint: `v2/forum/get?forumId=${forumId}`,
    revaliate: 10
  });
}