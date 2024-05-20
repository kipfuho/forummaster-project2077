import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar"
import { getMessageV2 } from "@/app/components/utils/fetch/v2/message"
import { getThreadV2 } from "@/app/components/utils/fetch/v2/thread"
import { getUserV2 } from "@/app/components/utils/fetch/v2/user"
import { BookmarkDocument, MessageDocument, ThreadDocument, UserDocument } from "@/app/page"
import { Box, Tooltip } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PersonIcon from '@mui/icons-material/Person';
import { clipText, getPTagText, smartTimeConvert } from "@/app/components/utils/HelperFunction"
import { grey } from "@mui/material/colors"

export default function BookmarkItem({
	bookmark
}: {
	bookmark: BookmarkDocument
}) {
	const [message, setMessage] = useState<MessageDocument | null>();
	const [thread, setThread] = useState<ThreadDocument | null>();
	const [author, setAuthor] = useState<UserDocument | null>();
	const [done, setDone] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const [message, thread] = await Promise.all([
				getMessageV2(bookmark.message),
				getThreadV2(bookmark.thread)
			]);
			const author = await getUserV2(message ? message.user : '');

			setMessage(message);
			setThread(thread);
			setAuthor(author);
			setDone(true);
		})().catch((e) => console.log(e));
	}, []);

	if(done) {
		if(message && thread && author) {
			return (
				<Box
					padding={1}
					display='flex'
					borderBottom={1}
					borderColor={grey[700]}
				>
					<Box padding={1}>
						<UserAvatar user={author} size={36}/>
					</Box>
					<Box>
						<Link
							className="text-red-700 hover:underline hover:brightness-200"
							href={`/threads/${thread._id}?messageId=${message._id}`}
						>Message in thread '{thread.title}'</Link>
						<Box
							fontSize={15}
							color={grey[300]}
						>
							{clipText(getPTagText(message.content).join(' '), 220, '...')}
						</Box>
						<Box display='flex'>
							<Tooltip title='User'>
								<PersonIcon fontSize="small"/>
							</Tooltip>
							<Link
								title="Go to this member profile page"
								className="text-gray-400 underline mr-1"
								href={`member/${author._id}`}
							>{author.username}</Link>

							<Tooltip title='Bookmarked on'>
								<AccessTimeFilledIcon fontSize="small"/>
							</Tooltip>
							<span
								className="text-gray-400"
								title={bookmark.create_time.toLocaleString()}
							>{smartTimeConvert(bookmark.create_time)}</span>
						</Box>
					</Box>
				</Box>
			)
		} else {
			return (
				<p>Something went wrong!</p>
			)
		}
	}
}