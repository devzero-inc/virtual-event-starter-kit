import Video from "./Video";
import Footer from "./Footer";
import ChatContent from "./ChatContent";

const RoomContent = () => {
  return (
    <div className='bg-cus-purple-light flex flex-col md:flex-row h-full'>
      <div className=" w-full md:w-[75%] flex flex-col">
        <Video link="https://www.youtube.com/embed/MwfGGeNox_s" />
        <Footer />
      </div>
      <div className="flex flex-col flex-1 p-5 text-white">
        <ChatContent/>
      </div>
    </div>
  )
}

export default RoomContent
