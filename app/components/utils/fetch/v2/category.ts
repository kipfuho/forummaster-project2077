'use server'
import { publicRequest } from "./common";

// public
export async function getMetadataV2() {
  return await publicRequest({
    method: 'GET',
    endpoint: 'v2/metadata',
    revaliate: 10
  });
}

// public
export async function getAllCategoryV2() {
  return await publicRequest({
    method: 'GET',
    endpoint: "v2/category/get-all",
    revaliate: 86400
  })
}

// public
export async function getCategoryV2(categoryId: string) {
  if(!categoryId) {
		alert("categoryId is null");
		return null;
	}

  return await publicRequest({
    method: 'GET',
    endpoint: `v2/category/get?categoryId=${categoryId}`,
    revaliate: 86400
  })
}