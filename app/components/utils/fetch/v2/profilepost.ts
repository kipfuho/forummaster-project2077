'use server'
import { ProfilePostingDocument } from "@/app/page";
import { nonPublicRequest, publicRequest } from "./common";

/**
 * Create new profile post and return it
 * @param prevState : previous form state
 * @param formData 
 * @returns {Object} : { message: string, item: ProfilePostDoc }
 */
export async function postProfilePostV2(
	prevState: any,
	formData: FormData
): Promise<{
	message: string,
	item: ProfilePostingDocument | null
}> {
	const userId = formData.get('userId'),
				userWallId = formData.get('userWallId'),
				message = formData.get('message');

	if(!userId || !userWallId) {
		return {
			message: 'User not found',
			item: null
		}
	}

	return await nonPublicRequest({
		method: 'POST',
		endpoint: 'v2/profileposting/create',
		body: {
			userId,
			userWallId,
			message
		}
	}) ?? { message: 'Error creating new profile posting', item: null }
}

/**
 * Reply to a profile post and return it
 * @param prevState 
 * @param formData 
 * @returns {Object} : { message: string, item: ProfilePostDoc }
 */
export async function replyProfilePostV2(
	prevState: any,
	formData: FormData
): Promise<{
	message: string,
	item: ProfilePostingDocument | null
}> {
	const ppId = formData.get('ppId'),
				userId = formData.get('userId'),
				message = formData.get('message');

	if(!ppId) {
		return {
			message: 'Profile posting not found',
			item: null,
		}
	}

	if(!userId) {
		return {
			message: 'User not found',
			item: null,
		}
	}

	return await nonPublicRequest({
		method: 'POST',
		endpoint: 'v2/profileposting/reply',
		body: {
			ppId,
			userId,
			message
		}
	}) ?? { message: 'Something went wrong!', item: null };
}

/**
 * Find profile posts of a user
 * @param userId : user's _id
 * @param current : return records below this
 * @param limit : number of records will return
 * @returns {Object} : { message: string, item: ProfilePostDoc[] }
 */
export async function getProfilePostV2(
	userId: string,
	current: string,
	limit: number = 5
): Promise<{
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