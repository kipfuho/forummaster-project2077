'use server'
import { MessageDocument, ReactionDocument, ThreadDocument, UserDocument } from "@/app/page";
import { nonPublicRequest, publicRequest } from "./common";

/**
 * Find a message with its _id
 * @param messageId : message's _id
 * @returns MessageDocument
 */
export async function getMessageV2(
	messageId: string
): Promise<MessageDocument | null> {
	if(!messageId) {
		console.log("Message not found");
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/message/get?messageId=${messageId}`
	});
}

/**
 * Find messages of a thread
 * @param threadId : thread's _id
 * @param offset : number of records will skip
 * @param limit : number of records will return
 * @returns MessageDocument[]
 */
export async function getMessagesV2(
	threadId: string,
	offset: number = 0,
	limit: number = 20
): Promise<MessageDocument[]> {
	if(!threadId) {
		console.log("threadId is null");
		return [];
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/message/get?threadId=${threadId}&offset=${offset}&limit=${limit}`,
		revaliate: 5
	}) ?? [];
}

/**
 * Find lastest message of a thread
 * @param threadId : thread's _id
 * @returns [MessageDoc, UserDoc] | null
 */
export async function getLastestMessageV2(
	threadId: string
): Promise<[MessageDocument, UserDocument] | null> {
	if(!threadId) {
		console.log("threadId is null");
		return null;
	}
	
	return await publicRequest({
		method: 'GET',
		endpoint: `v2/message/get-lastest?threadId=${threadId}`
	});
}

/**
 * React a message
 * @param messageId : message's _id
 * @param userId : user's _id
 * @param type : reaction type
 * @returns JSON( message-string, item-JSON(message-MessageDoc, reaction-ReactionDoc) )
 */
export async function reactMessageV2(
	messageId: string,
	userId: string,
	type: string = "like"
): Promise<{message: string, item: { message: MessageDocument, reaction: ReactionDocument}} | null> {
	if(!userId) {
		console.log("User not found");
		return null;
	}

	return await nonPublicRequest({
		method: 'GET',
		endpoint: `v2/message/react?messageId=${messageId}&type=${type}`
	})
}

/**
 * Update a message
 * @param messageId : message's _id
 * @param content : message's content
 * @returns updated message
 */
export async function updateMessageV2(
	messageId: string,
	content: string
): Promise<MessageDocument> {
	return await nonPublicRequest({
		method: 'POST',
		endpoint: 'v2/message/update-message',
		body: {
			messageId,
			content
		}
	})
}