import { useNavigate } from "react-router-dom"

interface ArtistProps {
  item:{
      artist:{
        id:number,
        name:string,
        picture_big:string,
      }
  },
  index:number
}

const Artist = ({item,index}:ArtistProps) => {

  const navigate = useNavigate();


  return (
    <div onClick={()=>navigate(`/artist/${item.artist.id}`)}  key={index} className="w-[250px] h-[350px] p-4 hover:bg-[#252528] rounded-lg group cursor-pointer flex flex-col ">
        <div className="w-full h-[60%] rounded-full ">
            <img className="w-full h-full object-contain rounded-full" src={item.artist.picture_big} alt="" />
        </div>
        <div className="text-primary font-serif text-xl pt-4">
        <p>{item.artist.name}</p>
        <p className="text-xs text-gray-600">Artist</p>
      </div>
    </div>
  )
}

export default Artist
