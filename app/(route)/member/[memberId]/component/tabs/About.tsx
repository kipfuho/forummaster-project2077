'use client'
import Loading from "@/app/components/layout/Loading";
import { getUserDetailV2 } from "@/app/components/utils/fetch/v2/user";
import { FullUserDocument, UserDocument } from "@/app/page";
import { Box, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import FollowingList from "./about/FollowingList";
import FollowerList from "./about/FollowerList";
import UserDetail from "./about/UserDetail";
import Signature from "./about/Signature";

export default function About({
	member
}: {
	member: UserDocument
}) {
	const [detailedUser, setDetailedUser] = useState<FullUserDocument | null>(null);
	const [done, setDone] = useState<boolean>(false);
	
	useEffect(() => {
		if(member) {
			const getDetail = async () => {
				const detailedUser = await getUserDetailV2(member._id);
				setDetailedUser(detailedUser);
				setDone(true);
			}

			getDetail().catch((e) => console.log(e));
		}
	}, [member]);
	
	return (
		<Box sx={{bgcolor: grey[700], borderRadius: 1}}>
			{done ?
				<>
					{detailedUser ?
						<>
							<UserDetail member={detailedUser}/>

							<Divider sx={{borderColor: grey[400]}}/>
							<Signature member={detailedUser}/>

							<Divider sx={{borderColor: grey[400]}}/>
							<FollowingList member={detailedUser}/>

							<Divider sx={{borderColor: grey[400]}}/>
							<FollowerList member={detailedUser}/>
						</> :
						<>Error fetching user</>
					}
				</> :
				<Loading/>
			}
		</Box>
	)
}