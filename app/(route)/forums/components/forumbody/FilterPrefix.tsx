import { PrefixDocument } from "@/app/page";
import { Button, IconButton } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

function PrefixBlock({prefix}: {prefix: PrefixDocument}) {
	const [choose, setChoose] = useState<boolean>(false);

	return (
		<>
			<Button
				sx={{color: "white", backgroundColor: prefix.color, 	marginRight: '4px', paddingX: 1, borderRadius: 1, height: '25px', textTransform: 'none'}}
				disabled={choose}
				onClick={() => setChoose(true)}
			>{prefix.name}</Button>
			{choose &&
				<IconButton
					sx={{
					width: '20px',
					height: '20px',
					marginRight: '4px',
					fontSize: '18px',
					borderColor: grey[300],
					border: 1,
					padding: 1,
					":hover": {
						backgroundColor: 'red'
					}}}
					onClick={() => setChoose(false)}
				><CloseIcon fontSize="small"/></IconButton>}
		</>
	)
}

export default function FilterPrefix({prefixes}: {prefixes: PrefixDocument[]}) {
	return (
		<div className="p-2">
			<span className="mr-2">Filter threads by prefixes:</span>
			{prefixes.map((prefix, index) => (
				<PrefixBlock key={index} prefix={prefix}/>
			))}
		</div>
	)
}