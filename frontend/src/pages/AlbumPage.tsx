import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchbarArea from "../components/SearchbarArea";
import { ImMusic } from "react-icons/im";
import Music from "../components/Music";


interface AlbumMusic{
    artist:{
      name:string
    },
    album:{
      cover_medium:string
    }
    duration:number,
    id:number,
    md5_image:string,
    preview:string,
    rank:number,
    title:string,

}

const AlbumPage = () => {
  const { id } = useParams();
  const [albumMusic, setAlbumMusic] = useState<{
    title?: string;
    cover_xl?: string;
    duration:number,
    label:string,
    release_date:string,
    tracks?: { data: AlbumMusic[] };
  } | null>(null);

  const getDataFromId = async () => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${id}`
      );
      console.log(response.data);
      setAlbumMusic(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataFromId();
  }, []);

  return (
    <div className="w-full h-screen bg-primary">
      <SearchbarArea />
      <div className="w-full h-auto p-5 flex ">
        <div className="w-full h-[250px] flex  bg-stone-800  items-center gap-4 px-10 rounded-lg  relative ">
          <img className="w-[200px] h-[200px]" src={albumMusic?.cover_xl}  alt="" />
          <div className="text-primary font-bold font-mono flex flex-col gap-4">
            <h3>Open For Public</h3>
            <h1 className="text-3xl">{albumMusic?.title}</h1>
            <div>
            <p>Ayhan - {albumMusic?.tracks?.data.length} songs duration: {albumMusic?.duration ? (albumMusic.duration / 60).toFixed(0) : 0} hours</p>
            </div>
          </div>
          <div className="text-primary text-7xl">
            <ImMusic />
          </div>
        </div>
      </div>
      <div className="px-16 pt-4">
          <div className="w-full border-b border-gray-600">
          <h1 className="text-primary font-bold font-mono text-xl">Musics</h1>
          </div>
        </div>

      <div className="w-full h-[500px] px-14 pt-10 flex flex-col gap-3 overflow-y-auto scrollbar-hidden scrollbar-custom">

        {
          albumMusic?.tracks?.data.map((item:AlbumMusic)=>(
            <Music item={item}  />
          ))
        }
      </div>
    </div>
  );
};

export default AlbumPage;
