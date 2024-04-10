export async function getForumV2(forumId: string) {
  const res = await fetch(`https://localhost:3001/v2/forum/get?forumId=${forumId}`, {
    method: "GET",
		next: {
			revalidate: 10 // 10 seconds
		}
  });
  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}