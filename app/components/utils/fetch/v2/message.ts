export async function getMessagesV2(threadId: string, offset: number = 0, limit: number = 20) {
	if(!threadId) {
		alert("threadId is null");
		return null;
	}
	
	const res = await fetch(`https://localhost:3001/v2/message/get?threadId=${threadId}&offset=${offset}&limit=${limit}`, {
		method: "GET",
		next: {
			revalidate: 5
		}
	}
	);
	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}

export async function getLastestMessageV2(threadId: string) {
	if(!threadId) {
		alert("threadId is null");
		return null;
	}

	const res = await fetch(`https://localhost:3001/v2/message/get-lastest?threadId=${threadId}`, {
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