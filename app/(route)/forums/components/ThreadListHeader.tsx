'use client'
import { ForumDocument } from "@/app/page";
import { Button } from "@mui/material";
import dynamic from "next/dynamic";
import { useState } from "react";

const FilterThreadBox = dynamic(() => import('./FilterThreadBox'));

export default function ThreadListHeader({forum}: {forum: ForumDocument}) {
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);

	return (
		<div className="flex justify-between bg-gray-500 rounded-t p-2">
			<span>NORMAL THREADS</span>
			<Button
				variant="outlined"
				sx={{height: 25}}
				onClick={(e) => setAnchor(e.currentTarget)}
			>Filter</Button>
			<FilterThreadBox anchor={anchor} setAnchor={setAnchor} forum={forum}/>
		</div>
	)
}