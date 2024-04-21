'use server'
import { cookies } from "next/headers";
import { join } from "path";
import { parseString } from "set-cookie-parser";

const BE_HOST = process.env.BE_HOST ?? "";

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
	}
	);
	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}

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
export async function likeMessageV2(messageId: string, userId: string, type: string = "like") {
	if(!userId) {
		console.log("User not found");
		return;
	}

	const res = await fetch(join(BE_HOST, `v2/message/add-reaction?messageId=${messageId}&type=${type}`), {
		method: "GET",
		headers: {
			'Cookie': cookies().toString()
		}
	});

	if(res.ok) {
		res.headers.getSetCookie().forEach(setCookieString => {
			const setCookie = parseString(setCookieString);
			cookies().set(setCookie.name, setCookie.value, {
				path: setCookie.path,
				secure: setCookie.secure,
				httpOnly: setCookie.httpOnly
			});
		});
		const result = await res.json();
		return result.item;
	} else {
		return null;
	}
}

// not public
export async function unlikeMessageV2(messageId: string, userId: string) {
	if(!userId) {
		console.log("User not found");
		return;
	}

	const res = await fetch(join(BE_HOST, `v2/message/remove-reaction?messageId=${messageId}`), {
		method: "GET",
		headers: {
			'Cookie': cookies().toString()
		}
	});

	if(res.ok) {
		res.headers.getSetCookie().forEach(setCookieString => {
			const setCookie = parseString(setCookieString);
			cookies().set(setCookie.name, setCookie.value, {
				path: setCookie.path,
				secure: setCookie.secure,
				httpOnly: setCookie.httpOnly
			});
		});
		const result = await res.json();
		return result.item;
	} else {
		return null;
	}
}