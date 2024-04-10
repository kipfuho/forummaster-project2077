'use server'
import CategoryBody from "./CategoryBody";
import { CategoryDocument, ForumDocument } from "@/app/page";
import ForumList from "./ForumList";
import { getForumV2 } from "@/app/components/utils/fetch/v2/forum";

async function getForums(ids: string[]) {
  let promises: any = [];
  ids.forEach(forumId => {
    promises.push(getForumV2(forumId));
  });
  return await Promise.all(promises);
}

// Category component
// This appear in home page
export default async function Category({category}: {category: CategoryDocument}) {
  const forums: ForumDocument[] = await getForums(category.forums);
  return(
    <CategoryBody category={category}>
      <ForumList forums={forums}/>
    </CategoryBody>
  )
}