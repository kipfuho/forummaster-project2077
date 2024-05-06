'use server'
import { ThreadDocument } from "@/app/page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

export async function redirectFilterV2(formData: FormData) {
	const forumId = formData.get('forumId');
	const prefix = formData.get('prefix');
	const author = formData.get('author');
	const last_update = formData.get('last_update');
	const sort_type = formData.get('sort_type');
	const descending = formData.get('descending');
	const query = [
		prefix && `prefixId=${prefix}`,
		author && `authorUsername=${author}`,
		last_update !== '0' && `last_update=${last_update}`,
		`sort_type=${sort_type}`,
		descending === '0' && `ascending=1`
	].filter((item) => {return item}).join('&');
	console.log(query);

	redirect(`/forums/${forumId}?${query}`)
}

export async function filterThreadV2(
	forumId: string, 
	offset: number, 
	limit: number, 
	filterOptions: {
		prefix?: string[], 
		author?: string, 
		last_update?: number, 
		sort_type: string, 
		descending: boolean
	}): Promise<{
		count: number,
		threads: ThreadDocument[]
	}> {
	const body: any = {
		forumId,
		offset,
		limit,
		filterOptions: {
			sort_type: filterOptions.sort_type,
			descending: filterOptions.descending
		}
	};
	if(filterOptions.prefix) {
		body.filterOptions.prefix = filterOptions.prefix;
	}
	if(filterOptions.author) {
		body.filterOptions.author = filterOptions.author;
	}
	if(filterOptions.last_update) {
		body.filterOptions.last_update_within = new Date(new Date().getTime() - filterOptions.last_update);
	}

	const res = await fetch(join(BE_HOST, 'v2/thread/get'), {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
		next: {
			revalidate: 0
		}
	});

	if(res.ok) {
		return res.json();
	} else {
		return {
			count: 0,
			threads: []
		};
	}
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