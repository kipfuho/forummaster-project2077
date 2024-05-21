'use server'
import { BookmarkDocument } from "@/app/page";
import { nonPublicRequest, publicRequest } from "./common";

/**
 * Create a new bookmark
 * @param userId : user's _id
 * @param messageId : message's _id
 * @returns Newly created bookmark
 */
export async function createBookmarkV2(
	userId: string,
	messageId: string
): Promise<BookmarkDocument | null> {
	if(!userId || !messageId) {
		console.log("User or message not found");
		return null;
	}

	return await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/bookmark/create",
		body: {
			userId,
			messageId,
			detail: ""
		}
	});
}

/**
 * Get bookmarks of a user
 * @param limit : number of records return
 * @param current : find records below this record
 * @returns Array of bookmarks
 */
export async function getBookmarkV2(
	limit: number,
	current: string | undefined
): Promise<Array<BookmarkDocument>> {	
	return await nonPublicRequest({
		method: 'GET',
		endpoint: `v2/bookmark/get?limit=${limit ?? 20}&current=${current ?? ''}`,
	}) ?? [];
}

/**
 * Check if a user has bookmarked a message
 * @param userId : user's _id
 * @param messageId : message's _id
 * @returns Found bookmark
 */
export async function checkBookmarkV2(
	userId: string,
	messageId: string
): Promise<BookmarkDocument | null> {
	if(!userId || !messageId) {
		console.log("User or Message not found");
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/bookmark/check?messageId=${messageId}&userId=${userId}`
	});
}

/**
 * Update a bookmark
 * @param prevState : previous state of Form
 * @param formData : current form's data
 * @returns Updated bookmark
 */
export async function updateBookmarkV2(
	prevState: any,
	formData: FormData
): Promise<BookmarkDocument | null> {
	return await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/bookmark/update",
		body: {
			bookmarkId: formData.get('bookmarkId'),
			detail: formData.get('detail')
		}
	});
}

/**
 * Delete a bookmark
 * @param bookmarkId : Bookmark to be deleted 
 * @returns boolean
 */
export async function deleteBookmarkV2(
	bookmarkId: string
): Promise<BookmarkDocument | null> {
	if(!bookmarkId) {
		console.log("Bookmark not found");
		return null;
	}

	return await nonPublicRequest({
		method: 'GET',
		endpoint: `v2/bookmark/delete?bookmarkId=${bookmarkId}`
	});
}