'use server'
import { cookies } from "next/headers";
import { parseString } from "set-cookie-parser";

export async function registerV2(prevState: any, formData: FormData) {
	const res = await fetch("https://localhost:3001/v2/register", {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: formData.get("email"),
			username: formData.get("username"),
			password: formData.get("password")
		}),
	});
	return res;
}

export async function loginV2(prevState: any, formData: FormData) {
	const res = await fetch("https://localhost:3001/v2/login", {
		method: "POST",
		headers: {
			'Content-Type': "application/json",
			'Cookie': cookies().toString()
		},
		body: JSON.stringify({
			username: formData.get("username"),
			password: formData.get("password")
		})
	});
	if(res.ok) {
		res.headers.getSetCookie().forEach(setCookieString => {
			const setCookie = parseString(setCookieString);
			cookies().set(setCookie.name, setCookie.value, {
				path: setCookie.path,
				secure: setCookie.secure,
				httpOnly: setCookie.httpOnly
			});
		});
		return res.json();
	} else {
		return null;
	}
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
    headers: {
			'Cookie': cookies().toString()
		},
		next: {
			revalidate: 0 // 10 seconds
		}
  });

	res.headers.getSetCookie().forEach(setCookieString => {
		const setCookie = parseString(setCookieString);
		cookies().set(setCookie.name, setCookie.value, {
			path: setCookie.path,
			secure: setCookie.secure,
			httpOnly: setCookie.httpOnly,
		});
	});

  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}

export async function getUserV2(userId: string) {
	if(!userId) {
		alert("userid is null");
		return null;
	}

  const res = await fetch(`https://localhost:3001/v2/user/get?userId=${userId}`, {
    method: "GET",
		next: {
			revalidate: 600
		}
  });

  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}

export async function postUserV2(body: any) {
  const res = await fetch(`https://localhost:3001/v2/user/get`, {
    method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
  });

  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}

export async function getFullUserV2() {
  const res = await fetch(`https://localhost:3001/v2/user/get-full`, {
    method: "GET",
		headers: {
			'Cookie': cookies().toString()
		},
		next: {
			revalidate: 0
		}
  });

	res.headers.getSetCookie().forEach(setCookieString => {
		const setCookie = parseString(setCookieString);
		cookies().set(setCookie.name, setCookie.value, {
			path: setCookie.path,
			secure: setCookie.secure,
			httpOnly: setCookie.httpOnly
		});
	});

  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}