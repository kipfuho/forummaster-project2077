import { join } from "path";

export async function uploadImageV2(image: any) {
	const formData = new FormData();
	formData.append("image", image);
	const res = await fetch(
		"https://localhost:3001/v2/image/upload-single",
		{
			method: "POST",
			body: formData,
			credentials: "include"
		}
	);

	if(res.ok) {
		return res.json();
	} else {
		console.log("upload image failed: " + image);
		return null;
	}
}

export async function uploadAttachmentsV2(files: File[]) {
	if(files.length === 0 || files.length > 10) {
		return {
			message: "Choose between 1 and 10 files",
			type: "fail"
		};
	}
	const formData = new FormData();
	files.forEach(file => {
		if(file.size > 10*1024*1024) {
			return {
				message: "Choose file less than 10MB",
				type: "fail"
			};
		}
		formData.append("attachments", file);
	});

	const res = await fetch(
		"https://localhost:3001/v2/files/upload-many",
		{
			method: "POST",
			body: formData,
			credentials: "include"
		}
	);

	console.log(res);
	if(res.ok) {
		return res.json();
	} else {
		console.log("upload image failed: " + files);
		return null;
	}
}