'use server'
import { ProfilePostingDocument } from "@/app/page";
import { cookies } from "next/headers";
import { join } from "path";
import { parseString } from "set-cookie-parser";

const BE_HOST = process.env.BE_HOST ?? "";

// not public
export async function postProfilePostV2(formData: FormData) {
	const userId = formData.get('userId'), userWallId = formData.get('userWallId'), message = formData.get('message');

	if(!userId || !userWallId) {
		console.log('User not found');
		return null;
	}

	const res = await fetch(join(BE_HOST, 'v2/profileposting/create'), {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Cookie': cookies().toString()
		},
		body: JSON.stringify({
			userId,
			userWallId,
			message
		})
	})

	res.headers.getSetCookie().forEach(setCookieString => {
		const setCookie = parseString(setCookieString);
		cookies().set(setCookie.name, setCookie.value, {
			path: setCookie.path,
			secure: setCookie.secure,
			httpOnly: setCookie.httpOnly
		});
	});

	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}

// not public
export async function replyProfilePost(formData: FormData) {
	const ppId = formData.get('ppId'), userId = formData.get('userId'), message = formData.get('message');

	if(!ppId) {
		console.log('Profile posting not found');
		return null;
	}

	if(!userId) {
		console.log('User not found');
		return null;
	}

	const res = await fetch(join(BE_HOST, 'v2/profileposting/reply'), {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Cookie': cookies().toString()
		},
		body: JSON.stringify({
			ppId,
			userId,
			message
		})
	})

	res.headers.getSetCookie().forEach(setCookieString => {
		const setCookie = parseString(setCookieString);
		cookies().set(setCookie.name, setCookie.value, {
			path: setCookie.path,
			secure: setCookie.secure,
			httpOnly: setCookie.httpOnly
		});
	});

	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
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

	const res = await fetch(join(BE_HOST, `v2/profileposting/get?userWallId=${userId}&current=${current}&limit=${limit}`), {
		method: "GET",
		next: {
			revalidate: 0
		} 
	})

	if(res.ok) {
		return res.json();
	} else {
		return {
			message: 'error',
			item: []
		};
	}
}