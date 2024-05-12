'use server'
import { nonPublicRequest, publicRequest } from "./common";

// not public
export async function createBookmarkV2(userId: string, messageId: string) {
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

// public
export async function checkBookmarkV2(userId: string, messageId: string) {
	if(!userId || !messageId) {
		console.log("User or Message not found");
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/bookmark/check?messageId=${messageId}&userId=${userId}`
	});
}

// not public
export async function updateBookmarkV2(prevState: any, formData: FormData) {
	return await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/bookmark/update",
		body: {
			bookmarkId: formData.get('bookmarkId'),
			detail: formData.get('detail')
		}
	});
}

// not public
export async function deleteBookmarkV2(bookmarkId: string) {
	if(!bookmarkId) {
		console.log("Bookmark not found");
		return null;
	}

	return await nonPublicRequest({
		method: 'GET',
		endpoint: `v2/bookmark/delete?bookmarkId=${bookmarkId}`
	});
}