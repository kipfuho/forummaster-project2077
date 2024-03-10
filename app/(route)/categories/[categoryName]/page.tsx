
export default function Categories({ params } : {params : {categoryName : string}}){
  return(
    <main>{params.categoryName}</main>
  )
}