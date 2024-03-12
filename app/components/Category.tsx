"use client"
import { FC, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import styles from "./component.module.css"
import Link from "next/link";
import { ForumCategory } from "../page";
import { Forum } from "./Forum";

// Category component
// This appear in home page
export const Category:FC<{item: ForumCategory}> = ({item}) =>{
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
      <div className="divide-y divide-gray-400" hidden={!open}>
        {item.forums.map((forum, index) => (
          <Forum key={index} children={forum}/>
        ))}
      </div>
    </div>
  )
}