'use server'
import { CategoryDocument } from "@/app/page";
import { publicRequest } from "./common";

/**
 * Get forum metadata
 * Cache for 10s
 * @returns [thread_count, message_count, member_count, last_member]
 */
export async function getMetadataV2() {
  return await publicRequest({
    method: 'GET',
    endpoint: 'v2/metadata',
    revaliate: 10
  }) ?? [-1, -1, -1, 'NOT_FOUND'];
}

/**
 * Find all categories
 * Cache for 1 day
 * @returns CategoryDoc[]
 */
export async function getAllCategoryV2(): Promise<CategoryDocument[]> {
  return await publicRequest({
    method: 'GET',
    endpoint: "v2/category/get-all",
    revaliate: 86400
  }) ?? [];
}

/**
 * Find a category with its id
 * Cache for 1 day
 * @param categoryId : cateogry's _id
 * @returns CategoryDoc
 */
export async function getCategoryV2(
  categoryId: string
): Promise<CategoryDocument | null> {
  if(!categoryId) {
		alert("categoryId is null");
		return null;
	}

  return await publicRequest({
    method: 'GET',
    endpoint: `v2/category/get?categoryId=${categoryId}`,
    revaliate: 86400
  })
}