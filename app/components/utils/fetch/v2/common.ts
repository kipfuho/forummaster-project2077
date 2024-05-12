// this fine define some common used functions
'use server'
import { cookies } from "next/headers";
import { join } from "path";
import { parseString } from "set-cookie-parser";

const BE_HOST = process.env.BE_HOST ?? "";

// public
// meaning we won't need to send cookie for this type of request
export async function publicRequest(options: {
	method: 'GET' | 'POST',
	endpoint: string,
	body?: any,
	revaliate?: number
}) {
	let res;
	if(options.method === 'GET') {
		res = await fetch(join(BE_HOST, options.endpoint), {
			method: 'GET',
			next: {
				revalidate: options.revaliate ?? 0
			}
		});
	} else {
		res = await fetch(join(BE_HOST, options.endpoint), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(options.body)
		});
	}

	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}

// non public
// meaning we need to send cookie for this type of request
export async function nonPublicRequest(options: {
	method: 'GET' | 'POST',
	endpoint: string,
	body?: any,
	revaliate?: number
}) {
	let res;
	if(options.method === 'GET') {
		res = await fetch(join(BE_HOST, options.endpoint), {
			method: 'GET',
			headers: {
				'Cookie': cookies().toString()
			},
			next: {
				revalidate: options.revaliate ?? 0
			}
		});
	} else {
		res = await fetch(join(BE_HOST, options.endpoint), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Cookie': cookies().toString()
			},
			body: JSON.stringify(options.body)
		});
	}

	// set cookies if there's some attached on response
	// needed since we need tokens to maintain user session
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