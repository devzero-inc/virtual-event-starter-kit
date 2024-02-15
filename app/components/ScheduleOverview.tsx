import ScheduleCard from "./ScheduleCard";
import {schedule, timingMap} from "@/app/domain/schedule";

interface ScheduleOverviewProps {
  title: string;
  timings: timingMap;
}

const ScheduleOverview: React.FC<ScheduleOverviewProps> = ({
  title,
  timings,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0 md:items-start w-full border-t border-cus-purple-light px-8 py-6">
      <h1 className=" text-cus-text font-bold text-3xl w-64 text-center md:text-left">{title}</h1>
      <div className="flex flex-col md:flex-row gap-12 w-full md:w-fit">
        {Object.keys(timings).map((timing, index) => (
          <div key={index} className="flex flex-col items-center md:items-start gap-4 w-full md:w-fit">
            <h1>{timing}</h1>
            <div className="flex flex-col gap-4">
              {timings[timing].map((ele: schedule) => (
                <ScheduleCard
                  key={ele.event_id}
                  time=""
                  title={ele.event_title}
                  speaker={ele.speakers.speaker_name}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleOverview;
