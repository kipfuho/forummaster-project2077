import GetFetch from "@/app/components/utils/GetFetch";
import PostFetch from "@/app/components/utils/PostFetch";

export async function getUser() {
  let res = await PostFetch("auth/protected", {dayum: 123}, null);
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