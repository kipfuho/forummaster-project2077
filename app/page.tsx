import Category from "./(route)/categories/components/Category";

export type ForumType = {
	id: number;
	category: string; 
	forum_name: string; 
	about: string;
	threads: number; 
	messages: number;
}

export type ForumCategoryType = {
  name: string;
  path: string;
  category: string;
};

// Make sure typescript read the key as string
type ForumCategories = {
  [key: string]: ForumCategoryType;
};

// Most categories and its forums
export const ForumCategories : ForumCategories = {
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
  ["mangaanime.6"] : {
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
        item={ForumCategories["annoucement.1"]}
      />
      <Category 
        item={ForumCategories["games.3"]}
      />
      <Category 
        item={ForumCategories["mangaanime.6"]}
      />
      <Category 
        item={ForumCategories["market.10"]}
      />
      <Category 
        item={ForumCategories["development.14"]}
      />
      <Category 
        item={ForumCategories["discussion.17"]}
      />
      <Category 
        item={ForumCategories["feedback.19"]}
      />
    </main>
  );
}
