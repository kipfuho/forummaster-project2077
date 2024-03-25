import Category from "./(route)/categories/components/Category";
import { CategoryDataType } from "./components/type";

// Most categories and its forums
export const categoryData : CategoryDataType = {
  ["annoucement.1"] : {
    name: "Annoucement", 
    path: "/categories/annoucement.1", 
    category: "annoucement"
  },
  ["games.3"] : {
    name: "Games", 
    path: "/categories/games.3",
    category: "games"
  },
  ["manga-anime.6"] : {
    name: "Manga&Anime", 
    path: "/categories/manga-anime.6",
    category: "manga-anime"
  },
  ["market.10"] : {
    name: "Market", 
    path: "/categories/market.10",
    category: "market"
  },
  ["development.14"] : {
    name: "Development", 
    path: "/categories/development.14",
    category: "development"
  },
  ["discussion.17"] : {
    name: "Discussion", 
    path: "/categories/discussion.17",
    category: "discussion"
  },
  ["feedback.19"] : {
    name: "Site Feedback", 
    path: "/categories/feedback.19",
    category: "feedback"
  }
};

// Home page
export default async function Home() {
  return (
    <main className="space-y-5">
      <input
        className="rounded bg-gray-500 w-full p-2 focus:outline-none focus:brightness-[110%]"
        placeholder="Quick search..."
      />
      <Category 
        item={categoryData["annoucement.1"]}
      />
      <Category 
        item={categoryData["games.3"]}
      />
      <Category 
        item={categoryData["manga-anime.6"]}
      />
      <Category 
        item={categoryData["market.10"]}
      />
      <Category 
        item={categoryData["development.14"]}
      />
      <Category 
        item={categoryData["discussion.17"]}
      />
      <Category 
        item={categoryData["feedback.19"]}
      />
    </main>
  );
}
