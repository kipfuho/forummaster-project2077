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
	prefixes
}: {
	children: ReactNode,
	forum: ForumDocument,
	prefixes: PrefixDocument[]
}) {
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);

	return (
		<div className="rounded bg-gray-600">
			<FilterPrefix prefixes={prefixes}/>
			<div className="flex justify-between bg-gray-500 rounded-t p-2">
				<span>Filter go there!</span>
				<Button
					variant="outlined"
					sx={{height: 25}}
					onClick={(e) => setAnchor(e.currentTarget)}
				>Filter</Button>
				<FilterThreadBox
					anchor={anchor}
					setAnchor={setAnchor}
					forum={forum}
				/>
			</div>
			{children}
		</div>
	)
}