"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"

export default function Trailer({ src }: { src:{youtube?:string;aparat?:string} }){
  const [player,setPlayer]=useState("youtube") 

  return(
    <>
      <div className="mb-4 flex justify-start items-center gap-x-2">
      	<Button className={`text-xl font-extrabold transition-all duration-300 ${player==="youtube" ? "bg-gradient-to-br from-orange-600 from-30% via-amber-600 to-orange-700 text-white" : "bg-gray-500 text-black"}`} onClick={()=>setPlayer("youtube")}>YouTube</Button>
      	<Button className={`text-xl font-extrabold transition-all duration-300 ${player==="aparat" ? "bg-gradient-to-br from-orange-600 from-30% via-amber-600 to-orange-700 text-white" : "bg-gray-500 text-black"}`} onClick={()=>setPlayer("aparat")}>Aparat</Button>
      </div>
  	  <iframe
        className="bg-black/50 w-[300px] h-[169px] min-[480px]:w-[400px] min-[480px]:h-[225px] sm:w-[560px] sm:h-[315px] md:w-[696px] md:h-[391.5px] lg:w-[960px] lg:h-[540px] xl:w-[1200px] xl:h-[675px] rounded-xl mx-auto mb-16 overflow-hidden"
        src={player==="youtube" ? src?.youtube : src?.aparat}
        title="video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </>
  )
}