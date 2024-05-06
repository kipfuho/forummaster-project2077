import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { UserDocument } from "@/app/page";

export const UserContext = createContext<[UserDocument | null | undefined, Dispatch<SetStateAction<UserDocument | null | undefined>>] | undefined>(
  undefined
);

export function useUserContext(): [UserDocument | null | undefined, Dispatch<SetStateAction<UserDocument | null | undefined>>] {
  const userContext = useContext(UserContext);
	if(userContext === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return userContext;
}