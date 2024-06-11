import { PrefixDocument, UserDocument } from "@/app/page";
import { Box, Button, Input, Menu, MenuItem } from "@mui/material";
import { grey } from "@mui/material/colors";
import { RefObject, useRef, useState } from "react";

function SimplePrefix({
	prefix
}: {
	prefix: PrefixDocument
}) {
	return (
		<Box sx={{backgroundColor: prefix.color, color: 'white', borderRadius: 1, paddingX: 0.3}}>
			{prefix.name}
		</Box>
	)
}

/**
 * Filter many prefixes
 * @param param0 
 * @returns 
 */
export default function FilterPrefixList({
	prefixes
}: {
	prefixes: PrefixDocument[]
}) {
	const [filteredPrefixes, setFilteredPrefixes] = useState<PrefixDocument[]>(prefixes);
	const [chosePrefixes, setChosePrefixes] = useState<PrefixDocument[]>([]);
	const divRef = useRef<HTMLDivElement>(null);

	const inputRef = useRef<HTMLInputElement>(null);
	const [anchor, setAnchor] = useState<null | RefObject<HTMLDivElement>>(null);
  const open = Boolean(anchor);

	const handleClose = () => {
    setAnchor(null);
  };
	
	const handlePrefixClick = (prefix: PrefixDocument) => {
		if(inputRef?.current) {
			if(inputRef.current.value.length > 0) {
				inputRef.current.value = inputRef.current.value += `,${prefix.id}`;
			}
			else {
				inputRef.current.value = `${prefix.id}`;
			}
		}
		setChosePrefixes([...chosePrefixes, prefix]);
		setAnchor(null);
	}

	const handleRemoveChosePrefix = (prefix: PrefixDocument) => {
		setChosePrefixes(chosePrefixes.filter((p) => {return p !== prefix}));
		if(inputRef?.current) {
			inputRef.current.value = inputRef.current.value.split(',').filter((id) => {return Number(id) !== prefix.id}).join(',');
		}
	}

	return (
		<>
			<div className="p-2" ref={divRef}>
				<p className="text-[0.9rem]">Prefix:</p>
				<div>
					<div>
						{chosePrefixes.map((prefix, index) => (
							<Button
								key={index}
								variant="outlined"
								sx={{paddingX: 1, backgroundColor: grey[500], borderColor: 'transparent'}}
								onClick={() => handleRemoveChosePrefix(prefix)}
							>
								<span className="text-gray-800">X</span>
								<SimplePrefix prefix={prefix}/>
							</Button>
						))}
					</div>
					<Input
						placeholder="Prefix"
						autoComplete="off"
						fullWidth
						sx={{fontSize: 15}}
						onClick={() => {
							setAnchor(divRef);
						}}
					/>
					<Input
						inputRef={inputRef}
						name='prefix'
						type='hidden'
					/>
				</div>
			</div>
			<Menu
				anchorEl={anchor?.current}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'disablePadding': true
				}}
			>
				<Box sx={{width: 350, bgcolor: grey[700]}}>
					{filteredPrefixes.map((prefix, index) => (
						<MenuItem
							key={index}
							value={prefix.id}
							sx={{height: 25, fontSize: 15}}
							onClick={() => handlePrefixClick(prefix)}
						>
							<SimplePrefix prefix={prefix}/>
						</MenuItem>
					))}
				</Box>
			</Menu>
		</>
	)
}