'use server'
import { FullUserDocument, UserDocument } from "@/app/page";
import { nonPublicRequest, publicRequest } from "./common";
import { cookies } from "next/headers";

// public
export async function registerV2(
	prevState: any,
	formData: FormData
) {
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

// public
export async function loginV2(
	prevState: any,
	formData: FormData
) {
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

// not public
export async function logoutV2() {
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
 * @returns boolean
 */
export async function verifyEmailV2(query: string) {
	const res = await publicRequest({
		method: 'GET',
		endpoint: `v2/user/verify-email?${query}`
	})

	return res ? {...res, type: 'success'} : {message: 'Error', type: 'fail'}
}

/**
 * Found user belong to current session
 * @returns User of this session
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
 * @returns User
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

// public
export async function postUserV2(body: any) {
  return await publicRequest({
		method: 'POST',
		endpoint: "v2/user/get",
		body
	});
}

// not public
export async function getFullUserV2() {
  return await nonPublicRequest({
		method: 'GET',
		endpoint: "v2/user/get-full"
	});
}

// public
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

// public
export async function filterUserV2(
	username: string
) {
	return await publicRequest({
		method: 'GET',
		endpoint: `v2/user/filter?username=${username}`
	});
}

// non public
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

// non public
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

// non public
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

// not public
export async function checkFollowUserV2(
	userId: string
) {
	return await nonPublicRequest({
		method: 'GET',
		endpoint: `v2/user/check-follow?userId=${userId}`
	});
}

// not public
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

// public
export async function getUserPostAreaV2(userId: string) {
	return await publicRequest({
		method: 'GET',
		endpoint: `v2/user/get-post-stats?userId=${userId}`
	})
}