import { AlertDocument } from "@/app/page";
import { IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { red } from "@mui/material/colors";

export default function AlertList({alerts}: {alerts: AlertDocument[]}) {
	return (
		<>
			{alerts.map((alert, index) => (
				<div className="flex justify-between">
					<span className="flex items-center">{index + 1 + ". " + alert.detail}</span>
					{alert.read === false && 
						<Tooltip 
							title="Mark as read" 
							placement="top"
						>
							<IconButton sx={{color: red[600]}}>
								<CheckCircleIcon/>
							</IconButton>
						</Tooltip>
					}
				</div>
			))}
		</>
	)
}