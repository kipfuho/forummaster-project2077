'use server'
import { ForumDocument } from "@/app/page";
import { publicRequest } from "./common";

/**
 * Get forum by its id
 * @param forumId 
 * @returns ForumDoc
 */
export async function getForumV2(
  forumId: string
): Promise<ForumDocument | null> {
  if(!forumId) {
		console.log("Forum not found");
		return null;
	}

  return await publicRequest({
    method: 'GET',
    endpoint: `v2/forum/get?forumId=${forumId}`,
    revaliate: 10
  });
}