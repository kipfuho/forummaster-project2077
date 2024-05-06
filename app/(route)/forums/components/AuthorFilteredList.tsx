import { UserDocument } from "@/app/page";
import { Box, Menu, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Dispatch, RefObject, SetStateAction } from "react";

export default function AuthorFilteredList({anchor, setAnchor, authors}: {anchor: null | RefObject<HTMLInputElement>, setAnchor: Dispatch<SetStateAction<RefObject<HTMLInputElement> | null>>, authors: null | UserDocument[]}) {
  const open = Boolean(anchor);
	const handleClose = () => {
    setAnchor(null);
  };

	if(authors) {
		return ( 
			<Menu
				anchorEl={anchor?.current}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'disablePadding': true
				}}
			>
				<Box sx={{width: 200, bgcolor: grey[700]}}>
					{authors.map((author, index) => (
						<MenuItem
							value={author.username}
							key={index}
							sx={{height: 25, fontSize: 15}}
							onClick={() => {
								if(anchor?.current) {
									anchor.current.value = author.username;
								}
								setAnchor(null);
							}}
						>{author.username}</MenuItem>
					))}
					{authors.length === 0 && <p>No users found!</p>}
				</Box>
			</Menu>
		)
	}
}