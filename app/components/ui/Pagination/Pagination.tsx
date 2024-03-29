'use client'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function arrayFromNumber(size: number, totalPage: number) {
	let result = [];
	for(let i = 2; i < Math.min(2 + size, totalPage); i++) {
		result.push(i);
	}
	return result;
}

function populatePageIndex(page: number, items: number[], totalPage: number) {
	let res = [];
	// left most of middle
	if(page + 1 === items[0] && items[0] > 2) {
		for(let i = 0; i < items.length; i++) {
			res[i] = items[i] - 1;
		} // right most of middle
	} else if (page + 1 === items[items.length - 1] && items[items.length - 1] < totalPage - 1) {
		for(let i = 0; i < items.length; i++) {
			res[i] = items[i] + 1;
		} // first
	} else if (page == 0) {
		for(let i = 0; i < items.length; i++) {
			res[i] = i + 2;
		} // last
	} else if (page == totalPage - 1) {
		for(let i = 0; i < items.length; i++) {
			res[i] = totalPage + i - items.length;
		}
	}
	return res;
}

// size: number of index button appear on pagination
// total page: total page needed to populate
// page: page index
export default function Pagination({ size, totalPage, page, onPageChange }: { size: number, totalPage: number, page: number, onPageChange: Dispatch<SetStateAction<number>> }) {
	const [items, setItems] = useState<number[]>(arrayFromNumber(size - 2, totalPage));

	useEffect(() => {
		let t = populatePageIndex(page, items, totalPage);
		if(t.length > 0) {
			setItems(t);
		}
	}, [page]);

	return(
		<>
			{totalPage > 1 &&
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
						<button 
							className={`block w-[2rem] h-[2rem] items-center hover:bg-gray-600 ${page === 0 && "border-b-2 border-b-red-700 text-red-700"}`} 
							onClick={() => onPageChange(0)}
						>1</button>
						{items[0] > 2 && <span>...</span>}
						{items.map((item, index) => (
							<button 
								className={`block w-[2rem] h-[2rem] items-center hover:bg-gray-600 ${page === item - 1 && "border-b-2 border-b-red-700 text-red-700"}`} 
								key={index}
								onClick={() => onPageChange(item - 1)}
							>{item}</button>
						))}
						{items[items.length - 1] < totalPage - 1 && <span>...</span>}
						<button 
							className={`block w-[2rem] h-[2rem] items-center hover:bg-gray-600 ${page === totalPage - 1 && "border-b-2 border-b-red-700 text-red-700"}`} 
							onClick={() => onPageChange(totalPage - 1)}
						>{totalPage}</button>
					</div>
					{page < totalPage - 1 &&
						<button 
							className='rounded text-center block border border-gray-500 w-[5rem] h-[2rem] items-center m-1 hover:bg-gray-600'
							onClick={() => onPageChange((prev) => prev + 1)}
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