'use server'
import { cookies } from "next/headers";
import { join } from "path";
import { parseString } from "set-cookie-parser";

const BE_HOST = process.env.BE_HOST ?? "";

// public
export async function getMessageV2(messageId: string) {
	if(!messageId) {
		console.log("Message not found");
		return null;
	}

	const res = await fetch(join(BE_HOST, `v2/message/get?messageId=${messageId}`), {
		method: "GET",
		next: {
			revalidate: 0
		}
	});

	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}

// public
export async function getMessagesV2(threadId: string, offset: number = 0, limit: number = 20) {
	if(!threadId) {
		console.log("threadId is null");
		return null;
	}
	
	const res = await fetch(join(BE_HOST, `v2/message/get?threadId=${threadId}&offset=${offset}&limit=${limit}`), {
		method: "GET",
		next: {
			revalidate: 5
		}
	});

	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}

// public
export async function getLastestMessageV2(threadId: string) {
	if(!threadId) {
		console.log("threadId is null");
		return null;
	}

	const res = await fetch(join(BE_HOST, `v2/message/get-lastest?threadId=${threadId}`), {
		method: "GET",
		next: {
			revalidate: 0
		}
	});
	
	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}

// not public
export async function reactMessageV2(messageId: string, userId: string, type: string = "like") {
	if(!userId) {
		console.log("User not found");
		return;
	}

	const res = await fetch(join(BE_HOST, `v2/message/react?messageId=${messageId}&type=${type}`), {
		method: "GET",
		headers: {
			'Cookie': cookies().toString()
		}
	});

	// Change jwt and refreshToken if it's embedded
	res.headers.getSetCookie().forEach(setCookieString => {
		const setCookie = parseString(setCookieString);
		cookies().set(setCookie.name, setCookie.value, {
			path: setCookie.path,
			secure: setCookie.secure,
			httpOnly: setCookie.httpOnly
		});
	});

	if(res.ok) {
		const result = await res.json();
		return result.item;
	} else {
		return null;
	}
}