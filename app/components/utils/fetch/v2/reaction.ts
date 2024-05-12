'use server'
import { publicRequest } from "./common";

// public
export async function getReactionV2(userId: string, messageId: string) {
	if(!userId) {
		console.log("User not found");
		return;
	}
	if(!messageId) {
		console.log("Message not found");
		return;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/reaction/get?userId=${userId}&messageId=${messageId}`
	});
}

// public
export async function getReactionsOfMessageV2(messageId: string, current: string | null, limit: number = 3) {
	if(!messageId) {
		console.log("Message not found");
		return;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/reaction/get-many?messageId=${messageId}&current=${current ?? ""}&limit=${limit}`
	});
}

// public
export async function getReactionByIdV2(reactionId: string) {
	if(!reactionId) {
		console.log("Reaction not found");
		return;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/reaction/get?reactionId=${reactionId}`
	})
}