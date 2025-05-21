import { useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import ArtistComp from "../components/ArtistComp";


const Genres = () => {
    const genres = useAppSelector((state:RootState)=>state.albumMusic.genres);

  return (
    <div className="w-full h-full bg-primary overflow-y-auto scrollbar-custom px-16 pb-36 ">
      <div className="text-white text-3xl font-bold mb-3 px-5">
        <h1>Genres</h1>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center  xl:grid-cols-5 gap-6">
        {
            genres.map((item,index)=>(
                <ArtistComp item={item} index={index} />
            ))
        }
      </div>
    </div>
  )
}

export default Genres
