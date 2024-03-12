import SaveIcon from '@mui/icons-material/Save';
import AccountSideBar from './component/SideBar';

export default function Account(){
  return(
    <main>
      <div className="flex">
        <AccountSideBar/>
        <div className='ml-10 w-full'>
          <h2>Account details</h2>
          <div className='rounded bg-gray-700 w-full'>
            <table className='w-full'>
              <tbody>
                <tr>
                  <td className='px-2 py-3 text-right border-r-[1px] w-[45%]'>User name:</td>
                  <td className='px-2 py-3'>?</td>
                </tr>
                <tr>
                  <td className='px-2 py-3 text-right border-r-[1px]'>Email:</td>
                  <td className='px-2 py-3'>?</td>
                </tr>
                <tr>
                  <td className='px-2 py-3 text-right border-r-[1px]'>Avatar:</td>
                  <td className='px-2 py-3'>?</td>
                </tr>
                <tr>
                  <td className='px-2 py-3 text-right border-r-[1px]'>Date of birth:</td>
                  <td className='px-2 py-3'>?</td>
                </tr>
                <tr>
                  <td className='px-2 py-3 text-right border-r-[1px]'>Location:</td>
                  <td className='px-2 py-3'>?</td>
                </tr>
                <tr>
                  <td className='px-2 py-3 text-right border-r-[1px]'>About you:</td>
                  <td className='px-2 py-3'>?</td>
                </tr>
              </tbody>
            </table>
            <div className='flex justify-center p-2 border-t-[1px]'>
              <button className='flex rounded bg-red-700 px-4 py-1 gap-1'>
                <SaveIcon/>
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}