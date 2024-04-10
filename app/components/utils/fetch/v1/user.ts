export async function register(body: any) {
	const res = await fetch("https://localhost:3001/v1/register", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
	});
	return res;
}

export async function login(body: any) {
	const res = await fetch("https://localhost:3001/v1/login", {
		method: "POST",
		headers: {
			'Content-Type': "application/json"
		},
		body: JSON.stringify(body),
		credentials: "include"
	});
	return res;
}

export async function getUser() {
	const res = await fetch("https://localhost:3001/v1/user/profile", {
		method: "GET",
		credentials: "include"
	});
	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}

export async function getUserProfile() {
	const res = await fetch("https://localhost:3001/v1/user/get-user", {
		method: "GET",
		credentials: "include",
		next: {
			revalidate: 1
		}
	});
	if(res.ok) {
		return res.json();
	} else {
		return null;
	}
}

export async function getUserPublic(user_id: number) {
  const res = await fetch(`https://localhost:3001/v1/user/get-public-profile?id=${user_id}`, {
    method: "GET"
  });

  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}