'use server'
import { cookies } from "next/headers";
import { join } from "path";
import { parseString } from "set-cookie-parser";

const BE_HOST = process.env.BE_HOST ?? "";

export async function getThreadV2(threadId: string) {
	if(!threadId) {
		console.log("threadId is null");
		return null;
	}

	const res = await fetch(join(BE_HOST, `v2/thread/get?threadId=${threadId}`), {
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

export async function getThreadsV2(forumId: string, offset: number = 0, limit: number = 20) {
	if(!forumId) {
		console.log("forumId is null");
		return null;
	}

	const res = await fetch(join(BE_HOST, `v2/thread/get?forumId=${forumId}&offset=${offset}&limit=${limit}`), {
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

export async function getThreadsOfUserV2(userId: string, current: string | null, limit: number = 10) {
	if(!userId) {
		console.log("userId is null");
		return null;
	}

	const res = await fetch(join(BE_HOST, `v2/thread/get-user?userId=${userId}&current=${current ?? ""}&limit=${limit}`), {
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

export async function getLastestThreadV2(forumId: string) {
	if(!forumId) {
		console.log("forumId is null");
		return null;
	}

  const res = await fetch(join(BE_HOST, `v2/thread/get-lastest?forumId=${forumId}`), {
    method: "GET",
    next: {
      revalidate: 0 // no cache, should be updated every time
    }
  });
  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}

export async function postThreadV2(body: any) {
	const res = await fetch(join(BE_HOST, "v2/thread/create"), {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
		credentials: "include"
	});
	return res;
}

export async function editThreadV2(body: any) {
	const res = await fetch(join(BE_HOST, "v2/thread/update"), {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
		credentials: "include"
	});
	return res;
}

// not public
export async function ReplyThreadV2(threadId: string, userId: string, content: string | undefined, attachments: string[]) {
	if(!userId) {
		console.log("User not found");
		return;
	}

	const res = await fetch(join(BE_HOST, "v2/thread/reply"), {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Cookie': cookies().toString()
		},
		body: JSON.stringify({
			threadId,
			userId,
			content,
			attachments
		}),
		credentials: "include"
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
		return {
			...result,
			type: "success"
		}
	} else {
		const result = await res.json();
		return {
			...result,
			type: "fail"
		}
	}
}