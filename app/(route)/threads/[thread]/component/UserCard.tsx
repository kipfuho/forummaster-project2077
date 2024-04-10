import { Tooltip } from "@mui/material";
import Image from "next/image";
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { PublicUserType } from "@/app/components/type";
import { Suspense } from "react";
import Loading from "@/app/components/layout/Loading";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import { getUserPublic } from "@/app/components/utils/fetch/v1/user";

export default async function UserCard({user_id}: {user_id: number}) {
	const user: PublicUserType = await getUserPublic(user_id);
	return(
		<Suspense fallback={<Loading/>}>
			<div className="p-2 border-r-gray-500 border-r-[1px] min-w-[142px] overflow-hidden" about="author">
				<Image className="rounded-[10rem] p-2" width={125} height={125} src="/arknights.jpg" alt="img"/>
				<div className="text-center">{user.username}</div>
				<div className="space-x-2">
					<Tooltip title="Joined">
						<PersonIcon fontSize="small"/>
					</Tooltip>
					<span className="text-[0.9rem]">{smartTimeConvert(user.create_time)}</span>
				</div>
				<div className="overflow-hidden space-x-2">
					<Tooltip title="Messages">
						<ChatIcon fontSize="small"/>
					</Tooltip>
					<span className="text-[0.9rem]">{user.messages}</span>
				</div>
				<div className="space-x-2">
					<Tooltip title="Likes">
						<ThumbUpIcon fontSize="small"/>
					</Tooltip>
					<span className="text-[0.9rem]">{user.likes}</span>
				</div>
			</div>
		</Suspense>
	)
}