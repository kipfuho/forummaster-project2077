'use server'
import { publicRequest } from "./common";

// public
export async function getAlertByIdV2(alertId: string) {
	if(!alertId) {
		console.log("Alert not found");
		return;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/alert/get?alertId=${alertId}`
	});
}

// public
export async function getAlertsV2(userId: string, current: string, limit: number = 5) {
	if(!userId) {
		console.log("User not found");
		return;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/alert/get?userId=${userId}&current=${current}&limit=${limit}`
	});
}