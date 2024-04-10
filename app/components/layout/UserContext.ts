import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { UserSessionType } from "../type";

export const UserContext = createContext<[UserSessionType | null | undefined, Dispatch<SetStateAction<UserSessionType | null | undefined>>] | undefined>(
  undefined
);

export function useUserContext(): [UserSessionType | null | undefined, Dispatch<SetStateAction<UserSessionType | null | undefined>>] {
  const userContext = useContext(UserContext);
	if(userContext === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return userContext;
}