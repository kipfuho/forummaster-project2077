'use server'
import { cookies } from "next/headers";
import { join } from "path";
import { parseString } from "set-cookie-parser";

const BE_HOST = process.env.BE_HOST ?? "";

// not public
export async function createBookmarkV2(userId: string, messageId: string) {
	if(!userId || !messageId) {
		console.log("User or message not found");
		return null;
	}

	const res = await fetch(join(BE_HOST, "v2/bookmark/create"), {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Cookie': cookies().toString()
		},
		body: JSON.stringify({
			userId,
			messageId,
			detail: ""
		})
	});

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
export async function checkBookmarkV2(userId: string, messageId: string) {
	if(!userId || !messageId) {
		console.log("User or Message not found");
		return null;
	}
	
	const res = await fetch(join(BE_HOST, `v2/bookmark/check?messageId=${messageId}&userId=${userId}`), {
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
export async function updateBookmarkV2(prevState: any, formData: FormData) {
	const res = await fetch(join(BE_HOST, "v2/bookmark/update"), {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Cookie': cookies().toString()
		},
		body: JSON.stringify({
			bookmarkId: formData.get('bookmarkId'),
			detail: formData.get('detail')
		})
	});

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
export async function deleteBookmarkV2(bookmarkId: string) {
	if(!bookmarkId) {
		console.log("Bookmark not found");
		return null;
	}

	const res = await fetch(join(BE_HOST, `v2/bookmark/delete?bookmarkId=${bookmarkId}`), {
		method: "GET",
		headers: {
			'Cookie': cookies().toString()
		}
	});

	res.headers.getSetCookie().forEach(setCookieString => {
		const setCookie = parseString(setCookieString);
		cookies().set(setCookie.name, setCookie.value, {
			path: setCookie.path,
			secure: setCookie.secure,
			httpOnly: setCookie.httpOnly
		});
	});

	if(res.ok) {
		return true;
	} else {
		return false;
	}
}