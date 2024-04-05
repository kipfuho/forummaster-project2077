import { GetFetch } from "./custom";

export async function GetMetadata() {
	const response = await GetFetch("metadata", null);
	if(response.ok) {
		return response.json();
	} else {
		return null;
	}
}

export async function UploadImage(image: any) {
	const formData = new FormData();
	formData.append("image", image);
	const response = await fetch(
		"https://localhost:3001/image/upload-single",
		{
			method: "POST",
			body: formData,
			credentials: "include",
			cache: "force-cache"
		}
	);
	if(response.ok) {
		return response.json();
	} else {
		console.log("upload image failed: " + image);
		return null;
	}
}