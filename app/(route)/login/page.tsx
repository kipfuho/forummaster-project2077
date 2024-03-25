'use client'
import Loading from '@/app/components/layout/Loading';
import { GetUser, PostFetch } from '@/app/components/utils/CustomFetch';
import KeyIcon from '@mui/icons-material/Key';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

// Login page
export default function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // block route if user has logged in
  useEffect(() => {
    const fetchUser = async () => {
      const userSession = await GetUser();
      if(userSession !== null) {
        router.push("/");
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    };

    fetchUser().catch((e) => console.log(e));
  }, []);

  const LoginClick = async () => {
    let response = await PostFetch(
      "login",
      {
        username: username,
        password: password
      },
      null
    );
    
    if(response.ok){
      router.push("/");
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  }

  return (
    <Suspense fallback={<Loading/>}>
      <div 
        className="border rounded shadow-md shadow-white w-[350px] m-auto p-5 space-y-4"
      >
        <h2 className='text-center text-red-800'>Login</h2>
        <div>
          <p>Enter your username or email:</p>
          <input
            className="w-full text-center p-1 text-black focus:outline-none"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div>
          <p>Enter your password:</p>
          <div className='flex'>
            <input 
              className="w-full text-center p-1 text-black focus:outline-none"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
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
          <button 
            className="flex justify-center rounded w-[150px] bg-red-700 px-2 py-1 gap-x-2"
            onClick={() => LoginClick()}
          >
            <KeyIcon/>
            <span>Login</span>
          </button>
        </div>
      </div>
    </Suspense>
  )
}