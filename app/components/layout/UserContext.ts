import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { UserType } from "../type";

export const UserContext = createContext<[UserType | null | undefined, Dispatch<SetStateAction<UserType | null | undefined>>] | undefined>(
  undefined
);

export function useUserContext(): [UserType | null | undefined, Dispatch<SetStateAction<UserType | null | undefined>>] {
  const userContext = useContext(UserContext);
	if(userContext === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return userContext;
}