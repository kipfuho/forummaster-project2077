import { Dispatch, SetStateAction } from "react"
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

export default function ImageModalContextProvider({contextValue, children}: ImageModalProviderProps) {
	return(
		<ImageModalContext.Provider value={contextValue}>
			{children}
		</ImageModalContext.Provider>
	)
}