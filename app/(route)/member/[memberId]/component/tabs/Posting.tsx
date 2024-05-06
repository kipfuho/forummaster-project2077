'use client'
import ThreadHead from "@/app/(route)/forums/components/threadhead/ThreadHead";
import Loading from "@/app/components/layout/Loading";
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { getThreadsOfUserV2 } from "@/app/components/utils/fetch/v2/thread";
import { smartTimeConvert } from "@/app/components/utils/HelperFunction";
import { ThreadDocument, UserDocument } from "@/app/page";
import { Box, Button, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PostingComponent({
	user,
	thread
}: {
	user: UserDocument,
	thread: ThreadDocument,
}) {
	return (
		<>
			<Link className="flex px-2 py-1" href={"/threads/" + thread._id}>
				<div className="flex flex-grow">
					<div className="px-1 self-center">
						<UserAvatar user={user} size={36}/>
					</div>
					<div className="flex-grow py-1 px-2 border-gray-400">
						<div className="flex">
							<div className="space-x-2">
								{thread.tag.map((tag, index) => (
									<span key={index}>&#34;{tag.name}&#34;</span>
								))}
							</div>
							<div className="text-red-600 hover:underline">
								{thread.title}
							</div>
						</div>
						<div className="flex space-x-4 text-[0.9rem]">
							<div>
								{user.username}
							</div>
							<div>
								{smartTimeConvert(thread.create_time)}
							</div>
						</div>
					</div>
				</div>
			</Link>
			<Divider sx={{borderColor: grey[400]}}/>
		</>
	)
}

function PostingList({
	threads,
	user
}: {
	threads: ThreadDocument[] | null,
	user: UserDocument
}) {
	const router = useRouter();
	if(threads) {
		return (
			<Box sx={{bgcolor: grey[700], borderRadius: 1}}>
				<>
					{threads?.map((thread: ThreadDocument, index: number) => (
						<PostingComponent key={index} thread={thread} user={user}/>
					))}
					<p className="text-right p-2">
						<Button
							variant="contained"
							sx={{height: 25, width: 90, padding: 0}}
							onClick={() => router.push(`/search/member?userId=${user._id}`)}
						>See more</Button>
					</p>
				</>
			</Box>
		)
	} else {
		return (
			<div>
				There&#39;s no postings
			</div>
		)
	}
}

export default function Posting({value, index, user}: {value: number, index: number, user: UserDocument}) {
	const [threads, setThreads] = useState<ThreadDocument[] | null>(null);
	const [done, setDone] = useState<boolean>(false);

	useEffect(() => {
		const getThreads = async () => {
			const threadsData = await getThreadsOfUserV2(user._id, null, 10);
			setThreads(threadsData);
			setDone(true);
		};

		getThreads().catch((e) => console.log(e));
	}, [user._id]);

	return (
	 	<div
			role="tabpanel"
			hidden={value !== index}
	 	>
			{done ? 
				<PostingList threads={threads} user={user}/> :
				<Loading/>
			}
		</div>
	)
}