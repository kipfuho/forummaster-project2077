import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function QuickNavigation() {
  return(
    <div className="w-[25%] space-y-2">
      <h3>
        <FormatListBulletedIcon/>
        <span>Quick navigation</span>
      </h3>
      <div className='flex flex-col gap-1'>
        <a className="text-red-800 hover:underline hover:brightness-[150%]" href="https://github.com/kipfuho">Github</a>
        <a className="text-red-800 hover:underline hover:brightness-[150%]" href="https://www.facebook.com/kip.nguyen.33/">Facebook</a>
      </div>
    </div>
  )
}