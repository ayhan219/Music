import { useState } from "react"
import ExploreItem from "../components/ExploreItem"


const Explore = () => {

    const [colors] = useState<string[]>([
        "#A30B37",
        "#CCFF66",
        "#004385",
        "#F6F4D2",
        "#8CDFD6",
        "#D90368",
        "#1F01B9",
        "#053225"
    ])
    const [names] = useState<string[]>([
        "Musics",
        "Poadcasts",
        "Live",
        "New",
        "Education",
        "Comedy",
        "Lists",
        "Pop"
    ])
  return (
    
    <div className="w-full h-screen bg-primary">
        <div className="p-16">
        <div className="w-full text-primary font-bold font-mono text-2xl">
            <h1>Explore All</h1>
        </div>
        <div className="grid grid-cols-4 space-y-8 pt-10">
            {
                colors.map((color,index)=>(
                    <ExploreItem color={color} name={names[index]} />
                ))
            }
            
        </div>
        </div>
    </div>
  )
}

export default Explore
