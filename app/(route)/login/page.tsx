import KeyIcon from '@mui/icons-material/Key';

// Login page
export default function Login(){
  return (
    <main>
      <form 
        className="border rounded shadow-md shadow-white w-[350px] m-auto p-5 space-y-4"
      >
        <h2 className='text-center text-red-800'>Login</h2>
        <div>
          <p>Enter your username</p>
          <input
            className="w-full text-center"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <p>Enter your password</p>
          <input 
            className="w-full text-center"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex justify-center">
          <button className="flex justify-center border rounded w-[150px] bg-red-500 hover:bg-red-800 p-2 gap-x-2">
            <KeyIcon/>
            <span>Login</span>
          </button>
        </div>
	    </form>
    </main>
  )
}