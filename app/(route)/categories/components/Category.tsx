'use client'
import { 
  useEffect, 
  useState 
} from "react";
import Loading from "@/app/components/layout/Loading";
import Link from "next/link";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Collapse } from "@mui/material";
import styles from "./category.module.css"
import { CategoryType, ForumType } from "@/app/components/type";
import ForumHead from "./ForumHead";
import { GetForumData } from "@/app/components/utils/fetch/forum";

function CategoryBody({item, children}: {item: CategoryType, children: any}) {
  const [open, setOpen] = useState(true);
	return(
		<div className="rounded shadow-md bg-gray-600">
			<h2 className={`rounded-t flex bg-red-900 py-1 px-3 ${open ? "" : "rounded"}`}>
				<Link className="hover:underline self-center" href={item.path}>{item.name}</Link>
				<div className="flex flex-grow justify-end">
					<button className={`${styles.chevronButton} ${open ? styles.rotated:''}`} onClick={() => setOpen(prev => !prev)}>
						<ExpandLessIcon fontSize='large'/>
					</button>
				</div>
			</h2>
			<Collapse in={open} timeout="auto" unmountOnExit>
				{children}
			</Collapse>
		</div>
	)
}



// Category component
// This appear in home page
export default function Category({item}: {item: CategoryType}) {
  const [forums, setForums] = useState<ForumType[] | null>(null);
  const [done, setDone] = useState<boolean>(false); // see if forums have been fetched

  useEffect(() => {
    const getForums = async () => {
      const forums = await GetForumData(item.category);
      if(forums !== null) {
        setForums(forums);
        setDone(true);
      } else {
        setForums(null);
        setDone(true);
      }
    }

    getForums().catch((e) => console.log(e));
  }, []);

  return(
    <CategoryBody item={item}>
      {done ? 
        <div className="divide-y-[1px] divide-gray-400">
          {forums && 
            forums.map((forum: ForumType, index: number) => (
              <ForumHead key={index} item={forum}/>
            ))
          }
        </div> :
        <Loading/>
      }
    </CategoryBody>
  )
}