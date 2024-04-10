export async function getForum(forum_id: number) {
  const res = await fetch("https://localhost:3001/v1/forum/get-forum", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({forum_id}),
  });
  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}

export async function getForums(categoryId: number) {
  const res = await fetch(`https://localhost:3001/v1/forum/get-forum?categoryId=${categoryId}`, {
    method: "GET",
  });
  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}

export async function getLastestThread(forumId: number) {
  const res = await fetch(`https://localhost:3001/v1/thread/get-thread-lastest?forum_id=${forumId}`, {
    method: "GET",
    next: {
      revalidate: 0
    }
  });
  if(res.ok) {
    return res.json();
  } else {
    return null;
  }
}
