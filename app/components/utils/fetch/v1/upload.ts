export async function uploadImage(image: any) {
	const formData = new FormData();
	formData.append("image", image);
	const response = await fetch(
		"https://localhost:3001/v1/image/upload-single",
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