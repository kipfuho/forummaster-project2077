'use server'
import { cookies } from "next/headers";
import { join } from "path";
import { parseString } from "set-cookie-parser";

const BE_HOST = process.env.BE_HOST ?? "";

// public
export async function getAllPrefixV2() {
	const res = await fetch(join(BE_HOST, 'v2/prefix/get-all'), {
		method: "GET"
	});

	if(res.ok) {
		return res.json();
	} else {
		return [];
	}
}