'use client'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Dispatch, SetStateAction } from 'react';

function createArrayFromCount(count: number) {
	let result = [];
	for (let i = 0; i < count; i++) {
			result[i] = i + 1;
	}
	return result;
}

export default function Pagination({count, page, onPageChange}: {count: number, page: number, onPageChange: Dispatch<SetStateAction<number>>}) {
	const items = createArrayFromCount(count);
	return(
		<div className='flex items-center'>
			{page > 0 &&
				<button 
					className='rounded text-center block border border-gray-500 w-[5rem] h-[2rem] items-center m-1 hover:bg-gray-600'
					onClick={() => onPageChange((prev) => (prev > 0) ? (prev - 1) : 0)}
				>
					<ChevronLeftIcon/>
					<span>Prev</span>
				</button>
			}
			<div className='flex rounded border border-gray-500 m-1 divide-x-[1px]'>
				{items.map((item, index) => (
					<button 
						className={`block w-[2rem] h-[2rem] items-center hover:bg-gray-600 ${index === page && "border-b-2 border-b-red-700 text-red-700"}`} 
						key={index}
						onClick={() => onPageChange(index)}
					>{item}</button>
				))}
			</div>
			{page < count - 1 &&
				<button 
					className='rounded text-center block border border-gray-500 w-[5rem] h-[2rem] items-center m-1 hover:bg-gray-600'
					onClick={() => onPageChange((prev) => prev + 1)}
				>
					<span>Next</span>
					<ChevronRightIcon/>
				</button>
			}
		</div>
	)
}