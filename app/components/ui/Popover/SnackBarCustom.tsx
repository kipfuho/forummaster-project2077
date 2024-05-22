import { Snackbar } from "@mui/material"
import { useEffect, useState } from "react"

export default function SnackBarCustom({
	state
}: {
	state: {
		type: any,
		message: string,
		open: boolean;
	}
}) {
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		if(state.open) {
			state.open = false;
			setOpen(true);
		}
	}, [state.open]);

	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			autoHideDuration={3000}
			open={open}
			onClose={() => setOpen(false)}
			message={state && state.message}
		/>
	)
}