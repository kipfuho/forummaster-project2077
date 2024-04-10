export async function getThreadsV2(forumId: string, offset: number = 0, limit: number = 20) {
	const res = await fetch(`https://localhost:3001/v2/thread/get?forumId=${forumId}&offset=${offset}&limit=${limit}`, {
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

export async function getLastestThreadV2(forumId: string) {
  const res = await fetch(`https://localhost:3001/v2/thread/get-lastest?forumId=${forumId}`, {
    method: "GET",
    next: {
      revalidate: 0 // no cache, should be updated every time
    }
  });
  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}

export async function postThreadV2(body: any) {
	const res = await fetch("https://localhost:3001/v2/thread/create", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
		credentials: "include"
	});
	return res;
}