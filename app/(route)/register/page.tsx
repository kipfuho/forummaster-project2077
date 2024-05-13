'use client'
import UnprotectedLayout from "@/app/components/layout/UnprotectedLayout";
import { registerV2 } from "@/app/components/utils/fetch/v2/user";
import { Alert, Input, Snackbar } from "@mui/material";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../login/page";
import { useFormState } from "react-dom";
import { SyntheticEvent, useEffect, useState } from "react";

// Register page
export default function Register(){
  const router = useRouter();
  const [state, formAction] = useFormState(registerV2, null);

  const [open, setOpen] = useState(false);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if(state && state.type === 'success' && router) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        router.push("/");
      }, 3000);
    }
  }, [state, router]);

  return(
    <UnprotectedLayout>
      <form 
        className="flex flex-col border rounded m-auto w-[350px] p-5 gap-3" 
        action={formAction}
      >
        <h2 className="text-red-800 text-center">Registration</h2>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          fullWidth
        />
        <Input
          name="username"
          type="text"
          placeholder="Enter your username"
          fullWidth
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          fullWidth
        />
        <Input
          name="retypePassword"
          type="password"
          placeholder="Re-enter your password"
          fullWidth
        />
        <SubmitButton>Register</SubmitButton>
        {state?.message && 
          <p className="text-center font-semibold text-gray-300">{state.message}</p>
        }
      </form>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={state?.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {state?.message}
        </Alert>
      </Snackbar>
    </UnprotectedLayout>
  )
}