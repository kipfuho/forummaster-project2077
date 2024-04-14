'use client'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/navigation';

function arrayFromNumber(size: number, page: number, totalPage: number) {
	let result = [], offset = Math.min(Math.floor((size - 1) / 2) + 1, Math.floor((totalPage - 1) / 2) + 1);
	for(let i = Math.max(2, page - offset); i < Math.max(page + size - offset, 2 + size); i++) {
		if(i >= totalPage) {
			break;
		}
		result.push(i);
	}
	return result;
}

// size: number of index button appear on pagination
// total page: total page needed to populate
// page: page index
export default function Pagination({ size, totalPage, page, link }: { size: number, totalPage: number, page: number, link: string }) {
	const items: number[] = arrayFromNumber(size - 2, page, totalPage);
	const router = useRouter();
	return(
		<>
			{totalPage > 1 &&
				<div className='flex items-center'>
					{page > 1 &&
						<button 
							className='rounded text-center block border border-gray-500 w-[5rem] h-[2rem] items-center m-1 hover:bg-gray-600'
							onClick={() => router.push(link + `${page - 1}`)}
						>
							<ChevronLeftIcon/>
							<span>Prev</span>
						</button>
					}
					<div className='flex rounded border border-gray-500 m-1 divide-x-[1px]'>
						<button 
							className={`block w-[2rem] h-[2rem] items-center hover:bg-gray-600 ${page == 1 && "border-b-2 border-b-red-700 text-red-700"}`} 
							onClick={() => router.push(link + "1")}
						>1</button>
						{items[0] > 2 && <span>...</span>}
						{items.map((item, index) => (
							<button 
								className={`block w-[2rem] h-[2rem] items-center hover:bg-gray-600 ${page == item && "border-b-2 border-b-red-700 text-red-700"}`} 
								key={index}
								onClick={() => router.push(link + item)}
							>{item}</button>
						))}
						{items[items.length - 1] < totalPage - 1 && <span>...</span>}
						<button 
							className={`block w-[2rem] h-[2rem] items-center hover:bg-gray-600 ${page == totalPage && "border-b-2 border-b-red-700 text-red-700"}`} 
							onClick={() => router.push(link + totalPage)}
						>{totalPage}</button>
					</div>
					{page < totalPage - 1 &&
						<button 
							className='rounded text-center block border border-gray-500 w-[5rem] h-[2rem] items-center m-1 hover:bg-gray-600'
							onClick={() => router.push(link + `${page + 1}`)}
						>
							<span>Next</span>
							<ChevronRightIcon/>
						</button>
					}
				</div>
			}
		</>
	)
}