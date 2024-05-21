'use client'
import Link from "next/link";
import styles from "./category.module.css"
import { Suspense, useState } from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Collapse } from "@mui/material";
import Loading from "@/app/components/layout/Loading";
import { CategoryDocument } from "@/app/page";

export default function CategoryBody({category, children}: {category: CategoryDocument, children: any}) {
  const [open, setOpen] = useState(true);
	const link = "/categories/" + category._id;
  return(
    <div className="rounded shadow-md bg-gray-600">
      <h2 className={`rounded-t flex bg-red-900 py-1 px-3 ${open ? "" : "rounded"}`}>
        <Link className="hover:underline self-center" href={link}>{category.title}</Link>
        <div className="flex flex-grow justify-end">
          <button title={open ? 'Hide' : 'Show'} type="button" className={`${styles.chevronButton} ${open ? styles.rotated:''}`} onClick={() => setOpen(prev => !prev)}>
            <ExpandLessIcon fontSize='large'/>
          </button>
        </div>
      </h2>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Suspense fallback={<Loading/>}>
          {children}
        </Suspense>
      </Collapse>
    </div>
  )
}