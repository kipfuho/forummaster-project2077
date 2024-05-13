'use client'
import { getUserPostAreaV2 } from "@/app/components/utils/fetch/v2/user";
import { ForumDocument, UserDocument } from "@/app/page";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PostArea({
	member
}: {
	member: UserDocument
}) {
	const [stats, setStats] = useState<Array<{forum: ForumDocument, count: number}>>([]);

	useEffect(() => {
		const getStats = async () => {
			const stats = await getUserPostAreaV2(member._id);
			setStats(stats);
		};

		getStats().catch((e) => console.log(e));
	}, []);

	return (
		<Box sx={{bgcolor: grey[700], borderRadius: 1}}>
			{stats.map((item, index) => (
				<Box
					display='flex'
					justifyContent='space-between'
					padding={1}
					borderBottom={1}
					borderColor={grey[400]}
				>
					<Link
						className="text-blue-500 underline"
						title="Go to this forum"
						href={`/forums/${item.forum._id}`}
					>{item.forum.name}</Link>
					<span className="pr-10">{item.count}</span>
				</Box>
			))}
		</Box>
	)
}