import KeyIcon from '@mui/icons-material/Key';

export default function Login(){
  return (
    <main className="h-full">
      <form 
        className="w-[350px] m-auto border p-3 shadow-md"
      >
        <div>
          <p>Enter your username</p>
          <input
            className="w-[300px] text-center"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <p>Enter your password</p>
          <input 
            className="w-[300px] text-center"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center">
          <button className="flex border p-2 w-[150px] justify-center bg-red-500 hover:bg-red-800">
            <KeyIcon/>
            <span>Login</span>
          </button>
        </div>
	    </form>
    </main>
  )
}