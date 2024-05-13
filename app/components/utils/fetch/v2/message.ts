'use server'
import { nonPublicRequest, publicRequest } from "./common";

// public
export async function getMessageV2(messageId: string) {
	if(!messageId) {
		console.log("Message not found");
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/message/get?messageId=${messageId}`
	});
}

// public
export async function getMessagesV2(threadId: string, offset: number = 0, limit: number = 20) {
	if(!threadId) {
		console.log("threadId is null");
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/message/get?threadId=${threadId}&offset=${offset}&limit=${limit}`,
		revaliate: 5
	});
}

// public
export async function getLastestMessageV2(threadId: string) {
	if(!threadId) {
		console.log("threadId is null");
		return null;
	}
	
	return await publicRequest({
		method: 'GET',
		endpoint: `v2/message/get-lastest?threadId=${threadId}`
	});
}

// not public
export async function reactMessageV2(messageId: string, userId: string, type: string = "like") {
	if(!userId) {
		console.log("User not found");
		return;
	}

	return await nonPublicRequest({
		method: 'GET',
		endpoint: `v2/message/react?messageId=${messageId}&type=${type}`
	})
}

// not public
export async function updateMessageV2(
	messageId: string,
	content: string
) {
	return await nonPublicRequest({
		method: 'POST',
		endpoint: 'v2/message/update-message',
		body: {
			messageId,
			content
		}
	});
}