'use client'

import { Dispatch, SetStateAction } from "react";

// Simple Color picker for Text editer
export default function FontSizePicker({ onChangeHidden, leftAnchor, topAnchor, isHidden} : {onChangeHidden : Dispatch<SetStateAction<boolean>>, leftAnchor : number, topAnchor : number, isHidden : boolean}) {
	const formatDoc = (cmd : string, value : string) => {
    document.execCommand(cmd, false, value);
  }

	const getFontSize = (size: string) => {
		formatDoc("fontsize", size);
		onChangeHidden(true);
  };
	
	return(
		<div 
      className="border inline-block absolute bg-gray-700" 
			style={{left: leftAnchor, top: topAnchor, display: isHidden ? "none" : ""}}
    >
      <div className="flex flex-col">
				<button 
					className="py-1 px-4 hover:bg-gray-600"
					onClick={() => getFontSize("1")}
				>8</button>
				<button 
					className="py-1 px-4 hover:bg-gray-600"
					onClick={() => getFontSize("2")}
				>10</button>
				<button 
					className="py-1 px-4 hover:bg-gray-600"
					onClick={() => getFontSize("3")}
				>12</button>
				<button 
					className="py-1 px-4 hover:bg-gray-600"
					onClick={() => getFontSize("4")}
				>14</button>
				<button 
					className="py-1 px-4 hover:bg-gray-600"
					onClick={() => getFontSize("5")}
				>18</button>
				<button 
					className="py-1 px-4 hover:bg-gray-600"
					onClick={() => getFontSize("6")}
				>24</button>
				<button 
					className="py-1 px-4 hover:bg-gray-600"
					onClick={() => getFontSize("7")}
				>36</button>
			</div>
		</div>
	)
}