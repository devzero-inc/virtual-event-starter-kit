import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <div className=" flex-1 bg-cus-purple text-white flex justify-between items-center py-4 md:py-0 px-8">
            <h1 className="text-2xl font-bold">
                DevZero Stage
            </h1>
            <button className=" bg-white p-2 md:p-4 rounded-lg flex items-center gap-2 hover:bg-cus-purple-light  hover:text-white text-black font-semibold transition-all">
                <p>Join us on Github</p>
                <GitHubIcon/>
            </button>
        </div>
    )
}

export default Footer
