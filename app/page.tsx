import { Category } from "./components/Category";
import { Forum } from "./components/Forum";

type Forum = {
  forumName: string;
  forumPath: string;
};

export type ForumCategory = {
  name: string;
  path: string;
  forums: Forum[]; // Array of Forum objects
};

// Make sure typescript read the key as string
type ForumCategories = {
  [key: string]: ForumCategory;
};

// Most categories and its forums
export const ForumCategories : ForumCategories = {
  ["annoucement.1"] : {
    name: "Annoucement", 
    path: "/categories/annoucement.1", 
    forums: [
      {
        forumName: "Sites Rules, News & Annoucements", 
        forumPath: "/forums/site-rules-news-annoucement.2"
      }
    ]
  },
  ["games.3"] : {
    name: "Games", 
    path: "/categories/games.3",
    forums: [
      {
        forumName: "Hot games", 
        forumPath: "/forums/hot-games.4"
      },
      {
        forumName: "New games", 
        forumPath: "/forums/new-games.5"
      }
    ]
  },
  ["mangaanime.6"] : {
    name: "Manga&Anime", 
    path: "/categories/mangaanime.6",
    forums: [
      {
        forumName: "Hot", 
        forumPath: "/forums/hot-anime-manga.7"
      },
      {
        forumName: "New Animes", 
        forumPath: "/forums/new-animes.8"
      },
      {
        forumName: "New Mangas", 
        forumPath: "/forums/new-mangas.9"
      }
    ]
  },
  ["market.10"] : {
    name: "Market", 
    path: "/categories/market.10",
    forums: [
      {
        forumName: "Buying", 
        forumPath: "/forums/buying.11"
      },
      {
        forumName: "Selling", 
        forumPath: "/forums/selling.12"
      },
      {
        forumName: "Trading", 
        forumPath: "/forums/trading.13"
      }
    ]
  },
  ["development.14"] : {
    name: "Development", 
    path: "/categories/development.14",
    forums: [
      {
        forumName: "Next.js", 
        forumPath: "/forums/nextjs.15"
      },
      {
        forumName: "Nodejs", 
        forumPath: "/forums/nodejs.16"
      }
    ]
  },
  ["discussion.17"] : {
    name: "Discussion", 
    path: "/categories/discussion.17",
    forums: [
      {
        forumName: "General Discussions", 
        forumPath: "/forums/discussions.18"
      }
    ]
  },
  ["feedback.19"] : {
    name: "Site Feedback", 
    path: "/categories/feedback.19",
    forums: [
      {
        forumName: "Features Request", 
        forumPath: "/forums/feature-requests.20"
      },
      {
        forumName: "Site problems", 
        forumPath: "/forums/site-problems.21"
      }
    ]
  }
};

// Home page
export default function Home() {
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
