"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { DeviceSettings } from "@stream-io/video-react-sdk";
import { Button } from "./ui/button";

const MeetingSetup = ( {setIsSetupComplete}:{setIsSetupComplete: (value: boolean)=>void}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error(
      "Call not found. Please ensure you are in a valid call context."
    );
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-grey-950">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center gap-2 font-medium">
          <input
            type="checkbox"
            name="toggle"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Join with Camera and MIc off.
        </label>
        <DeviceSettings />
      </div>
      <Button className="rounded-md bg-green-500 px-4 py-2.5" onClick={() =>{
        call.join();
        setIsSetupComplete(true);
      }}>
        Join Meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
