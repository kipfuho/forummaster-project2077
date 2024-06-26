import Loading from "@/app/components/layout/Loading";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user";
import { ProfilePostingDocument, UserDocument } from "@/app/page";
import { Box, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import ReplyProfilePost from "./ReplyProfilePost";

// show a profile posting message block
export default function ProfilePostingItem({
	profilePosting
}: {
	profilePosting: ProfilePostingDocument
}) {
	const [pp, setPp] = useState<ProfilePostingDocument>(profilePosting);
	const [ppUser, setppUser] = useState<UserDocument | null>(null);
	const [repUsers, setRepsUser] = useState<Array<UserDocument | null>>([]);
	const [lastRep, setLastRep] = useState<number>(3);
	const [done, setDone] = useState<boolean>(false);

	useEffect(() => {
		const getppUser = async () => {
			const result = await getUserV2(pp.user);
			setppUser(result);
			setDone(true);
		};
		
		const getRepUser = async () => {
			const result = await Promise.all(
				pp.replies.slice(0, lastRep).map(async (reply) => {
					const replyuser = await getUserV2(reply.user);
					return replyuser;
				})
			);

			if(result) {
				repUsers.push(...result);
			}
		}

		getppUser().catch((e) => console.log(e));
		getRepUser().catch((e) => console.log(e));
	}, [pp.replies, lastRep]);
	
	return (
		<Box marginBottom={1}>
			<Box
				display='flex'
				bgcolor={grey[700]}
				padding={1}
				borderRadius={1}
			>
				{ppUser ? <Box marginRight={1}><UserAvatar user={ppUser} size={36}/></Box> : <Loading/>}
				<span className="self-center">{pp.message}</span>
			</Box>
			<Box sx={{marginLeft: 5}}>
				{pp.replies.slice(0, lastRep).map((rep, index) => (
					<Box
						key={index}
						display='flex'
						padding='5px'
					>
						{repUsers[index] ? <Box marginRight={1}><UserAvatar user={repUsers[index]} size={36}/></Box> : <Loading/>}
						<span className="self-center">{rep.message}</span>
					</Box>
				))}
				{pp.replies.length > lastRep &&
					<Button
						onClick={() => setLastRep(lastRep + 3)}
					>Show more replies</Button>
				}
				<ReplyProfilePost
					profilePosting={pp}
					setPp={setPp}
				/>
			</Box>
		</Box>
	)
}