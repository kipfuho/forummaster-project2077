

export default function Forum({ params } : {params: {forumName:string}}){
  return(
    <main>
      {params.forumName}
    </main>
  )
}