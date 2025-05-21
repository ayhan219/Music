import { useAppSelector } from "../app/hooks"
import { RootState } from "../app/store"
import RadioComp from "../components/RadioComp";


const Radios = () => {
    const radios = useAppSelector((state:RootState)=>state.albumMusic.radio);

  return (
    <div className="w-full h-full bg-primary overflow-y-auto scrollbar-custom px-16 pb-20 ">
      <div className="text-white text-3xl font-bold mb-3 px-5">
        <h1>Radios</h1>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center  xl:grid-cols-5 gap-6">
        {
            radios.map((item,index)=>(
                <RadioComp item={item} index={index} />
            ))
        }
      </div>
    </div>
  )
}

export default Radios
