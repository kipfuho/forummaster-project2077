
// Forum pages
export default function Forum({ params } : {params: {forumName:string}}){
  return(
    <main>
      <h2>{params.forumName}</h2>
      <a className="border p-2 float-right" href="/forums/site-rules-news-annoucement.2/post-thread">
        Post thread
      </a>
    </main>
  )
}