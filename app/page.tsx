import { Category } from "./components/Category";
import { Forum } from "./components/Forum";

export default function Home() {
  return (
    <main className="space-y-5">
      <input
        className="rounded bg-gray-500 w-full p-2 focus:outline-none focus:brightness-[110%]"
        placeholder="Quick search..."
      />
      <Category item={{name: "Announcement", path: "/categories/annoucement"}}>
        <Forum>Sites Rules, News & Annoucements</Forum>
      </Category>
      <Category item={{name: "Games", path: "/categories/games"}}>
        <Forum>Hot games</Forum>
        <Forum>New games</Forum>
      </Category>
      <Category item={{name: "Manga&Anime", path: "/categories/mangaanime"}}>
        <Forum>Hot</Forum>
        <Forum>New Animes</Forum>
        <Forum>New Mangas</Forum>
      </Category>
      <Category item={{name: "Market", path: "/categories/market"}}>
        <Forum>Buying</Forum>
        <Forum>Selling</Forum>
        <Forum>Trading</Forum>
      </Category>
      <Category item={{name: "Development", path: "/categories/development"}}>
        <Forum>Next.js</Forum>
        <Forum>Nodejs</Forum>
      </Category>
      <Category item={{name: "Discussion", path: "/categories/discussion"}}>
        <Forum>General Discussions</Forum>
      </Category>
      <Category item={{name: "Site Feedback", path: "/categories/feedback"}}>
        <Forum>Features Request</Forum>
        <Forum>Site problems</Forum>
      </Category>
    </main>
  );
}
