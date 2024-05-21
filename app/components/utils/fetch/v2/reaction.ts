'use server'
import { ReactionDocument, UserDocument } from "@/app/page";
import { publicRequest } from "./common";

/**
 * Find reaction of a user to a message
 * @param userId : user's _id
 * @param messageId : message's _id
 * @returns ReactionDoc
 */
export async function getReactionV2(
	userId: string,
	messageId: string
): Promise<ReactionDocument | null> {
	if(!userId) {
		console.log("User not found");
		return null;
	}
	if(!messageId) {
		console.log("Message not found");
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/reaction/get?userId=${userId}&messageId=${messageId}`
	});
}

/**
 * Find reactions of a message
 * @param messageId : message's _id
 * @param current : Return reactions below this
 * @param limit : Number of records will return
 * @returns ReactionDoc[]
 */
export async function getReactionsOfMessageV2(
	messageId: string,
	current: string | null,
	limit: number = 3
): Promise<Array<{
	reaction: ReactionDocument,
	user: UserDocument
}>> {
	if(!messageId) {
		console.log("Message not found");
		return [];
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/reaction/get-many?messageId=${messageId}&current=${current ?? ""}&limit=${limit}`
	}) ?? [];
}

/**
 * Find a reaction by its id
 * @param reactionId : reaction's _id
 * @returns ReactionDoc
 */
export async function getReactionByIdV2(
	reactionId: string
): Promise<ReactionDocument | null> {
	if(!reactionId) {
		console.log("Reaction not found");
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/reaction/get?reactionId=${reactionId}`
	})
}