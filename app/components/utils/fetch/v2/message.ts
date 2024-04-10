export async function getLastestMessageV2(threadId: string) {
	const res = await fetch(`https://localhost:3001/v2/message/get-lastest?threadId=${threadId}`);
	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}