'use server'
import { ProfilePostingDocument } from "@/app/page";
import { nonPublicRequest, publicRequest } from "./common";

// not public
export async function postProfilePostV2(formData: FormData) {
	const userId = formData.get('userId'), userWallId = formData.get('userWallId'), message = formData.get('message');

	if(!userId || !userWallId) {
		console.log('User not found');
		return null;
	}

	return await nonPublicRequest({
		method: 'POST',
		endpoint: 'v2/profileposting/create',
		body: {
			userId,
			userWallId,
			message
		}
	})
}

// not public
export async function replyProfilePostV2(formData: FormData) {
	const ppId = formData.get('ppId'), userId = formData.get('userId'), message = formData.get('message');

	if(!ppId) {
		console.log('Profile posting not found');
		return null;
	}

	if(!userId) {
		console.log('User not found');
		return null;
	}

	return await nonPublicRequest({
		method: 'POST',
		endpoint: 'v2/profileposting/reply',
		body: {
			ppId,
			userId,
			message
		}
	});
}

// public
export async function getProfilePostV2(userId: string, current: string, limit: number = 5): Promise<{
	message: string,
	item: ProfilePostingDocument[]
}> {
	if(!userId) {
		console.log('User not found');
		return {
			message: 'error',
			item: []
		};
	}

	return publicRequest({
		method: 'GET',
		endpoint: `v2/profileposting/get?userWallId=${userId}&current=${current}&limit=${limit}`
	}) ?? {message: 'error', item: []}
}