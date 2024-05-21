import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { UserDocument } from "@/app/page";

/**
 * Context for current user
 * Help with client side
 */
export const UserContext = createContext<[
  UserDocument | null | undefined,
  Dispatch<SetStateAction<UserDocument | null | undefined>>
] | undefined>(
  undefined
);

/**
 * Hooks for User Context
 * @returns current User Context
 */
export function useUserContext(): [UserDocument | null | undefined, Dispatch<SetStateAction<UserDocument | null | undefined>>] {
  const userContext = useContext(UserContext);
	if(userContext === undefined) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return userContext;
}