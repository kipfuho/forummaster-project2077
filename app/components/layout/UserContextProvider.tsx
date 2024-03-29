import { Dispatch, SetStateAction } from "react";
import { UserType } from "../type";
import { UserContext } from "./UserContext";

export type UserProviderProps = {
  userContext: [UserType | null | undefined, Dispatch<SetStateAction<UserType | null | undefined>>];
  children: React.ReactNode;
};

export default function UserProvider({
  userContext,
  children,
}: UserProviderProps) {
  return (
    <UserContext.Provider value={userContext}>
      {children}
    </UserContext.Provider>
  );
}