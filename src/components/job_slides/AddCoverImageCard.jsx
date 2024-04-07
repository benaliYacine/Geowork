import React, { useRef, useEffect } from "react";
import { Image } from "lucide-react";
import DeleteImageButton from "@/components/job_slides/DeleteImageButton";

const AddCoverImageCard = ({ imageUrl = null, onAdd, onDelete }) => {
  const fileInputRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      const newImageUrl = URL.createObjectURL(file);
      onAdd(newImageUrl); // Notify parent component of new image
    }
    e.target.value = null;
  };

  const handleClick = () => {
    if (!imageUrl) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className={`relative w-[516px] h-60 rounded-3xl cursor-pointer flex flex-col items-center justify-center py-12 gap-4 m-2 ${
        imageUrl
          ? "border-none"
          : "transition duration-300 ease-in-out transform hover:scale-[103%] bg-secondaryo border border-dashed border-primary"
      }`}
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
      }}
      onClick={handleClick}
    >
      {!imageUrl && (
        <div className="text-secondary text-xl font-medium font-sans capitalize leading-tight flex flex-col gap-3 items-center">
          <Image className="h-20 w-20" />
          click to browse
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        style={{ display: "none" }}
        accept="image/*"
      />
      {imageUrl && (
        <div className="absolute top-2 right-2">
          <DeleteImageButton onDelete={onDelete} />
        </div>
      )}
    </div>
  );
};

export default AddCoverImageCard;
