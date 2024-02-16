import UserEntry from "./UserEntry";

const LiveStageContent = () => {
  return (
    <div className="bg-cus-purple flex flex-col gap-8 items-center justify-center h-full text-white">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className=" text-4xl">
          Welcome to <span className="font-bold">Dev</span>Zero
          <span className="text-transparent bg-clip-text bg-text-gradient font-bold text-6xl">
            &nbsp;LIVE&nbsp;
          </span>
          Stage
        </h1>
        <p className=" w-[40rem] text-center text-gray-400">
          Engage in real-time dialogue and collaborate with professionals. Join
          the conversation and share insights on the latest in development and
          technology.
        </p>
      </div>

      <UserEntry />
    </div>
  );
};

export default LiveStageContent;
