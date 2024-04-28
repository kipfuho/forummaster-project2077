'use client'
import Loading from "@/app/components/layout/Loading";
import { getThreadsOfUserV2 } from "@/app/components/utils/fetch/v2/thread";
import { ThreadDocument, UserDocument } from "@/app/page";
import Link from "next/link";
import { useEffect, useState } from "react";

function Thread() {

}

function PostingList({threads}: {threads: ThreadDocument[] | null}) {
	if(threads) {
		return (
			<div>
				{threads.map((thread) => (
					<p>{thread._id}</p>
				))}
			</div>
		)
	} else {
		return (
			<div>
				There's no postings
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
	}, []);

	return (
	 	<div
			role="tabpanel"
			hidden={value !== index}
	 	>
			{done ? 
				<PostingList threads={threads}/> :
				<Loading/>
			}
		</div>
	)
}