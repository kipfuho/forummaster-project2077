import { Dispatch, SetStateAction } from "react";
import { UserContext } from "./UserContext";
import { UserDocument } from "@/app/page";

export type UserProviderProps = {
  userContext: [UserDocument | null | undefined, Dispatch<SetStateAction<UserDocument | null | undefined>>];
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