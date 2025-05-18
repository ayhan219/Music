

interface ExploreProps {
   color:string,
   name:string,
   index:number
}

const ExploreItem = ({color,name,index}:ExploreProps) => {
  return (
    <div key={index} style={{backgroundColor:color}} className={`w-[250px] md:w-[350px] h-[200px] rounded-lg  p-4 flex overflow-hidden justify-between cursor-pointer`}>
            <h3 className="text-primary text-2xl font-bold font-mono">{name}</h3>
            <img className="w-[200px] h-[150px] object-cover rotate-[35deg] ml-24 mt-10" src="https://rukminim2.flixcart.com/image/850/1000/l01blow0/poster/2/w/z/medium-music-wallpaper-on-fine-art-paper-theme-images-hd-original-imagbx2phbqcnzym.jpeg?q=90&crop=false" alt="" />
        </div>
  )
}

export default ExploreItem
