'use server'
import { nonPublicRequest } from "./common";

// not public
export async function createReportV2(prevState: any, formData: FormData) {
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

// not public
export async function checkReportV2(userId: string, messageId: string) {
	if(!userId || !messageId) {
		console.log("User or message not found");
		return false;
	}

	return nonPublicRequest({
		method: 'GET',
		endpoint: `v2/report/check?messageId:${messageId}&userId:${userId}`
	});
}