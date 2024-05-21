/**
 * return category given its id
 * @param categoryId : category's id
 * @returns CategoryDoc
 */
export async function getCategory(categoryId: number) {
  const res = await fetch(`https://localhost:3001/v1/category/${categoryId}`, {
    method: "GET",
  });
  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}

export async function getMetadata() {
  const res = await fetch("https://localhost:3001/v1/metadata", {
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