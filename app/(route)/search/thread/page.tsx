'use client'
import { UserAvatar } from "@/app/components/ui/Avatar/UserAvatar";
import { CountSearchThreadV2, SearchThreadV2 } from "@/app/components/utils/fetch/v2/thread";
import { ThreadDocument, UserDocument } from "@/app/page";
import { Box, Divider, Pagination } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import ThreadTitle from "../../forums/components/threadHead/ThreadTitle";
import ThreadMetadata from "../../forums/components/threadHead/ThreadMetadata";
import { grey } from "@mui/material/colors";

export default function SearchThread() {
	const searchParams = useSearchParams();
	const forumId = searchParams.get("forumId");
	const author = searchParams.get("author");
	const title = searchParams.get("searchTitle");

	const [threads, setThreads] = useState<Array<{ thread: ThreadDocument, author: UserDocument | null }>>([]);
	const [page, setPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);

	useEffect(() => {
		(async () => {
			const res = await SearchThreadV2(forumId, decodeURIComponent(title ?? ""), author, (page - 1)*20);
			setThreads(res);
		})().catch((e) => console.log(e));
	}, [page]);
		
	useEffect(() => {
		(async () => {
			const res = await CountSearchThreadV2(forumId, decodeURIComponent(title ?? ""), author);
			setTotalPage(Math.floor((res - 1)/20 + 1));
		})().catch((e) => console.log(e));
	}, [])

	return (
		<Box>
			<h2>Search threads</h2>
			<Box sx={{backgroundColor: grey[700], borderRadius: 1, marginY: 2}}>
				{threads.map((thread, index) => {
					if(thread.author) {
						return (
							<>
								<Link className="flex" href={"/threads/" + thread.thread._id} key={index}>
									<div className="flex flex-grow">
										<div className="px-1 self-center">
											<UserAvatar user={thread.author} size={36}/>
										</div>
										<ThreadTitle thread={thread.thread} author={thread.author}/>
										<ThreadMetadata thread={thread.thread}/>
									</div>
								</Link>
								{index != threads.length - 1 && 
									<Divider sx={{borderColor: grey[400]}}/>
								} 
							</>
						)
					}	
				})}
			</Box>
			<Pagination count={totalPage} page={page} onChange={(e, page) => setPage(page)}/>
		</Box>
	)
}