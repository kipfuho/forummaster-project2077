import { Box } from "@mui/material";
import BookmarkList from "./components/BookmarkList";

export default async function Bookmarks() {
	return (
		<Box>
			<span className="font-semibold text-[1.2rem]">Bookmarks</span>
			<BookmarkList/>
		</Box>
	)
}