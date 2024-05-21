'use server'
import { AlertDocument } from "@/app/page";
import { nonPublicRequest } from "./common";

/**
 * Create new report for a message and return it
 * @param prevState 
 * @param formData 
 * @returns ReportDoc
 */
export async function createReportV2(
	prevState: any,
	formData: FormData
): Promise<AlertDocument | null> {
	return nonPublicRequest({
		method: 'POST',
		endpoint: "v2/report/create",
		body: {
			messageId: formData.get('messageId'),
			userId: formData.get('userId'),
			reason: formData.get('reason'),
			detail: formData.get('detail')
		}
	});
}

/**
 * Check if a message has been reported by a usear
 * @param userId : user's _id
 * @param messageId : message's _id
 * @returns boolean
 */
export async function checkReportV2(
	userId: string,
	messageId: string
): Promise<boolean> {
	if(!userId || !messageId) {
		console.log("User or message not found");
		return false;
	}

	return nonPublicRequest({
		method: 'GET',
		endpoint: `v2/report/check?messageId:${messageId}&userId:${userId}`
	});
}