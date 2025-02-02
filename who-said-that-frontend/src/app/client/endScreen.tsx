import { SubmissionButton } from "@/app/client";
import { Schoolbell } from "next/font/google";
import React from "react";

// Load Schoolbell font
const schoolbell = Schoolbell({
  subsets: ["latin"],
  weight: "400"
});

const ClientEndScreen: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border-4 space-y-4 max-w-sm w-full">
          <p className={`text-gray-500 ${schoolbell.className} text-2xl text-center uppercase`}>That's it, go home.</p>

          <SubmissionButton
            text="But I don't wanna!"
            debounce={1000}
            handleLocalSubmit={() => {
              window.location.reload();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ClientEndScreen;
