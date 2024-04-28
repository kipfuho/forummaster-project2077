'use server'
import { join } from "path";

const BE_HOST = process.env.BE_HOST ?? "";

export async function getMetadataV2() {
  const res = await fetch(join(BE_HOST, "v2/metadata"), {
		method: "GET",
		next: {
			revalidate: 10
		}
	});
  if(res.ok) {
		return res.json();
	} else {
		return [0, 0, 0, "N/A"];
	}
}

export async function getAllCategoryV2() {
  const res = await fetch(join(BE_HOST, "v2/category/get-all"), {
    method: "GET",
		next: {
			revalidate: 10
		}
  });
  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}

export async function getCategoryV2(categoryId: string) {
  if(!categoryId) {
		alert("categoryId is null");
		return null;
	}

  const res = await fetch(join(BE_HOST, `v2/category/get?categoryId=${categoryId}`), {
    method: "GET",
  });
  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}