import { GetFetch, PostFetch } from "./custom";

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
	const response = await GetFetch(
		"user/profile",
		null
	);

	if(response.ok) {
		return response.json();
	} else {
		return null;
	}
}

// get account details information
export async function GetUserSetting() {
	const response = await GetFetch(
		"user/get-profile",
		null
	);
	if(response.ok) {
		return response.json();
	} else {
		return null;
	}
}


// update username
export async function UpdateUsernameFetch(username: string) {
	const response = await PostFetch("user/update-username", {username}, null);
	if(response.ok) {
		return true;
	} else {
		return false;
	}
}

// update email
export async function UpdateEmailFetch(email: string) {
	const response = await PostFetch("user/update-email", {email}, null);
	if(response.ok) {
		return true;
	} else {
		return false;
	}
}