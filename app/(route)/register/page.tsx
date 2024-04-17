'use client'
import UnprotectedLayout from "@/app/components/layout/UnprotectedLayout";
import { registerV2 } from "@/app/components/utils/fetch/v2/user";
import { Input } from "@mui/material";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../login/page";
import { useFormState } from "react-dom";

// Register page
export default function Register(){
  const router = useRouter();
  const [state, formAction] = useFormState(registerV2, null);

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
        <SubmitButton>Verify</SubmitButton>
      </form>
    </UnprotectedLayout>
  )
}