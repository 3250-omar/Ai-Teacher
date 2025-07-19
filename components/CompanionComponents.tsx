"use client";
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { CompanionComponentProps } from "@/types";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import Image from "next/image";
import soundWaves from "../constants/soundwaves.json";
import { useEffect, useRef, useState } from "react";
import { addToHistory } from "@/lib/actions/companion-action";

enum call {
  INACTIVE = "INACTIVE",
  ACTIVE = "ACTIVE",
  ENDED = "ENDED",
  CONNECTING = "CONNECTING",
}

const CompanionComponents = ({
  subject,
  topic,
  userName,
  userImage,
  name,
  style,
  voice,
  companionId,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<call>(call.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [isMuted, setIsMuted] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [lottieRef, isSpeaking]);
  useEffect(() => {
    const onCallStart = () => setCallStatus(call.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(call.ENDED);
      //addToHistory
      addToHistory(companionId);
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onMessage = (message: Message) => {
      console.log("message", message);
      if (message.type === "transcript" && message.transcriptType === "final") {
        const NewMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [NewMessage, ...prev]);
      }
    };
    const onError = (error: Error) => {
      console.error("Error occurred:", error);
      alert(`An error occurred: ${error.message}`);
      setCallStatus(call.INACTIVE);
    };
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
    };
  }, []);

  const handleStartCall = async () => {
    try {
      setCallStatus(call.CONNECTING);
      const assistantOverride = {
        variableValues: {
          subject,
          topic,
          style,
        },
        clientMessages: ["transcript"],
        serverMessages: [],
      };
      // Add timeout to prevent indefinite waiting
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Call connection timed out")), 30000); // 30 second timeout
      });

      await Promise.race([
        vapi.start(configureAssistant(voice, style), assistantOverride),
        timeoutPromise,
      ]);
    } catch (error) {
      console.error("Call start error:", error);

      // Handle specific VAPI errors
      if (error instanceof Error) {
        if (error.message.includes("room lookup timed out")) {
          alert(
            "Connection timeout. Please check your internet connection and try again."
          );
        } else if (error.message.includes("VAPI token")) {
          alert("Configuration error. Please contact support.");
        } else {
          alert(`Call failed: ${error.message}`);
        }
      } else {
        alert("An unexpected error occurred. Please try again.");
      }

      setCallStatus(call.INACTIVE);
    }
  };
  const handleEndCall = async () => {
    setCallStatus(call.ENDED);
    vapi.stop();
    setMessages([]);
  };
  const toggleMic = () => {
    const Muted = vapi.isMuted();
    vapi.setMuted(!Muted);
    setIsMuted((prev) => !prev);
  };
  return (
    <section className="flex flex-col h-[70vh]">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="companion-section">
          <div
            className="companion-avatar"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === call.INACTIVE || callStatus === call.ENDED
                  ? "opacity-100"
                  : "opacity-0",
                callStatus === call.CONNECTING && "opacity-100 animate-pulse"
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>
            <div
              className={cn(
                "absolute transition-opacity duration-1000",
                callStatus === call.ACTIVE ? "opacity-100" : "opacity-0"
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundWaves}
                autoPlay={false}
                className="companion-lottie"
              />
            </div>
          </div>
          <p className="font-bold text-2xl">{name}</p>
        </div>
        <div className="user-section">
          <div className="user-avatar">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="font-bold text-2xl ">{userName}</p>
          </div>
          <button
            className="btn-mic"
            onClick={toggleMic}
            disabled={callStatus !== call.ACTIVE}
          >
            <Image
              src={isMuted ? "/icons/mic-off.svg" : "/icons/mic-on.svg"}
              alt={isMuted ? "mic-off" : "mic-on"}
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? "Turn on mic" : "Turn off mic"}
            </p>
          </button>
          <button
            className={cn(
              "rounded-lg py-2 cursor-pointer transition-colors w-full text-white",
              callStatus === call.ACTIVE ? "bg-red-700" : "bg-primary",
              callStatus === call.CONNECTING && "animate-pulse"
            )}
            onClick={() => {
              if (callStatus === call.ACTIVE) {
                handleEndCall();
              } else {
                handleStartCall();
              }
            }}
          >
            {callStatus === call.ACTIVE
              ? "End Session"
              : callStatus === call.CONNECTING
              ? "Connecting"
              : "Start Session"}
          </button>
        </div>
      </section>
      <section className="transcript">
        <div className="transcript-message no-scrollbar">
          {messages?.map((message, idx) => {
            if (message.role === "assistant") {
              return (
                <p key={idx} className="max-sm:text-sm">
                  {name.split(" ")[0]} :{message.content}
                </p>
              );
            } else {
              return (
                <p key={idx} className="text-primary max-sm:text-sm">
                  {userName} : {message.content}
                </p>
              );
            }
          })}
        </div>
        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CompanionComponents;
