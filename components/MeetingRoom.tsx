import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
} from "@stream-io/video-react-sdk";
import { SpeakerLayout } from "@stream-io/video-react-sdk";
import React, { use } from "react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import Loader from "./Loader";
import { CallingState } from "@stream-io/video-react-sdk";

type CallLayoutType = "speaker-left" | "speaker-right" | "grid";



const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const [layout, setlayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setshowParticipants] = useState(false);
  const{useCallCallingState} = useCallStateHooks();
  const router = useRouter();

  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="realtive h-screen w-full overflow-hidden pt-4 text-grey-950">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList
            onClose={() => {
              setshowParticipants(false);
            }}
          />
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={()=>{
          router.push('/');
        }} />

        <DropdownMenu>

            <div className="flex items-center">

          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-slate-300 px-4 py-2 hover:bg-gray-100">
            <LayoutList size={20} className="text-gray-950"/>
          </DropdownMenuTrigger>
            </div>


          <DropdownMenuContent className="border-gray-200 bg-white text-gray-950">
          {['Grid','Speaker-left','Speaker-right'].map((item,index)=>(
            <div key={index}>
                <DropdownMenuItem className="cursor-pointer"
                onClick={()=>{
                  setlayout(item.toLowerCase().replace("-", "_") as CallLayoutType);
                }}>
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-gray-200"/>
            </div>
          ))}

            
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button onClick={() => setshowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-slate-300 px-4 py-2 hover:bg-gray-100">
            <Users  size={20} className="text-gray-950"/>
          </div>
        </button>
        {!isPersonalRoom && <EndCallButton />}
      </div>
    </section>
  );
};

export default MeetingRoom;
