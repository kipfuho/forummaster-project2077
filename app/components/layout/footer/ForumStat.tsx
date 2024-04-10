'use server'
import BarChartIcon from '@mui/icons-material/BarChart';
import { getMetadata } from '../../utils/fetch/v1/category';

export default async function ForumStat() {
	const metadata = await getMetadata();
  return(
    <div className="w-[25%] space-y-2">
      <h3>
        <BarChartIcon/>
        <span>Forum Statistics</span>
      </h3>
      <div className='flex flex-col'>
        <div className='flex justify-between'>
          <span>Threads:</span>
          <span className='pr-5'>{metadata[0]}</span>
        </div>
        <div className='flex justify-between'>
          <span>Messages:</span>
          <span className='pr-5'>{metadata[1]}</span>
        </div>
        <div className='flex justify-between'>
          <span>Members:</span>
          <span className='pr-5'>{metadata[2]}</span>
        </div>
        <div className='flex justify-between'>
          <span>Lastest member:</span>
          <span className='pr-5'>{metadata[3]}</span>
        </div>
      </div>
    </div>
  )
}