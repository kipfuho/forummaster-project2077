
// Register page
export default function Register(){
  return(
    <main>
      <form className="flex flex-col border rounded m-auto w-[350px] p-5 gap-3">
        <h2 className="text-red-800 text-center">Registration</h2>
        <input
          className="rounded p-1"
          type="text"
          placeholder="Enter your email"
        />
        <input
          className="rounded p-1"
          type="text"
          placeholder="Enter your username"
        />
        <input
          className="rounded p-1"
          type="text"
          placeholder="Enter your password"
        />
        <input
          className="rounded p-1"
          type="text"
          placeholder="Re-enter your password"
        />
        <button className="flex border rounded p-2 w-[150px] justify-center self-center bg-red-500 hover:bg-red-800">Verify</button>
      </form>
    </main>
  )
}