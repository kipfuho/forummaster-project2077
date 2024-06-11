'use client'
import { ForumDocument, PrefixDocument, ThreadDocument } from "@/app/page";
import { Box, Button } from "@mui/material";
import dynamic from "next/dynamic";
import { ReactNode, useState } from "react";
import FilterPrefix from "./forumBody/FilterPrefix";

const FilterThreadBox = dynamic(() => import('./forumBody/FilterThreadBox'));

export default function ForumBody({
	children,
	forum,
	prefixes,
	prefixIds
}: {
	children: ReactNode,
	forum: ForumDocument,
	prefixes: PrefixDocument[],
	prefixIds?: number[]
}) {
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);

	return (
		<div className="rounded bg-gray-600">
			<FilterPrefix prefixes={prefixes}/>
			<div className="flex justify-between bg-gray-500 rounded-t p-2">
				<Box>
					{prefixIds &&
						prefixIds.map((id, index) => (
							<span
								className="border border-transparent p-1 rounded bg-gray-600 text-gray-400"
								key={index}
							>Prefix:<span className="text-white">{prefixes[id - 1].name}</span></span>
						))
					}
				</Box>
				<Button
					variant="outlined"
					sx={{height: 25}}
					onClick={(e) => setAnchor(e.currentTarget)}
				>Filter</Button>
				<FilterThreadBox
					anchor={anchor}
					setAnchor={setAnchor}
					forum={forum}
					prefixes={prefixes}
				/>
			</div>
			{children}
		</div>
	)
}