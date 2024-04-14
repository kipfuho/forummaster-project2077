export async function getMetadataV2() {
  const res = await fetch("https://localhost:3001/v2/metadata", {
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
  const res = await fetch(`https://localhost:3001/v2/category/get-all`, {
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

  const res = await fetch(`https://localhost:3001/v2/category/get?categoryId=${categoryId}`, {
    method: "GET",
  });
  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}