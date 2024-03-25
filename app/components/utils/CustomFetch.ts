// custom get request to backend
export async function GetFetch(api:string, user: {token: string, username: string, email: string, role: string} | null){
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
export async function PostFetch(api:string, data: any, user: {token: string, username: string, email: string, role: string} | null){
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

// send cookie to backend and get user session
export async function GetUser(){
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

// function to fetch forums of a category
export async function getForumData(category: string) {
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
export async function getThreadData(forum_id: number) {
  const response = await PostFetch("user/get-thread-forum", {forum_id: forum_id}, null);
  if(response.ok) {
    return response.json();
  } else {
    return null;
  }
}