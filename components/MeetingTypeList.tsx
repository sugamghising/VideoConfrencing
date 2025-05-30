"use client";

import React, { use, useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import MeetingModal from "./MeetingModal";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { toast } from "sonner";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const {user} =useUser();
  const client = useStreamVideoClient();
  const [values,setValues] = useState({
    dateTime: new Date(),
    description:'',
    link:''
  })

  const [callDetails, setCallDetails] = useState<Call>();


  const createMeeting = async () => {
    if(!client || !user) return;
    try{

      if(!values.dateTime){
        toast("Please select a date and time for the meeting.");
        return;
      }


      const id = crypto.randomUUID();
      const call= client.call('default',id);
      if(!call) throw new Error("Call creation failed");

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "No description provided";

      await call.getOrCreate({
        data:{
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })

      setCallDetails(call);

      if(!values.description){
        router.push(`/meeting/${call.id}`);
      }
      toast("Meeting created successfully!");

    }catch(error) {
      console.error("Error creating meeting:", error);
      toast("Failed to create meeting. Please try again.")
    }
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an instant meeting."
        handleClick={() => {
          setMeetingState("isInstantMeeting");
        }}
        className="orangeBackground"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Schedule Meeting"
        description="Plan a meeting for later."
        handleClick={() => {
          setMeetingState("isScheduleMeeting");
        }}
        className="blueBackground"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="Record Meeting"
        description="View your recorded meetings."
        handleClick={() => {
          setMeetingState("isJoiningMeeting");
        }}
        className="purpleBackground"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Join Meeting"
        description="Join a meeting with a link."
        handleClick={() => {
          router.push("/recordings");
        }}
        className="yellowBackground"
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title="Start Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
