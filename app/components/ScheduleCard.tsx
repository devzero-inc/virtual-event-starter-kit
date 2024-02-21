interface ScheduleNewProps {
  time: string;
  title: string;
  speaker: string;
}

const ScheduleCard: React.FC<ScheduleNewProps> = ({ time, title, speaker }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {time && <h1>{time}</h1>}
      <div className=" border border-cus-text rounded-lg p-4 bg-cus-purple-light">
        <h1 className="font-bold text-lg">{title}</h1>
        <h1>{speaker}</h1>
      </div>
    </div>
  );
};

export default ScheduleCard;
