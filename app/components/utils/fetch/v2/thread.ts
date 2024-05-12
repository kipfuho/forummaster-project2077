'use server'
import { ThreadDocument } from "@/app/page";
import { nonPublicRequest, publicRequest } from "./common";
import { redirect } from "next/navigation";

// public
export async function getThreadV2(
	threadId: string
): Promise<ThreadDocument | null> {
	if(!threadId) {
		console.log("threadId is null");
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/thread/get?threadId=${threadId}`
	});
}

// public
export async function getThreadsV2(
	forumId: string,
	offset: number = 0,
	limit: number = 20
): Promise<ThreadDocument[] | null> {
	if(!forumId) {
		console.log("forumId is null");
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/thread/get?forumId=${forumId}&offset=${offset}&limit=${limit}`
	});
}

// public
export async function getThreadsOfUserV2(
	userId: string,
	current: string | null,
	limit: number = 10
): Promise<ThreadDocument[] | null> {
	if(!userId) {
		console.log("userId is null");
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/thread/get-user?userId=${userId}&current=${current ?? ""}&limit=${limit}`
	});
}

// public
export async function getLastestThreadV2(
	forumId: string
): Promise<ThreadDocument | null> {
	if(!forumId) {
		console.log("forumId is null");
		return null;
	}

  return await publicRequest({
		method: 'GET',
		endpoint: `v2/thread/get-lastest?forumId=${forumId}`
	})
}

// public
export async function postThreadV2(formData: FormData) {
	return await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/thread/create",
		body: {
			forumId: formData.get('forumId'),
			userId: formData.get('userId'),
			prefixIds: formData.get('prefixIds'),
			threadTitle: formData.get('threadTitle'),
			tag: formData.get('tags'),
		}
	});
}

export async function redirectQuoteMessage(forumId: string, currentMesageId: string, limit: number = 20) {
	
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

	return await publicRequest({
		method: 'GET',
		endpoint: 'v2/thread/get',
		body
	}) ?? { count: 0, threads: null}
}

export async function editThreadV2(formData: FormData) {
	return await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/thread/update",
		body: {
			threadId: formData.get('threadId'),
			threadPrefixIds: String(formData.get('threadPrefixIds') ?? '').split(',').map(Number).filter((val) => {return val > 0}),
			threadTitle: formData.get('threadTitle'),
			threadContent: formData.get('threadContent'),
			tag: formData.get('tag'),
		}
	})
}

// not public
export async function ReplyThreadV2(formData: FormData) {
	const res = await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/thread/reply",
		body: {
			threadId: formData.get('threadId'),
			userId: formData.get('userId'),
			content: formData.get('content'),
			attachments: String(formData.get('attachments') ?? '').split(',').filter((val) => {return val;})
		}
	})

	return res ? {...res, type: 'success'} : {...res, type: 'fail'}
}