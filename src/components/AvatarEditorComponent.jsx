import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';

const AvatarEditorComponent = () => {
  const [image, setImage] = useState(''); // Initial image state
  const editorRef = useRef(null);

  const onSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const imageDataUrl = canvas.toDataURL();
      // You can then save the image data URL or process it further as needed
      console.log(imageDataUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Dropzone onDrop={(acceptedFiles) => setImage(URL.createObjectURL(acceptedFiles[0]))}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="w-full p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
            <input {...getInputProps()} />
            <p className="text-center text-gray-500">Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </Dropzone>
      {image && (
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={250}
          height={250}
          border={50}
          borderRadius={125}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1.2}
          rotate={0}
          className="my-4"
        />
      )}
      <button
        onClick={onSave}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
};

export default AvatarEditorComponent;
