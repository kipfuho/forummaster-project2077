import { Dispatch, SetStateAction } from "react";
import { UserSessionType } from "../type";
import { UserContext } from "./UserContext";

export type UserProviderProps = {
  userContext: [UserSessionType | null | undefined, Dispatch<SetStateAction<UserSessionType | null | undefined>>];
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