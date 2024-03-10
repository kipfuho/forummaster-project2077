
export default function Register(){
  return(
    <main>
      <form className="flex flex-col m-auto w-[50vh] border p-3 gap-3">
        <h2>Registration form</h2>
        <input
          type="text"
          placeholder="Enter your email"
        />
        <input
          type="text"
          placeholder="Enter your username"
        />
        <input
          type="text"
          placeholder="Enter your password"
        />
        <input
          type="text"
          placeholder="Re-enter your password"
        />
        <button className="flex border p-2 w-[150px] justify-center bg-red-500 hover:bg-red-800">Verify</button>
      </form>
    </main>
  )
}