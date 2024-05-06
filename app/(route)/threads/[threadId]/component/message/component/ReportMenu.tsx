'use client'
import { SubmitButton } from "@/app/(route)/login/page";
import { Box, FormControlLabel, Input, Menu, Radio, RadioGroup } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { checkReportV2 } from "@/app/components/utils/fetch/v2/report";
import { MessageDocument, UserDocument } from "@/app/page";

export default function ReportMenu({
	anchor,
	setAnchor,
	user,
	message
}: {
	anchor: HTMLElement | null,
	setAnchor: Dispatch<SetStateAction<null | HTMLElement>>,
	user: UserDocument,
	message: MessageDocument
}) {
	const [report, setReport] = useState<boolean>(false);

	const handleClose = () => {
    setAnchor(null);
  };

	useEffect(() => {
		const checkReport = async () => {
			const result = await checkReportV2(user._id, message._id);
			setReport(result);
		}

		checkReport().catch((e) => console.log(e));
	}, [user]);

	return (
		<Menu
			anchorEl={anchor}
			open={Boolean(anchor)}
			onClose={handleClose}
			MenuListProps={{
				'disablePadding': true
			}}
		>
			<Box padding={2} width={250}>
				<form>
					<p className="mb-3">Report message</p>
					<div>
						<p className="text-[0.9rem]">Reason:</p>
						<RadioGroup
							defaultValue="other"
							name="radio-buttons-group"
						>
							<FormControlLabel
							value="spam"
							control={<Radio sx={{color:grey[200]}}/>}
							label="Spamming"
							/>
							<FormControlLabel
							value="ads"
							control={<Radio sx={{color:grey[200]}}/>}
							label="Advertising"
							/>
							<FormControlLabel
							value="other"
							control={<Radio sx={{color:grey[200]}}/>} label="Other"
							/>
						</RadioGroup>
					</div>
					<div>
						<p className="text-[0.9rem]">Detail (Optional):</p>
						<Input
							name="detail"
							sx={{fontSize: "0.9rem", bgcolor: grey[700]}}
							fullWidth
						/>
					</div>
					<div className="flex justify-center space-x-2 mt-5">
						<SubmitButton sx={{height: 25}}>
							<SendIcon fontSize="small"/>
							<span className="ml-1">Report</span>
						</SubmitButton>
					</div>
				</form>
			</Box>
		</Menu>
	)
}