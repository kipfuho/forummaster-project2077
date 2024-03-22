export default async function PostFetch(api:string, data: any, user: {token: string, username: string, email: string, role: string} | null){
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
	).then(data => data.json())
}