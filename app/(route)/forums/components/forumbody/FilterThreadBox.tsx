import DebounceInput from "@/app/components/ui/DebouceInput";
import { filterUserV2 } from "@/app/components/utils/fetch/v2/user";
import { ForumDocument, PrefixDocument, UserDocument } from "@/app/page";
import { Box, Divider, Input, Menu, MenuItem, Select } from "@mui/material";
import { grey } from "@mui/material/colors";
import dynamic from "next/dynamic";
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { redirectFilterV2 } from "@/app/components/utils/fetch/v2/thread";
import { SubmitButton } from "@/app/(route)/login/page";
import FilterPrefixList from "./FilterPrefixList";

const AuthorFilteredList = dynamic(() => import('./AuthorFilteredList'));

export default function FilterThreadBox({
	anchor, 
	setAnchor, 
	forum,
	prefixes
}: {
	anchor: null | HTMLElement, 
	setAnchor: Dispatch<SetStateAction<HTMLElement | null>>, 
	forum: ForumDocument,
	prefixes: PrefixDocument[]
}) {
	const authorInputRef = useRef<HTMLInputElement>(null);
	const [refAnchor, setRefAnchor] = useState<null | RefObject<HTMLInputElement>>(null);
	const [authorUsername, setAuthorUsername] = useState<string>("");
	const [authors, setAuthors] = useState<UserDocument[] | null>(null);

	const handleClose = () => {
    setAnchor(null);
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

	return (
		<Menu
			anchorEl={anchor}
			open={Boolean(anchor)}
			onClose={handleClose}
			MenuListProps={{
				'disablePadding': true
			}}
		>
			<Box sx={{width: 350, bgcolor: grey[800]}}>
				<form action={redirectFilterV2}>
					<div className="p-2">
						<p>Show only:</p>
						<Input
							name="forumId"
							type="hidden"
							value={forum._id}
							sx={{display: 'none'}}
						/>
					</div>
					<Divider sx={{borderColor: grey[400], marginY: '2px'}}/>
					<FilterPrefixList prefixes={prefixes}/>
					<Divider sx={{borderColor: grey[400], marginY: '2px'}}/>
					<div className="p-2">
						<p className="text-[0.9rem]">Author:</p>
						<DebounceInput
							inputRef={authorInputRef}
							debounceTimeout={2000}
							handleDebounce={(value: string) => setAuthorUsername(value)}
							name='author'
							placeholder="Author"
							autoComplete="off"
							sx={{fontSize: 15}}
							fullWidth
						/>
						<AuthorFilteredList anchor={refAnchor} setAnchor={setRefAnchor} authors={authors}/>
					</div>
					<Divider sx={{borderColor: grey[400], marginY: '2px'}}/>
					<div className="p-2">
						<p className="text-[0.9rem]">Last updated within:</p>
						<Select
							name="last_update"
							defaultValue={'0'}
							sx={{fontSize: 15, height: 35}}
							fullWidth
						>
							<MenuItem
								value={'0'}
								sx={{fontSize: 15, height: 25}}
							>Any time</MenuItem>
							<MenuItem
								value={'86400000'}
								sx={{fontSize: 15, height: 25}}
							>1 day</MenuItem>
							<MenuItem
								value={'604800000'}
								sx={{fontSize: 15, height: 25}}
							>7 days</MenuItem>
							<MenuItem
								value={'1209600000'}
								sx={{fontSize: 15, height: 25}}
							>14 days</MenuItem>
							<MenuItem
								value={'2592000000'}
								sx={{fontSize: 15, height: 25}}
							>1 month</MenuItem>
							<MenuItem
								value={'7776000000'}
								sx={{fontSize: 15, height: 25}}
							>3 months</MenuItem>
							<MenuItem
								value={'15552000000'}
								sx={{fontSize: 15, height: 25}}
							>6 months</MenuItem>
							<MenuItem
								value={'31536000000'}
								sx={{fontSize: 15, height: 25}}
							>1 year</MenuItem>
						</Select>
					</div>
					<Divider sx={{borderColor: grey[400], marginY: '2px'}}/>
					<div className="p-2">
						<p className="text-[0.9rem]">Sort by:</p>
						<div className="flex justify-between">
							<Select
								name='sort_type'
								defaultValue={'update_time'}
								sx={{fontSize: 15, height: 35, width: '48%'}}
							>
								<MenuItem
									value={'update_time'}
									sx={{fontSize: 15, height: 25}}
								>First message</MenuItem>
								<MenuItem
									value={'views'}
									sx={{fontSize: 15, height: 25}}
								>Views</MenuItem>
								<MenuItem
									value={'replies'}
									sx={{fontSize: 15, height: 25}}
								>Replies</MenuItem>
							</Select>
							<Select
								name="descending"
								defaultValue={1}
								sx={{fontSize: 15, height: 35, width: '48%'}}
							>
								<MenuItem
									value={1}
									sx={{fontSize: 15, height: 25}}
								>Descending</MenuItem>
								<MenuItem
									value={0}
									sx={{fontSize: 15, height: 25}}
								>Ascending</MenuItem>
							</Select>
						</div>
					</div>
					<Divider sx={{borderColor: grey[400], marginY: '2px'}}/>
					<div className="p-2 text-right">
						<SubmitButton sx={{height: 28, width: 40}}>Filter</SubmitButton>
					</div>
				</form>
			</Box>
		</Menu>
	)
} 