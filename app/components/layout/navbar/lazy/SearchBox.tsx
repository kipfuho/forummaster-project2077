'use client'
import { Box, Button, Divider, Input, Menu, Modal } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { MouseEvent, RefObject, useEffect, useRef, useState } from "react";
import { grey } from "@mui/material/colors";
import { SubmitButton } from "@/app/(route)/login/page";
import DebounceInput from "@/app/components/ui/DebouceInput";
import AuthorFilteredList from "@/app/(route)/forums/components/forumBody/AuthorFilteredList";
import { UserDocument } from "@/app/page";
import { filterUserV2 } from "@/app/components/utils/fetch/v2/user";
import { useParams, usePathname } from "next/navigation";
import { RedirectSearchThreadV2 } from "@/app/components/utils/fetch/v2/thread";

export default function SearchBox() {
	const path = usePathname();
	const params = useParams();
	
	// States and handler for Menu
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

	const authorInputRef = useRef<HTMLInputElement>(null);
	const [refAnchor, setRefAnchor] = useState<null | RefObject<HTMLInputElement>>(null);
	const [authorUsername, setAuthorUsername] = useState<string>("");
	const [authors, setAuthors] = useState<UserDocument[] | null>(null);
	const [searchTitle, setSearchTitle] = useState<string>("");

  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose: any = () => {
    setAnchorEl(null);
  };

	useEffect(() => {
		if(authorUsername.length > 2) {
			const filterUser = async () => {
				const users = await filterUserV2(authorUsername);
				if(users) {
					setAuthors(users);
					setRefAnchor(authorInputRef);
				}
			}

			filterUser().catch((e) => console.log(e));
		}
	}, [authorUsername]);

	if(path == '/' || path.includes('/forums')) {
		return (
			<div className="flex justify-center items-center rounded self-center bg-white text-black p-1 gap-x-2">
				<span><SearchIcon/></span>
				<input
					className="focus:outline-none"
					name='searchTitle'
					type="text"
					placeholder="Search..."
					autoComplete="off"
					onChange={(e) => setSearchTitle(e.currentTarget.value)}
					onClick={handleClick}
				/>
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'disablePadding': true
					}}
					sx={{marginTop: 1, left: -35}}
					disableAutoFocus
				>
					<form action={RedirectSearchThreadV2}>
						<Box sx={{padding: 1, width: 260}}>
							<h2>Search by title</h2>
							<Box>
								<span>By:</span>
								<DebounceInput
									inputRef={authorInputRef}
									debounceTimeout={2000}
									handleDebounce={(value: string) => setAuthorUsername(value)}
									name='author'
									placeholder="Author"
									sx={{fontSize: 15, width: 204, marginLeft: 2}}
									autoSave="0"
									autoCorrect="0"
								/>
								<AuthorFilteredList anchor={refAnchor} setAnchor={setRefAnchor} authors={authors}/>
								<Input
									name='forumId'
									value={params.forumId}
									type="hidden"
								/>
								<Input
									name='searchTitle'
									value={searchTitle}
									type="hidden"
								/>
							</Box>
							<Divider sx={{borderColor: grey[300], marginY: 1}}/>
							<SubmitButton sx={{height: 30}}>Search</SubmitButton>
						</Box>
					</form>
				</Menu>
			</div>
		)
	}
}