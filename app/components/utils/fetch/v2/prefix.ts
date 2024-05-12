'use server'
import { publicRequest } from "./common";

// public
export async function getAllPrefixV2() {
	return await publicRequest({
		method: 'GET',
		endpoint: 'v2/prefix/get-all',
		revaliate: 86400
	}) ?? [];
}