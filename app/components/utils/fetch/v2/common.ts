// this fine define some common used functions
'use server'
import { cookies } from "next/headers";
import { join } from "path";
import { parseString } from "set-cookie-parser";

const BE_HOST = process.env.BE_HOST ?? "";

/**
 * Made a public request to endpoint of backend server
 * Public mean no cookies sent or received
 * @param options : JSON
 * @param options.method : 'GET' or 'POST'
 * @param options.endpoint : API's endpoint
 * @param options.body : body for 'POST' request
 * @param options.revaliate : cache's revalidate time
 * @returns data
 */
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

/**
 * Made a non-public request to endpoint of backend server
 * Non-public mean cookies sent and received
 * @param options : JSON
 * @param options.method : 'GET' or 'POST'
 * @param options.endpoint : API's endpoint
 * @param options.body : body for 'POST' request
 * @param options.revaliate : cache's revalidate time
 * @returns data
 */
export async function nonPublicRequest(options: {
	method: 'GET' | 'POST',
	endpoint: string,
	body?: any,
	revaliate?: number,
	form?: boolean
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
	} else if(options.form) {
		res = await fetch(join(BE_HOST, options.endpoint), {
			method: 'POST',
			headers: {
				'Cookie': cookies().toString()
			},
			body: options.body
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