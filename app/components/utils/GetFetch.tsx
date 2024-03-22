export default async function GetFetch(api:string, user: {token: string, username: string, email: string, role: string} | null){
	return fetch(
		"https://localhost:3001/" + api,
		{
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:3000/'
			},
			cache: 'no-store',
			credentials: "include",
		}
	).then(data => data.json())
}