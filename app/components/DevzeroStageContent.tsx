"use client";

import Video from "./Video";
import Footer from "./Footer";
import ScheduleCard from "./ScheduleCard";
import { useEffect, useState } from "react";
import {schedule} from "@/app/domain/schedule";
import { getEvents } from "@/http/api";

const DevzeroStageContent = () => {
  const [schedule, setSchedule] = useState<schedule[]>([]);

  useEffect(() => {
    getEvents()
      .then((data) => {
        const eventArray:schedule[] = data.events;
        const filteredArray:schedule[] = eventArray.filter((ele: schedule) => {
          return ele.event_type === "DevZero Stage";
        });
        setSchedule(filteredArray);
      });
  }, []);

  return (
    <div className="bg-cus-purple-light flex flex-col md:flex-row h-full">
      <div className=" w-full md:w-[75%] flex flex-col">
        <Video link="https://www.youtube.com/embed/mdB7utqqT4Y?autoplay=1" />
        <Footer />
      </div>
      <div className="flex flex-col flex-1 h-full overflow-auto pb-5 text-white">
        <h1 className="text-2xl text-white font-bold ml-5 mb-6 mt-5">
          Schedule
        </h1>
        <div className=" w-full flex flex-col gap-6 items-center px-6">
          {schedule.map((ele) => (
            <ScheduleCard
              key={ele.event_id}
              time={ele.event_timing}
              title={ele.event_title}
              speaker={ele.speakers.speaker_name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevzeroStageContent;
