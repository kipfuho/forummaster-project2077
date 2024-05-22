'use server'
import { PrefixDocument } from "@/app/page";
import { publicRequest } from "./common";

/**
 * Find all available prefixes
 * @returns PrefixDoc[]
 */
export async function getAllPrefixV2(): Promise<PrefixDocument[]> {
	return await publicRequest({
		method: 'GET',
		endpoint: 'v2/prefix/get-all',
		revaliate: 86400
	}) ?? [];
}