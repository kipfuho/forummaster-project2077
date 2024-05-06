'use server'
import { cookies } from "next/headers";
import { join } from "path";
import { parseString } from "set-cookie-parser";

const BE_HOST = process.env.BE_HOST ?? "";

// not public
export async function createReportV2(prevState: any, formData: FormData) {
	const res = await fetch(join(BE_HOST, "v2/report/create"), {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Cookie': cookies().toString()
		},
		body: JSON.stringify({
			messageId: formData.get('messageId'),
			userId: formData.get('userId'),
			reason: formData.get('reason'),
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
export async function checkReportV2(userId: string, messageId: string) {
	if(!userId || !messageId) {
		console.log("User or message not found");
		return false;
	}

	const res = await fetch(join(BE_HOST, `v2/report/check?messageId:${messageId}&userId:${userId}`));

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