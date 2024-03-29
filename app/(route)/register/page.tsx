'use client'
import { UnprotectedLayout } from "@/app/components/layout/UnprotectedLayout";
import { PostFetch } from "@/app/components/utils/CustomFetch";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Register page
export default function Register(){
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const router = useRouter();

  const registerClick = async () => {
    if(email.trim().length === 0){
      alert("Please enter email");
      return;
    }
    if(username.trim().length === 0){
      alert("Please enter username");
      return;
    }
    if(password.trim().length === 0){
      alert("Please enter password");
      return;
    }
    if(retypePassword.trim().length === 0){
      alert("Please reenter password");
      return;
    }
    if(password !== retypePassword){
      alert("Passwords did not match!");
      return;
    }

    try {
      let response = await PostFetch(
        "register",
        {
          email: email,
          username: username,
          password: password
        },
        null
      );
      if(response.ok) {
        alert("Registration successfully!");
        router.push("/");
      }
      else{
        alert("Registration failed, username or email existed");
      }
    } catch(error) {
      console.log("Error", error);
    }
  }

  return(
    <UnprotectedLayout>
      <div className="flex flex-col border rounded m-auto w-[350px] p-5 gap-3">
        <h2 className="text-red-800 text-center">Registration</h2>
        <input
          className="rounded p-1 text-black focus:outline-none"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          className="rounded p-1 text-black focus:outline-none"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <input
          className="rounded p-1 text-black focus:outline-none"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <input
          className="rounded p-1 text-black focus:outline-none"
          type="password"
          placeholder="Re-enter your password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.currentTarget.value)}
        />
        <button 
          className="flex border rounded p-2 w-[150px] justify-center self-center bg-red-500 hover:bg-red-800"
          onClick={registerClick}
        >Verify</button>
      </div>
    </UnprotectedLayout>
  )
}