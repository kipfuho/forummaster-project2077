'use client'
import UnprotectedLayout from '@/app/components/layout/UnprotectedLayout';
import { useUserContext } from '@/app/components/context/user/UserContext';
import { loginV2 } from '@/app/components/utils/fetch/v2/user';
import KeyIcon from '@mui/icons-material/Key';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { Button, Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

export function SubmitButton({children, sx}: {children: any, sx?: any}) {
  const { pending } = useFormStatus()
  return (
    <Button
    type="submit"
    variant='contained'
    disabled={pending}
    sx={sx && { ...sx}}
    >{children}</Button>
  )
}

// Login page
export default function Login(){
  const [_, setUser] = useUserContext();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useFormState(loginV2, null);

  useEffect(() => {
    if(state) {
      console.log(state);
      setUser(state.user);
    }
  }, [state]);

  return (
    <UnprotectedLayout>
      <form 
        className="border rounded shadow-md shadow-white w-[350px] m-auto p-5 space-y-4"
        action={formAction}
      >
        <h2 className='text-center text-red-800'>Login</h2>
        <Input
          name='username'
          placeholder='Enter your username or email'
          fullWidth
        />
        <div>
          <div className='flex'>
            <Input
              name='password'
              placeholder='Enter your password'
              type={showPassword ? 'text' : 'password'}
              fullWidth
            />
            <div
              className='flex border bg-gray-800 px-2'
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 
                <div className='flex justify-center items-center'>
                  <ToggleOffIcon/>
                  <span className='w-[40px]'>Hide</span>
                </div>:
                <div className='flex justify-center items-center'>
                  <ToggleOnIcon/>
                  <span className='w-[40px]'>Show</span>
                </div>
              }
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <SubmitButton>
            <KeyIcon/>
            <span>Login</span>
          </SubmitButton>
        </div>
      </form>
    </UnprotectedLayout>
  )
}