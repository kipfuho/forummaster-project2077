'use client'

import { Dispatch, MouseEventHandler, SetStateAction } from "react";

// Simple Color picker for Text editer
export default function ColorPicker({onChangeColor, onChangeHidden, leftAnchor, topAnchor, isHidden} : {onChangeColor : Dispatch<SetStateAction<string>>, onChangeHidden : Dispatch<SetStateAction<boolean>>, leftAnchor : number, topAnchor : number, isHidden : boolean}) {
  const getBackgroundColor = (e : Element) => {
    if (e) {
      onChangeColor(window.getComputedStyle(e).getPropertyValue("background-color"));
    }
    else {
      onChangeColor("#000000");
    }
  };

	return(
		<div 
      className="border p-1 inline-block absolute bg-gray-200" 
      style={{left: leftAnchor, top: topAnchor, display: isHidden ? "none" : ""}}
    >
			<div>
        <div>
          <span 
          className="hover:border bg-black inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border hover:border-red-500 bg-white inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-slate-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-gray-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-zinc-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
        </div>
        <div>
          <span 
          className="hover:border bg-neutral-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-stone-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-red-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-rose-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-orange-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
        </div>
        <div>
          <span 
          className="hover:border bg-amber-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-yellow-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-pink-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-fuchsia-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-purple-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
        </div>
        <div>
          <span 
          className="hover:border bg-violet-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-indigo-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-sky-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-cyan-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-blue-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
        </div>
        <div>
          <span 
          className="hover:border bg-green-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-emerald-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-teal-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
          <span 
          className="hover:border bg-lime-500 inline-block w-10 h-10"
          onClick={(e) => getBackgroundColor(e.currentTarget)}
          />
        </div>
      </div>
      <div className="flex">
        <input 
          className="px-2 w-[150px]"
          type="text"
          placeholder="HEX Color"
        />
        <div className="flex flex-grow justify-center">
          <button 
            className="border rounded bg-red-600 px-2"
            onClick={() => onChangeHidden(true)}
          >
            OK
          </button>
        </div>
      </div>
		</div>
	)
}