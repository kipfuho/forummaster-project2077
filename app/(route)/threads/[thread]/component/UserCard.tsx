import { Tooltip } from "@mui/material";
import Image from "next/image";
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { PublicUserType } from "@/app/components/type";
import { useEffect, useState } from "react";
import { format } from 'date-fns'
import { GetPublicUser } from "@/app/components/utils/fetch/user";

export default function UserCard({user_mail}: {user_mail: string}) {
	const [user, setUser] = useState<PublicUserType | null>(null);
	const [done, setDone] = useState<boolean>(false);

	useEffect(() => {
		const getPublicUser = async () => {
			const result = await GetPublicUser(user_mail);
			if(result !== null) {
				setUser(result);
				setDone(true);
			} else {
				setUser(null);
				setDone(true);
			}
		}

		getPublicUser().catch((e) => console.log(e));
	}, []);

	return(
		<>
			{user !== null ?
				<div className="p-2 border-r-gray-500 border-r-[1px] min-w-[142px] overflow-hidden" about="author">
					<Image className="rounded-[10rem] p-2" width={125} height={125} src="/arknights.jpg" alt="img"/>
					<div className="text-center">{user.username}</div>
					<div className="space-x-2">
						<Tooltip title="Joined">
							<PersonIcon fontSize="small"/>
						</Tooltip>
						<span className="text-[0.9rem]">{format(user.create_time, "MMM dd, yyyy")}</span>
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
				</div> :
				<div>
					Not found
				</div>
			}
		</>
	)
}