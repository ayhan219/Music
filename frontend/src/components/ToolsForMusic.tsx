
import { BsThreeDots } from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa'
import { VscArrowSwap } from 'react-icons/vsc'

const ToolsForMusic = () => {
  return (
    <div className="w-full h-32 px-6 flex items-center text-primary">
            <div className="w-full flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500">
                <FaPlay className="text-black" />
              </div>
              <div className="w-12 h-12 text-primary text-3xl flex items-center justify-center ">
                <VscArrowSwap />
              </div>
              <div className="w-20 h-8 rounded-lg border flex items-center justify-center">
                Follow
              </div>
              <div className="w-12 h-12 text-primary text-3xl flex items-center justify-center">
                <BsThreeDots />
              </div>
            </div>
          </div>
  )
}

export default ToolsForMusic
