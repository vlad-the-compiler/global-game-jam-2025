import React, { useState } from "react";
import { PlayerCreationPages } from "@/app/client";

const {NamePicker, ColorPicker, FacePicker, AccessoryPicker, WaitingCreationEnd} = PlayerCreationPages;

const PlayerCreationFlow: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [formData, setFormData] = useState<(string | number | null)[]>([null, null, null, null]);
  const [colorIndex, setColorIndex] = useState(-1);
  const [face, setFace] = useState('');

  const colors = [
    "bg-purple-400", // violet
    "bg-indigo-500", // purple
    "bg-blue-200", // blue
    "bg-blue-400", // turqoise
    "bg-green-400", // green
    "bg-yellow-200", // yellow
    "bg-yellow-400", // orange
    "bg-red-500", // red
    "bg-pink-400", // pink
  ];

  const faces = [
    "/face-placeholder.png",
    "/placeholder2.png",
    "/placeholder3.png",
    "/placeholder4.png",
    "/placeholder5.png",
    "/placeholder6.png",
    "/placeholder7.png",
    "/placeholder8.png",
    "/placeholder9.png",
  ];

  const handlePageSubmit = (data: string | number, pageIndex: number) => {
    setFormData(prevData => {
      const updatedData = [...prevData];
      updatedData[pageIndex] = data;
      if (pageIndex === 1) setColorIndex(data as number);
      if (pageIndex === 2) setFace(faces[data as number]);

      // If it's the last page, log the data after updating
      if (pageIndex === 3) {
        console.log("Player Creation Data:", updatedData);
      }

      return updatedData;
    });

    // Navigate to the next page after updating the data
    if (pageIndex < 4) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <NamePicker onSubmit={name => handlePageSubmit(name, 0)} />;
      case 2:
        return <ColorPicker onSubmit={colorIndex => handlePageSubmit(colorIndex, 1)} colors={colors} />;
      case 3:
        return <FacePicker onSubmit={faceIndex => handlePageSubmit(faceIndex, 2)} color={colors[colorIndex]}/>;
      case 4:
        return <AccessoryPicker onSubmit={accessoryIndex => handlePageSubmit(accessoryIndex, 3)} color={colors[colorIndex]} face={face} />;
      case 5:
        return <WaitingCreationEnd />;
      default:
        return null;
    }
  };

  return <>{renderPage()}</>;
};

export default PlayerCreationFlow;
