interface VideoProps {
    link?: string,
}

const Video: React.FC<VideoProps> = ({link}) => {
    
    return (
        <iframe
            className="w-full h-[25rem] md:h-[82%]"
            src={link}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    )
}

export default Video
