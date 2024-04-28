'use server'
import { cookies } from "next/headers";
import { join } from "path";
import { parseString } from "set-cookie-parser";

const BE_HOST = process.env.BE_HOST ?? "";

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

	const res = await fetch(join(BE_HOST, `v2/reaction/get?userId=${userId}&messageId=${messageId}`), {
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

// public
export async function getReactionsOfMessageV2(messageId: string, current: string | null, limit: number = 3) {
	if(!messageId) {
		console.log("Message not found");
		return;
	}

	const res = await fetch(join(BE_HOST, `v2/reaction/get-many?messageId=${messageId}&current=${current ?? ""}&limit=${limit}`), {
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

// public
export async function getReactionByIdV2(reactionId: string) {
	if(!reactionId) {
		console.log("Reaction not found");
		return;
	}

	const res = await fetch(join(BE_HOST, `v2/reaction/get?reactionId=${reactionId}`), {
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