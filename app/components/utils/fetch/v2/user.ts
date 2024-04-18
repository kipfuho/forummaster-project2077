'use server'
import { cookies } from "next/headers";
import { parseString } from "set-cookie-parser";

// public
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

// public
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

// not public
export async function logoutV2() {
	const res = await fetch("https://localhost:3001/v2/logout", {
		method: "GET",
		credentials: "include"
	});
	return res;
}

// not public
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

// public
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

// public
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

// not public
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

export async function updateUsernameV2(prevState: any, formData: FormData) {
	const res = await fetch(`https://localhost:3001/v2/user/update-username`, {
    method: "POST",
		headers: {
			'Content-Type': "application/json",
			'Cookie': cookies().toString()
		},
		body: JSON.stringify({
			userId: formData.get("userId"),
			username: formData.get("username"),
			password: formData.get("password")
		}),
		next: {
			revalidate: 0
		}
  });
	
	console.log(res);

	res.headers.getSetCookie().forEach(setCookieString => {
		const setCookie = parseString(setCookieString);
		cookies().set(setCookie.name, setCookie.value, {
			path: setCookie.path,
			secure: setCookie.secure,
			httpOnly: setCookie.httpOnly
		});
	});

  if(res.ok) {
    return true;
  } else {
    return false;
  }
}

export async function updateEmailV2(prevState: any, formData: FormData) {
	const res = await fetch(`https://localhost:3001/v2/user/update-email`, {
    method: "POST",
		headers: {
			'Content-Type': "application/json",
			'Cookie': cookies().toString()
		},
		body: JSON.stringify({
			userId: formData.get("userId"),
			email: formData.get("email"),
			password: formData.get("password")
		}),
		next: {
			revalidate: 0
		}
  });
	
	console.log(res);

	res.headers.getSetCookie().forEach(setCookieString => {
		const setCookie = parseString(setCookieString);
		cookies().set(setCookie.name, setCookie.value, {
			path: setCookie.path,
			secure: setCookie.secure,
			httpOnly: setCookie.httpOnly
		});
	});

  if(res.ok) {
    return true;
  } else {
    return false;
  }
}

export async function updateSettingV2(prevState: any, formData: FormData) {
	let day = formData.get("dob_day"), month = formData.get("dob_month"), year = formData.get("dob_year");
	let dob;
	if(day && month && year) {
		dob = new Date(parseInt(year.toString()), parseInt(month.toString()) - 1, parseInt(day.toString()));
	}

	const res = await fetch(`https://localhost:3001/v2/user/update`, {
    method: "POST",
		headers: {
			'Content-Type': "application/json",
			'Cookie': cookies().toString()
		},
		body: JSON.stringify({
			userId: formData.get("userId"),
			password: formData.get("password"),
			avatar: formData.get("avatar"),
			dob,
			location: formData.get("location"),
			about: formData.get("about")
		}),
		next: {
			revalidate: 0
		}
  });
	
	console.log(res);

	res.headers.getSetCookie().forEach(setCookieString => {
		const setCookie = parseString(setCookieString);
		cookies().set(setCookie.name, setCookie.value, {
			path: setCookie.path,
			secure: setCookie.secure,
			httpOnly: setCookie.httpOnly
		});
	});

  if(res.ok) {
    return true;
  } else {
    return false;
  }
}