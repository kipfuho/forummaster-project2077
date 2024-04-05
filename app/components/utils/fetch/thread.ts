import { GetFetch, PostFetch } from "./custom";

// return thread and its first message
export async function GetThread(thread_id: number) {
	const response = await GetFetch(
		`thread/get-thread-head?thread_id=${thread_id}`,
		null
	);
	if(response.ok) {
		return response.json();
	} else {
		return null;
	}
}

// function to fetch threads of a forum
export async function GetThreadData(forum_id: number) {
  const response = await PostFetch("thread/get-thread-forum", {forum_id: forum_id}, null);
  if(response.ok) {
    return response.json();
  } else {
    return null;
  }
}

// function to fetch thread and its messages with a given id
export async function GetFullThread(thread_id: number) {
  const response = await PostFetch("thread/get-thread", {thread_id: thread_id}, null);
  if(response.ok) {
    return response.json();
  } else {
    return null;
  }
}

// function to fetch lastest thread of a forum
export async function GetLastestThread(forum_id: number) {
	const response = await GetFetch(
		`thread/get-thread-lastest?forum_id=${forum_id}`,
		null
	);
	if(response.ok) {
		return response.json();
	} else {
		return null;
	}
}

export async function EditThreadRequest(body: any) {
	const response = await PostFetch(
		"thread/update-thread",
		body,
		null
	);
	if(response.ok) {
		return response.json();
	} else {
		return null;
	}
}

