// custom get request to backend
export async function GetFetch(api:string, user: {token: string, username: string, email: string, role: string} | null) {
	return fetch(
		"https://localhost:3001/" + api,
		{
			method: "GET",
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