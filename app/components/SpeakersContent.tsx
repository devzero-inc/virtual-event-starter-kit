"use client";

import Speaker from "@/app/components/Speaker";
import { useEffect, useState } from "react";
import { speaker } from "@/app/domain/speaker";
import { getSpeakers } from "@/http/api";

const SpeakersContent = () => {
  const [speakers, setSpeakers] = useState<speaker[]>([]);

  useEffect(() => {
    getSpeakers().then((data) => {
      setSpeakers(data.speakers);
    });
  }, []);

  return (
    <div className="flex flex-col h-full overflow-auto bg-cus-purple text-white w-full gap-8">
      <div className="flex flex-col gap-2 items-center sm:items-start">
        <h1 className="font-bold text-4xl ml-8 mt-8 ">Speakers</h1>
        <p className=" mx-8 text-gray-400 text-center sm:text-left">
          Meet the trailblazers behind our transformative sessions. Our
          speakers&apos; page showcases a lineup of esteemed professionals and
          visionary thinkers from across the tech industry, each bringing unique
          insights and stories to the stage. Get to know the experts, their
          backgrounds, and the topics they will be addressing. This is your
          opportunity to connect with the minds shaping the future of
          technology.
        </p>
      </div>
      <div className=" border-t border-cus-purple-light flex flex-col sm:flex-row flex-wrap items-center sm:items-start w-full gap-8 p-8 ">
        {speakers.map((ele, ind) => (
          <Speaker
            key={ele.id}
            name={`${ele.speaker_name}`}
            image={`${ind + 20}`}
            position={`${ele.position}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SpeakersContent;
