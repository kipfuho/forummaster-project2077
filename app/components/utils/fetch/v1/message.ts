export async function getMessages(thread_id: number, offset: number = 0, limit: number = 20) {
  const res = await fetch(`https://localhost:3001/v1/message/get-message?thread_id=${thread_id}&offset=${offset}&limit=${limit}`, {
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

export async function replyThread(body: any) {
	const res = await fetch("https://localhost:3001/v1/message/create-message", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
		credentials: "include"
	});
	return res;
}