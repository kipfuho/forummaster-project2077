export async function registerV2(body: any) {
	const res = await fetch("https://localhost:3001/v2/register", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
	});
	return res;
}

export async function loginV2(body: any) {
	const res = await fetch("https://localhost:3001/v2/login", {
		method: "POST",
		headers: {
			'Content-Type': "application/json"
		},
		body: JSON.stringify(body),
		credentials: "include"
	});
	return res;
}

export async function logoutV2() {
	const res = await fetch("https://localhost:3001/v2/logout", {
		method: "GET",
		credentials: "include"
	});
	return res;
}

export async function getCurrentUserV2() {
  const res = await fetch(`https://localhost:3001/v2/user/get-current`, {
    method: "GET",
    credentials: "include",
		next: {
			revalidate: 10 // 10 seconds
		}
  });

  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}

export async function getUserV2(userId: string) {
  const res = await fetch(`https://localhost:3001/v2/user/get?userId=${userId}`, {
    method: "GET",
		next: {
			revalidate: 600 // 10 minutes
		}
  });

  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}

export async function getFullUserV2(user_id: string) {
  const res = await fetch(`https://localhost:3001/v2/user/get-public-profile?id=${user_id}`, {
    method: "GET"
  });

  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}