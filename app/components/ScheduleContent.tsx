"use client";

import ScheduleOverview from "@/app/components/ScheduleOverview";
import { useEffect, useState } from "react";
import { schedule, timingMap } from "@/app/domain/schedule";
import { getEvents } from "@/http/api";

const ScheduleContent = () => {
  const [liveTimings, setLiveTimings] = useState<timingMap>({});
  const [devzeroTimings, setDevzeroTimings] = useState<timingMap>({});

  useEffect(() => {
    getEvents().then((data) => {
      const eventArray = data.events;
      const liveTimingMap: timingMap = {};
      const devzeroTimingMap: timingMap = {};

      eventArray.forEach((event: schedule) => {
        if (event.event_type === "Live Stage") {
          if (!liveTimingMap[event.event_timing]) {
            liveTimingMap[event.event_timing] = [];
          }
          liveTimingMap[event.event_timing].push(event);
        } else {
          if (!devzeroTimingMap[event.event_timing]) {
            devzeroTimingMap[event.event_timing] = [];
          }
          devzeroTimingMap[event.event_timing].push(event);
        }
      });
      setLiveTimings(liveTimingMap);
      setDevzeroTimings(devzeroTimingMap);
    });
  }, []);

  return (
    <div className="flex flex-col h-full overflow-auto bg-cus-purple text-white w-full gap-8">
      <div className="flex flex-col gap-2 items-center sm:items-start">
        <h1 className="font-bold text-4xl ml-8 mt-8">Schedule</h1>
        <p className=" mx-8 text-gray-400 text-center sm:text-left">
          Discover a diverse schedule of tech talks and hands-on workshops that
          stretch across the spectrum of modern technology. Our carefully
          curated lineup is crafted to provide deep insights into the latest
          trends and essential skills within the tech landscape, fostering a
          rich environment of knowledge exchange. Engage with industry pioneers
          and like-minded professionals in an interactive setting that
          encourages community building and professional development.
        </p>
      </div>
      {liveTimings && (
        <ScheduleOverview title="Live Stage" timings={liveTimings} />
      )}
      {devzeroTimings && (
        <ScheduleOverview title="Devzero Stage" timings={devzeroTimings} />
      )}
    </div>
  );
};

export default ScheduleContent;
