'use client'
import { Button } from "@mui/material"
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from "react";
import { MessageDocument, UserDocument } from "@/app/page";
import dynamic from "next/dynamic";

const ReportMenu = dynamic(() => import('./ReportMenu'));

export default function ReportButton({message, user}: {message: MessageDocument, user: UserDocument}) {
	const [anchor, setAnchor] = useState<null | HTMLElement>(null);

	const reportClick = async (e: any) => {
		setAnchor(e.currentTarget);
	}

	return (
		<>
			<Button
				startIcon={<ErrorIcon/>}
				sx={{fontSize: 12, height: 25, width: 85}}
				onClick={reportClick}
			>Report</Button>
			<ReportMenu anchor={anchor} setAnchor={setAnchor} message={message} user={user}/>
		</>
	)
}