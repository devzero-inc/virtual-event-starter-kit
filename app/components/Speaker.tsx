import Image from "next/image";

interface SpeakerProps {
  name: string,
  image: string,
  position: string,
}

const Speaker: React.FC<SpeakerProps> = ({ name, image, position }) => {
  return (
    <div className=" border border-cus-purple-light rounded-xl overflow-hidden">
      <Image
        src={`https://randomuser.me/api/portraits/men/${image}.jpg`}
        alt="Logo"
        width={200}
        height={200}
      />
      <div className=" m-4">
        <h1 className="font-bold text-lg">{name}</h1>
        <p className=" text-gray-500">{position}</p>
      </div>
    </div>
  )
}

export default Speaker
