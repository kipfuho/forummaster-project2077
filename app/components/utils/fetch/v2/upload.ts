'use server'
import { nonPublicRequest } from "./common";

/**
 * Upload an image to the server and return its link
 * @param formData
 * @returns {Object} : { message: string, link: string}
 */
export async function uploadImageV2(
	formData: FormData
): Promise<{
	message: string,
	link: string
}> {
	return await nonPublicRequest({
		method: 'POST',
		endpoint: "v2/image/upload-single",
		body: formData,
		form: true
	}) ?? { message: 'Upload failed', link: ''};
}

/**
 * Upload multiple files to the server
 * @param formData 
 * @returns {Object} : { message: string, link: string[] }
 */
export async function uploadAttachmentsV2(
	formData: FormData
): Promise<{
	message: string,
	link: string[]
}> {
	return await nonPublicRequest({
		method: 'POST',
		endpoint: 'v2/files/upload-many',
		body: formData,
		form: true
	}) ?? { message: 'Upload failed', link: []};
}