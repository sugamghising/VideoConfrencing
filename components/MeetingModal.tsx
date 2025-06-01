import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: React.ReactNode;
  handleClick?: () => void;
  buttonText: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-slate-300 px-6 py-9 text-gray-950">
        <div className="flex flex-col gap-6">
          {image &&(
            <div className="flex justify-center">
              <Image  src={image} width={72} height={72} alt="add-meeting"/>
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>{title}</h1>
          {children}
          <Button className="blueBackground focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}>
            {buttonIcon &&(
              <Image src={buttonIcon} width={13} height={13} alt="button icon"/>
            )} &nbsp;
            {buttonText || 'Schedulde Meeting'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
