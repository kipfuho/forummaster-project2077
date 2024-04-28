export async function getThread(id: number) {
  const res = await fetch(`https://localhost:3001/v1/thread/get-thread?thread_id=${id}`, {
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

export async function getThreadAndMessage(thread_id: number) {
	const res = await fetch(`https://localhost:3001/v1/thread/get-thread-head?thread_id=${thread_id}`, {
		method: "GET",
	});
	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}

export async function getThreads(id: number, offset: number = 0, limit: number = 20) {
	const res = await fetch(`https://localhost:3001/v1/thread/get-thread-forum?forum_id=${id}&offset=${offset}&limit=${limit}`, {
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

export async function getLastestMessage(thread_id: number) {
	const res = await fetch(`https://localhost:3001/v1/message/get-message-lastest?thread_id=${thread_id}`);
	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}

export async function postThread(body: any) {
	const res = await fetch("https://localhost:3001/v1/thread/create-thread", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
		credentials: "include"
	});
	return res;
}

export async function editThread(body: any) {
	const res = await fetch("https://localhost:3001/v1/thread/update-thread", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
		credentials: "include"
	});
	return res;
}