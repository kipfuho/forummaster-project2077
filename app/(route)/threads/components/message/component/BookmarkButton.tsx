'use client'
import { SubmitButton } from "@/app/(route)/login/page";
import { checkBookmarkV2, createBookmarkV2, deleteBookmarkV2, updateBookmarkV2 } from "@/app/components/utils/fetch/v2/bookmark";
import { BookmarkDocument } from "@/app/page";
import { Box, Button, IconButton, Input, Menu, Tooltip } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { MouseEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BookmarkButton({userId, messageId}: {userId: string, messageId: string}) {
	const [bookmark, setBookmark] = useState<BookmarkDocument | null>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

	const bookmarkClick = async (event: MouseEvent<HTMLButtonElement>) => {
		let e = event.currentTarget;
		if(bookmark) {
			setAnchorEl(e);
		} else {
			const bookmark = await createBookmarkV2(userId, messageId);
			if(bookmark) {
				setBookmark(bookmark);
				setAnchorEl(e);
			}
		}
	}

	const deleteClick = async () => {
		if(bookmark) {
			const result = await deleteBookmarkV2(bookmark._id);
			if(result) {
				setBookmark(null);
				setAnchorEl(null);
			}
		}
	}

	useEffect(() => {
		const checkBookmark = async () => {
			const bookmark = await checkBookmarkV2(userId, messageId);
			if(bookmark) {
				setBookmark(bookmark);
			}
		}
		checkBookmark().catch((e) => console.log(e));
	}, [userId, messageId]);

	const [state, formAction] = useFormState(updateBookmarkV2, null);
	
	useEffect(() => {
		if(state) {
			alert("Updated bookmark");
			setAnchorEl(null);
		}
	}, [state]);

	return (
		<>
			<Tooltip title="Bookmark">
				<IconButton sx={{color: red[500]}} onClick={bookmarkClick}>
					{bookmark ? 
						<BookmarkIcon fontSize="small"/> :
						<BookmarkBorderIcon fontSize="small"/>
					}
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'disablePadding': true
				}}
			>
				<Box padding={2} width={250}>
					<form action={formAction}>
						<p className="mb-3">Bookmark added</p>
						<div>
							<p className="text-[0.9rem]">Message (Optional):</p>
							<Input
								name="detail"
								sx={{fontSize: "0.9rem", bgcolor: grey[700]}}
								fullWidth
							/>
							<Input
								name="bookmarkId"
								type="hidden"
								value={bookmark?._id}
								sx={{fontSize: "0.9rem", bgcolor: grey[700]}}
							/>
						</div>
						<div className="flex justify-center space-x-2 mt-5">
							<SubmitButton sx={{height: 25}}	>
								<SaveIcon/>
								<span>Save</span>
								</SubmitButton>
							<Button
								startIcon={<DeleteIcon/>}
								variant="contained"
								sx={{height: 25}}
								onClick={deleteClick}
							>Delete</Button>
						</div>
					</form>
				</Box>
			</Menu>
		</>
	)
}