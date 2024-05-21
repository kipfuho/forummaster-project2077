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

/**
 * Custom pagination with Link
 * @param param.size: number of index button appear on pagination
 * @param param.totalPage: total page needed to populate
 * @param param.page: current page
 * @param param.link: link
 * @param param.query: query for link
 * @returns 
 */
export default function Pagination({
	size,
	totalPage,
	page,
	link,
	query
}: {
	size: number,
	totalPage:
	number,
	page: number,
	link: string,
	query?: string
}) {
	const items: number[] = arrayFromNumber(size - 2, page, totalPage);
	const router = useRouter();
	return(
		<>
			{totalPage > 1 &&
				<div className='flex items-center'>
					{page > 1 &&
						<button 
							className='rounded text-center block border border-gray-500 w-[5rem] h-[2rem] items-center m-1 hover:bg-gray-600'
							onClick={() => router.push(`${link}${page - 1}${query !== undefined ? `?${query}` : ''}`)}
						>
							<ChevronLeftIcon/>
							<span>Prev</span>
						</button>
					}
					<div className='flex rounded border border-gray-500 m-1 divide-x-[1px]'>
						<button 
							className={`block w-[2rem] h-[2rem] items-center hover:bg-gray-600 ${page == 1 && "border-b-2 border-b-red-700 text-red-700"}`} 
							onClick={() => router.push(`${link}1${query !== undefined ? `?${query}` : ''}`)}
						>1</button>
						{items[0] > 2 && <span>...</span>}
						{items.map((item, index) => (
							<button 
								className={`block w-[2rem] h-[2rem] items-center hover:bg-gray-600 ${page == item && "border-b-2 border-b-red-700 text-red-700"}`} 
								key={index}
								onClick={() => router.push(`${link}${item}${query !== undefined ? `?${query}` : ''}`)}
							>{item}</button>
						))}
						{items[items.length - 1] < totalPage - 1 && <span>...</span>}
						<button 
							className={`block w-[2rem] h-[2rem] items-center hover:bg-gray-600 ${page == totalPage && "border-b-2 border-b-red-700 text-red-700"}`} 
							onClick={() => router.push(`${link}${totalPage}${query !== undefined ? `?${query}` : ''}`)}
						>{totalPage}</button>
					</div>
					{page < totalPage - 1 &&
						<button 
							className='rounded text-center block border border-gray-500 w-[5rem] h-[2rem] items-center m-1 hover:bg-gray-600'
							onClick={() => router.push(`${link}${page + 1}${query !== undefined ? `?${query}` : ''}`)}
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