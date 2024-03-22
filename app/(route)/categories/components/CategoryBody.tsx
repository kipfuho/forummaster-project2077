'use client'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styles from "./category.module.css"
import Link from "next/link";
import { ForumCategoryType } from '@/app/page';
import { useState } from 'react';

// client component for category
// will make things more interactable
export default function CategoryBody({item, children}: {item: ForumCategoryType, children: any}) {
  const [open, setOpen] = useState(true);
	return(
		<div className="rounded shadow-md bg-gray-600">
			<h2 className="rounded-t flex bg-red-900 p-2">
				<Link className="hover:underline" href={item.path}>{item.name}</Link>
				<div className="flex flex-grow justify-end">
					<button className={`${styles.chevronButton} ${open ? styles.rotated:''}`} onClick={() => setOpen(prev => !prev)}>
						<ExpandLessIcon fontSize="large"/>
					</button>
				</div>
			</h2>
			{open && children}
		</div>
	)
}