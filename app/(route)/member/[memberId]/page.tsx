import Loading from "@/app/components/layout/Loading";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user"
import { UserDocument } from "@/app/page";
import { Suspense } from "react";
import Profile from "./component/Profile";
import ActivityTabs from "./component/tabs/ActivityTabs";

export default async function Member({params}: {params: {memberId: string}}){
  const user: UserDocument = await getUserV2(params.memberId);
  return(
    <Suspense fallback={<Loading/>}>
      <Profile user={user}/>
      <ActivityTabs user={user}/>
    </Suspense>
  )
}