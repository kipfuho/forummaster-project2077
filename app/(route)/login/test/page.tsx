import GetFetch from "@/app/components/utils/GetFetch";
import PostFetch from "@/app/components/utils/PostFetch";

export async function getUser() {
  let res = await GetFetch("auth/profile", null);
	return res;
}

export default async function Test() {
	const userD = await getUser();
  const [user] = await Promise.all([userD]);
	
	return(
		<main>
			Test
		</main>
	)
}