import { PostFetch } from "./custom";

export async function EditMessageRequest(body: any) {
	const response = await PostFetch(
		"message/update-message",
		body,
		null
	);
	if(response.ok) {
		return response.json();
	} else {
		console.log("update message failed");
		return null;
	}
}