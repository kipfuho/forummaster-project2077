'use server'
import { ForumDocument, FullUserDocument, UserDocument } from "@/app/page";
import { nonPublicRequest, publicRequest } from "./common";
import { cookies } from "next/headers";

/**
 * Register a new account
 * @param prevState 
 * @param formData 
 * @returns {Object} : { message: string, type: 'success' | 'fail' }
 */
export async function registerV2(
	prevState: any,
	formData: FormData
): Promise<{
	message: string,
	type: any
}> {
	let email = formData.get("email"), 
			username = formData.get("username"), 
			password = formData.get("password"), 
			retypePassword = formData.get("retypePassword");

	if(password !== retypePassword) {
		return { 
			message: "Passwords not match",
			type: "fail"
		};
	}

	const res = await publicRequest({
		method: 'POST',
		endpoint: "v2/register",
		body: {
			email,
			username,
			password
		}
	});

	return res ? {...res, type: 'success'} : {message: 'Error', type: 'fail'}
}

/**
 * Login user
 * @param prevState 
 * @param formData 
 * @returns {Object} : { message: string, user: UserDoc, type: string}
 */
export async function loginV2(
	prevState: any,
	formData: FormData
): Promise<{
	message: string,
	type: string,
	user: UserDocument
}> {
	const res = await nonPublicRequest({
		method: 'POST',
		endpoint: 'v2/login',
		body: {
			username: formData.get("username"),
			password: formData.get("password")
		}
	})

	return res ? {...res, type: 'success'} : {message: 'Error', type: 'fail'}
}

/**
 * Logout a user
 * @returns boolean
 */
export async function logoutV2(): Promise<boolean> {
	const res = await nonPublicRequest({
		method: 'GET',
		endpoint: 'v2/logout'
	})
	
	if(res) {
		cookies().delete("jwt");
		cookies().delete("refresh_token");
		cookies().delete("connect.sid");
		return true;
	} else {
		return false;
	}
}

/**
 * Verify email for a user
 * @param query : query string
 * @returns {Object} : { message: string, type: 'success' | 'fail' }
 */
export async function verifyEmailV2(
	query: string
): Promise<{
	message: string,
	type: string
}> {
	const res = await publicRequest({
		method: 'GET',
		endpoint: `v2/user/verify-email?${query}`
	})

	return res ? {...res, type: 'success'} : {message: 'Something went wrong', type: 'fail'}
}

/**
 * Found user belong to current session
 * @returns UserDoc
 */
export async function getCurrentUserV2() {
  return await nonPublicRequest({
		method: 'GET',
		endpoint: "v2/user/get-current"
	});
}

/**
 * Find user with _id 'userId'
 * @param userId : user's _id to find
 * @returns UserDoc
 */
export async function getUserV2(
	userId: string
): Promise<UserDocument | null> {
	if(!userId) {
		console.log("User not found");
		return null;
	}

  return await publicRequest({
		method: 'GET',
		endpoint: `v2/user/get?userId=${userId}`,
		revaliate: 600
	});
}

/**
 * Find user with POST method
 * @param body : information
 * @returns UserDoc
 */
export async function postUserV2(
	body: any
): Promise<UserDocument | null> {
  return await publicRequest({
		method: 'POST',
		endpoint: "v2/user/get",
		body
	});
}

/**
 * Find all information exclude password of an user
 * @returns FullUserDoc
 */
export async function getFullUserV2(): Promise<FullUserDocument | null> {
  return await nonPublicRequest({
		method: 'GET',
		endpoint: "v2/user/get-full"
	});
}

/**
 * Find user's detail excluding email, password, ...
 * @param userId : user's _id
 * @returns FullUserDoc
 */
export async function getUserDetailV2(
	userId: string
): Promise<FullUserDocument | null> {
	if(!userId) {
		console.log('User not found');
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/user/get-detail?userId=${userId}`
	})
}

/**
 * Filter users start with 'username'
 * @param username : filter
 * @returns UserDoc[]
 */
export async function filterUserV2(
	username: string
): Promise<UserDocument[]> {
	return await publicRequest({
		method: 'GET',
		endpoint: `v2/user/filter?username=${username}`
	}) ?? [];
}

/**
 * Update username of user
 * @param prevState 
 * @param formData 
 * @returns boolean
 */
export async function updateUsernameV2(
	prevState: any,
	formData: FormData
) {
	return await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/user/update-username",
		body: {
			userId: formData.get("userId"),
			username: formData.get("username"),
			password: formData.get("password")
		}
	});
}

/**
 * Update email of user
 * @param prevState 
 * @param formData 
 * @returns boolean
 */
export async function updateEmailV2(
	prevState: any,
	formData: FormData
) {
	return await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/user/update-email",
		body: {
			userId: formData.get("userId"),
			email: formData.get("email"),
			password: formData.get("password")
		}
	});
}

/**
 * Update setting of user
 * @param prevState 
 * @param formData 
 * @returns boolean
 */
export async function updateSettingV2(
	prevState: any, 
	formData: FormData
) {
	let day = formData.get("dob_day"), month = formData.get("dob_month"), year = formData.get("dob_year");
	let dob;
	if(day && month && year) {
		dob = new Date(parseInt(year.toString()), parseInt(month.toString()) - 1, parseInt(day.toString()));
	}
	
	return await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/user/update",
		body: {
			userId: formData.get("userId"),
			password: formData.get("password"),
			avatar: formData.get("avatar"),
			dob,
			location: formData.get("location"),
			about: formData.get("about")
		}
	})
}

/**
 * Check if a user follow another user
 * @param userId : another user
 * @returns boolean
 */
export async function checkFollowUserV2(
	userId: string
) {
	return await nonPublicRequest({
		method: 'GET',
		endpoint: `v2/user/check-follow?userId=${userId}`
	});
}

/**
 * Follow an user
 * @param userId : user's _id to follow
 * @returns boolean
 */
export async function followUserV2(userId: string) {
	if(!userId) {
		console.log("User not found");
		return null;
	}

	return await nonPublicRequest({
		method: 'GET',
		endpoint: `v2/user/follow?userId=${userId}`
	})
}

/**
 * Statistics user posts on forum
 * @param userId 
 * @returns Array<{ count: number, forum: ForumDoc }>
 */
export async function getUserPostAreaV2(
	userId: string
): Promise<Array<{
	count: number,
	forum: ForumDocument
}>> {
	return await publicRequest({
		method: 'GET',
		endpoint: `v2/user/get-post-stats?userId=${userId}`
	}) ?? [];
}