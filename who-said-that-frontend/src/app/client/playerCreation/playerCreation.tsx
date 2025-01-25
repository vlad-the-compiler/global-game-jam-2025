import React, { useState } from "react";
import { NamePicker, ColorPicker, FacePicker, AccessoryPicker } from "@/app/client";

const PlayerCreationFlow: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [formData, setFormData] = useState<(string | number | null)[]>([null, null, null, null]);

  const handlePageSubmit = (data: string | number, pageIndex: number) => {
    setFormData((prevData) => {
      const updatedData = [...prevData];
      updatedData[pageIndex] = data;

      // If it's the last page, log the data after updating
      if (pageIndex === 3) {
        console.log("Player Creation Data:", updatedData);
      }

      return updatedData;
    });

    // Navigate to the next page after updating the data
    if (pageIndex < 3) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 1:
        return <NamePicker onSubmit={(name) => handlePageSubmit(name, 0)} />;
      case 2:
        return <ColorPicker onSubmit={(colorIndex) => handlePageSubmit(colorIndex, 1)} />;
      case 3:
        return <FacePicker onSubmit={(faceIndex) => handlePageSubmit(faceIndex, 2)} />;
      case 4:
        return <AccessoryPicker onSubmit={(accessoryIndex) => handlePageSubmit(accessoryIndex, 3)} />;
      default:
        return null;
    }
  };

  return <>{renderPage()}</>;
};

export default PlayerCreationFlow;
