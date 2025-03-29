import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { setPlaylistMusic } from "../features/UserSlice";

interface CreatePlaylistProps {
  setOpenCreatePlaylist: (value: boolean) => void;
}

const CreatePlaylist = ({ setOpenCreatePlaylist }: CreatePlaylistProps) => {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [playlistName, setPlaylistName] = useState<string>("");
  const [playlistDescription, setPlaylistDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleCreatePlaylist = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/music/createplaylist",
        {
          user_id: user.id,
          playlist_name: playlistName,
          playlist_description: playlistDescription,
        }
      );
      dispatch(setPlaylistMusic(response.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpenCreatePlaylist(false);
    }
  };
  return (
    <div className="inset-0 fixed z-[1000] bg-black/80 flex items-center justify-center">
      <div className="w-[450px] h-[500px] bg-[#1F1F22] rounded-xl p-6 flex flex-col justify-evenly">
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-white text-2xl font-semibold">Create Playlist</h2>
          <IoMdCloseCircle
            className="text-white cursor-pointer text-2xl"
            onClick={() => setOpenCreatePlaylist(false)}
          />
        </div>

        <div className="w-full mb-4">
          <label className="text-white text-sm mb-2 block">Playlist Name</label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPlaylistName(e.target.value)
            }
            type="text"
            placeholder="Enter playlist name"
            className="w-full p-3 bg-[#282828] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          />
        </div>

        <div className="w-full mb-4">
          <label className="text-white text-sm mb-2 block">Description</label>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setPlaylistDescription(e.target.value)
            }
            placeholder="Enter playlist description (optional)"
            className="w-full p-3 bg-[#282828] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
          />
        </div>

        <div className="flex justify-between items-center mt-4 gap-2">
          <button
            onClick={() => setOpenCreatePlaylist(false)}
            className="w-1/2 p-3 cursor-pointer bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePlaylist}
            disabled={loading}
            className={`w-1/2 p-3 cursor-pointer text-white rounded-lg flex items-center justify-center gap-2 ${
              loading
                ? "bg-[#1AA34A] cursor-not-allowed opacity-75"
                : "bg-[#1DB954] hover:bg-[#1AA34A]"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Create Playlist"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;
