'use client'
import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { ImageModalContext } from "./imageModalContext";

export type ImageModalProviderProps = {
  contextValue: [
		string | null, 
		Dispatch<SetStateAction<string | null>>, 
		boolean, 
		Dispatch<SetStateAction<boolean>>
	] | undefined;
  children: React.ReactNode;
};

export default function ImageModalContextProvider({children}: {children: ReactNode}) {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [openModal, setOpenModal] = useState<boolean>(false);
	return(
		<ImageModalContext.Provider value={[imageUrl, setImageUrl, openModal, setOpenModal]}>
			{children}
		</ImageModalContext.Provider>
	)
}