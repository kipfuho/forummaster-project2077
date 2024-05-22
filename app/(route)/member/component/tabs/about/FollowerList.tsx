import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";
import { FullUserDocument, UserDocument } from "@/app/page";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function FollowerList({
	member
}: {
	member: FullUserDocument
}) {
	const [fUsers, setFUsers] = useState<UserDocument[]>([]);

	useEffect(() => {
		const getfusers = async () => {
			const result = await Promise.all(
				member.followers.slice(0, 3).map(async (id) => {
					const fuser = await getUserV2(id);
					return fuser;
				})
			)

			setFUsers(result);
		}

		getfusers().catch((e) => console.log(e));
	}, []);

	return (
		<div className="p-2">
			<span>Followers: </span>
			<span>{member.followers.length}</span>

			<Box>
				{fUsers.map((user, index) => (
					<Box display='inline-block' marginRight={1}>
						<UserAvatar
							key={index}
							user={user}
							size={36}
						/>
					</Box>
				))}
			</Box>
		</div>
	)
}