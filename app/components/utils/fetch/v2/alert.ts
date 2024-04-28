'use server'
import { cookies } from "next/headers";
import { join } from "path";
import { parseString } from "set-cookie-parser";

const BE_HOST = process.env.BE_HOST ?? "";

// public
export async function getAlertByIdV2(alertId: string) {
	if(!alertId) {
		console.log("Alert not found");
		return;
	}

	const res = await fetch(join(BE_HOST, `v2/alert/get?alertId=${alertId}`), {
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
export async function getAlertsV2(userId: string, current: string, limit: number = 5) {
	if(!userId) {
		console.log("User not found");
		return;
	}

	const res = await fetch(join(BE_HOST, `v2/alert/get?userId=${userId}&current=${current}&limit=${limit}`), {
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