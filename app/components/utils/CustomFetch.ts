// custom get request to backend
export async function GetFetch(api:string, user: {token: string, username: string, email: string, role: string} | null) {
	return fetch(
		"https://localhost:3001/" + api,
		{
			method: "GET",
			cache: 'no-store',
			credentials: "include",
		}
	)
}

// custom post request to backend
export async function PostFetch(api:string, data: any, user: {token: string, username: string, email: string, role: string} | null) {
	return fetch(
		"https://localhost:3001/" + api,
		{
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
			},	
			body: JSON.stringify(data),
			credentials: "include",
		}
	)
}

export async function GetPublicUser(email: string) {
	const response = await PostFetch(
		"user/get-public-profile", 
		{email: email}, 
		null
	);
	if(response.ok) {
		return response.json();
	} else {
		return null;
	}
}

// send cookie to backend and get user session
export async function GetUser() {
	const response = await fetch(
		"https://localhost:3001/auth/profile",
		{
			method: "GET",
			cache: "default",
			credentials: "include",
		}
	);

	if(response.ok) {
		return response.json();
	} else {
		return null;
	}
}

// function to fetch a forum with its id
export async function getSingleForum(forum_id: number) {
  const response = await PostFetch(
    "user/get-forum",
    { forum_id: forum_id },
    null
  );

  if(response.ok) {
    return response.json();
  } else {
    return null;
  }
}

// function to fetch forums of a category
export async function GetForumData(category: string) {
  const response = await PostFetch(
    "user/get-forum-category",
    { category: category },
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
  const response = await PostFetch("user/get-thread-forum", {forum_id: forum_id}, null);
  if(response.ok) {
    return response.json();
  } else {
    return null;
  }
}

// function to fetch thread and its messages with a given id
export async function GetFullThread(thread_id: number) {
  const response = await PostFetch("user/get-thread", {thread_id: thread_id}, null);
  if(response.ok) {
    return response.json();
  } else {
    return null;
  }
}

// function to fetch lastest thread of a forum
export async function GetLastestThread(forum_id: number) {
	const response = await GetFetch(
		`user/get-thread-lastest?forum_id=${forum_id}`,
		null
	);
	if(response.ok) {
		return response.json();
	} else {
		return null;
	}
}