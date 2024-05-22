'use server'
import { AlertDocument } from "@/app/page";
import { publicRequest } from "./common";

/**
 * Find an alert by id
 * @param alertId : alert's _id
 * @returns AlertDoc
 */
export async function getAlertByIdV2(
	alertId: string
): Promise<AlertDocument | null> {
	if(!alertId) {
		console.log("Alert not found");
		return null;
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/alert/get?alertId=${alertId}`
	});
}

/**
 * Find alerts of an user
 * @param userId : user's _id
 * @param current : find records below this record
 * @param limit : number of records will return
 * @returns AlertDoc[]
 */
export async function getAlertsV2(
	userId: string,
	current: string,
	limit: number = 5
): Promise<AlertDocument[]> {
	if(!userId) {
		console.log("User not found");
		return [];
	}

	return await publicRequest({
		method: 'GET',
		endpoint: `v2/alert/get?userId=${userId}&current=${current}&limit=${limit}`
	}) ?? [];
}