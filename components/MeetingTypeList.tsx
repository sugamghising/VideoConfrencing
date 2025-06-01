"use client";

import React, { use, useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import MeetingModal from "./MeetingModal";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast("Please select a date and time for the meeting.");
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Call creation failed");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "No description provided";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast("Meeting created successfully!");
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast("Failed to create meeting. Please try again.");
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`


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
          router.push('/recordings');
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

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          buttonText="Schedule Meeting"
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5 ">
            <label className="text-base text-normal leading-[22px] text-grey-950">
              Add a description
            </label>
            <Textarea
              className="border-none bg-slate-400 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-2.5 ">
            <label className="text-base text-normal leading-[22px] text-grey-950">
              Select a date and time
            </label>
            <ReactDatePicker
            selected={values.dateTime}
            onChange={(date)=>{
              setValues({...values,dateTime:date!})
          
            }}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat={"MMMM d, yyyy h:mm aa"}
            className="bg-slate-400 w-full rounded p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => {
            setMeetingState(undefined);
          }}
          title=" Meeting Created"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast('Link copied');
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Link"
        />
      )}

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

        <MeetingModal
        isOpen={meetingState === "isJoiningMeeting"}
        onClose={() => {
          setMeetingState(undefined);
        }}
        title="type the link to join Meeting"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={()=>{
          router.push('values.link')
        }}
      >
        <Input 
          placeholder="Meeting Link"
          className="border-none bg-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e)=>{
            setValues({...values,link:e.target.value})
          }}
        />
      </MeetingModal>

    </section>
  );
};

export default MeetingTypeList;
