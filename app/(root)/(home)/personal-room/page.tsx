"use client";
import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h1 className="text-base font-medium text-grey-950 lg:text-xl xl:min-w-32">
      {title}
    </h1>
    <h1 className="truncate text-sm font-bold max-sm:max-w-[32px] lg:text-xl">
      {description}
    </h1>
  </div>
);

const PersonalRoom = () => {
  const { user } = useUser();
  const meetingId = user?.id;
  const client = useStreamVideoClient();
  const router = useRouter();
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const {call} = useGetCallById(meetingId!);
  const startRoom = async () => {
    if(!client || !user) return;
    if(!call){
      const newCall = client.call("default", meetingId!);
      
      await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
          },
        });
    }
    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className="flex size-full flex-col gap-10 text-grey-950">
      <h1 className="text-3xl font-bold">Personal Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table
          title="Meeting Id"
          description={`${meetingId!}'s Meeting Room`}
        />
        <Table
          title="Invite Link"
          description={`${meetingLink}'s Meeting Room`}
        />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-400" onClick={startRoom}>
          StartMeeting
        </Button>
        <Button
          className="bg-slate-400"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Copied to clipboard");
          }}
        >
          Copy Link
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
