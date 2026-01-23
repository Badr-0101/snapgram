/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useCallback } from 'react';
import { type FileWithPath, useDropzone } from 'react-dropzone';
import { Button } from '../Button';

type TfileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};
const FileUploader = ({ fieldChange, mediaUrl }: TfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg'],
    },
  });

  return (
    <div {...getRootProps()} className=" bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <div className="flex flex-col justify-center items-center w-full p-5 lg:p-10 ">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
            <p className="file_uploader-label">
              click or drag photo to replace
            </p>
          </div>
        </>
      ) : (
        <div className="file_uploader-box flex flex-center flex-col items-center">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file-upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag photo here
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG , PNG, JPGs</p>
          <Button className="shad-button_dark_4">Select from computer</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
