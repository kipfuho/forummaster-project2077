'use client'
import { BookmarkDocument} from "@/app/page"
import { Box, Button } from "@mui/material"
import { grey } from "@mui/material/colors"
import { useEffect, useState } from "react"
import BookmarkItem from "./BookmarkItem"
import Loading from "@/app/components/layout/Loading"
import { getBookmarkV2 } from "@/app/components/utils/fetch/v2/bookmark"

export default function BookmarkList() {
	const [bookmarks, setBookmarks] = useState<BookmarkDocument[]>([]);
	const [current, setCurrent] = useState<string>();
	const [showmore, setShowmore] = useState<boolean>(true);
	const [done, setDone] = useState<boolean>(false);
	
	const showMoreClick = async () => {
		setCurrent(bookmarks[bookmarks.length - 1]._id);
	}

	useEffect(() => {
		(async () => {
			setDone(false);
			const data = await getBookmarkV2(10, current);
			setBookmarks([...bookmarks, ...data]);
			setDone(true);
			if(data.length < 10) {
				setShowmore(false);
			}
		})().catch((e) => console.log(e));
	}, [current]);

	if(bookmarks) {
		return (
			<>
				<Box
					sx={{backgroundColor: grey[700], borderTopLeftRadius: 5, borderTopRightRadius: 5}}
					padding={1}
					marginTop={1}
				>...</Box>
				<Box sx={{backgroundColor: grey[800]}}>
					{bookmarks.map((bookmark, index) => (
						<BookmarkItem bookmark={bookmark} key={index}/>
					))}
				</Box>
				<Box sx={{textAlign: 'right', padding: 1, backgroundColor: grey[700], borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
					{showmore &&
						<Button
							variant="outlined"
							sx={{height: '30px', width: '130px', padding: 0}}
							disabled={!done}
							onClick={showMoreClick}
						>Show more...</Button>
					}
				</Box>
			</>
		)
	} else {
		return (
			<Loading/>
		)
	}
}