'use client'
import { useUserContext } from "@/app/components/context/user/UserContext";
import { checkFollowUserV2, followUserV2 } from "@/app/components/utils/fetch/v2/user";
import { Button, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

export default function FollowButton({
	memberId
}: {
	memberId: string
}) {
	const [user, _] = useUserContext();
	const [follow, setFollow] = useState<boolean>(false);

	const followClick = async () => {
		const result = await followUserV2(memberId);
		if(result) {
			setFollow(result);
		}
	}

	useEffect(() => {
		if(user) {
			const checkFollow = async () => {
				const result = await checkFollowUserV2(memberId);
				setFollow(result);
			}

			checkFollow().catch((e) => console.log(e));
		}
	}, [user]);

	if(user && user._id !== memberId) {
		return (
			<Tooltip title={follow ? 'Unfollow this member' : 'Follow this member'}>
				<Button
					variant="outlined"
					sx={{fontSize: '12px', height: '25px', width: '50px'}}
					onClick={followClick}
				>{follow ? 'Unfollow' : 'Follow'}</Button>
			</Tooltip>
		)
	}
}