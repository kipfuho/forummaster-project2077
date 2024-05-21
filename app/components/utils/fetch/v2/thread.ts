'use server'
import { MessageDocument, ThreadDocument, UserDocument } from "@/app/page";
import { nonPublicRequest, publicRequest } from "./common";
import { redirect } from "next/navigation";

/**
 * Find a thread by its id
 * @param threadId : thread's _id
 * @returns ThreadDoc
 */
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

/**
 * Find threads of a forum
 * @param forumId : forum's _id
 * @param offset : number of records will skip
 * @param limit : number of records will return
 * @returns ThreadDoc[]
 */
export async function getThreadsV2(
	forumId: string,
	offset: number = 0,
	limit: number = 20
): Promise<ThreadDocument[]> {
	if(!forumId) {
		console.log("forumId is null");
		return [];
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/thread/get?forumId=${forumId}&offset=${offset}&limit=${limit}`
	}) ?? [];
}

/**
 * Find threads made by a user
 * @param userId : user's _id
 * @param current : return records below this
 * @param limit : number of records will return
 * @returns ThreadDoc[]
 */
export async function getThreadsOfUserV2(
	userId: string,
	current: string | null,
	limit: number = 10
): Promise<ThreadDocument[]> {
	if(!userId) {
		console.log("userId is null");
		return [];
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/thread/get-user?userId=${userId}&current=${current ?? ""}&limit=${limit}`
	}) ?? [];
}

/**
 * Find lastest thread of a forum
 * @param forumId : forum's _id
 * @returns [ThreadDoc, MessageDoc, UserDoc]
 */
export async function getLastestThreadV2(
	forumId: string
): Promise<[ThreadDocument, MessageDocument, UserDocument] | null> {
	if(!forumId) {
		console.log("forumId is null");
		return null;
	}

  return await publicRequest({
		method: 'GET',
		endpoint: `v2/thread/get-lastest?forumId=${forumId}`
	});
}

/**
 * Create a new thread and return it
 * @param formData 
 * @returns ThreadDoc
 */
export async function postThreadV2(
	formData: FormData
): Promise<ThreadDocument | null> {
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

/**
 * Redirect user to query URL
 * @param formData : query options
 */
export async function redirectFilterV2(
	formData: FormData
) {
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

	redirect(`/forums/${forumId}?${query}`);
}

/**
 * Find threads satisfies filter options
 * @param forumId 
 * @param offset 
 * @param limit 
 * @param filterOptions 
 * @returns {Object} : { count: number, threads: ThreadDoc[]}
 */
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
	}
): Promise<{
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

/**
 * Update a thread and return it
 * @param body 
 * @returns ThreadDoc
 */
export async function editThreadV2(
	body: any
): Promise<ThreadDocument | null> {
	return await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/thread/update",
		body: body
	});
}

/**
 * Reply to a thread and return the message
 * @param body 
 * @returns {Object} : { message: string, item: MessageDoc }
 */
export async function ReplyThreadV2(
	body: {
		threadId: string,
		userId: string,
		content: string,
		attachments: string[]
	}
): Promise<{
	message: string,
	item: MessageDocument
}> {
	const res = await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/thread/reply",
		body
	})

	return res ? {...res, type: 'success'} : {...res, type: 'fail'}
}