import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const ImageModalContext = createContext<[
  string | null, 
  Dispatch<SetStateAction<string | null>>, 
  boolean, 
  Dispatch<SetStateAction<boolean>>
] | undefined>(undefined);

export function useImageModalContext(): [
  string | null,
  Dispatch<SetStateAction<string | null>>,
  boolean, 
  Dispatch<SetStateAction<boolean>>
] {
  const imageModalContext = useContext(ImageModalContext);
	if(imageModalContext === undefined) {
    throw new Error('useImageModalContext must be used within a ImageModalContextProvider');
  }
  return imageModalContext;
}