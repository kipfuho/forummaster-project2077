import Loading from "@/app/components/layout/Loading";
import { getUserV2 } from "@/app/components/utils/fetch/v2/user"
import { UserDocument } from "@/app/page";
import { Suspense } from "react";
import Profile from "../../component/Profile";
import ActivityTabs from "../../component/tabs/ActivityTabs";

export default async function Member({params}: {params: {memberId: string}}){
  const member: UserDocument | null = await getUserV2(params.memberId);
  if(member) {
    return(
      <Suspense fallback={<Loading/>}>
        <Profile member={member}/>
        <ActivityTabs member={member}/>
      </Suspense>
    )
  } else {
    return (
      <p>Something went wrong!</p>
    )
  }
}