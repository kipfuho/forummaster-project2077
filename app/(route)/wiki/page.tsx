import Image from "next/image";

// Wiki pages for games I play
export default function Wiki(){
  return(
  <div>
    <h2>List games</h2>
    <div className="flex gap-x-5">
      <a href="https://gamepress.gg/arknights/">
        <Image src="/arknights.jpg" width={100} height={100} alt="arknights img"/>
        <span className="flex justify-center">Arknights</span>
      </a>
      <a href="https://gamepress.gg/arknights/">
        <Image src="/arknights.jpg" width={100} height={100} alt="arknights img"/>
        <span className="flex justify-center">Arknights</span>
      </a>
      <a href="https://gamepress.gg/arknights/">
        <Image src="/arknights.jpg" width={100} height={100} alt="arknights img"/>
        <span className="flex justify-center">Arknights</span>
      </a>
    </div>
  </div>
  )
}