"use client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value,
}) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);
    return ( 
        <CldUploadWidget onUpload={handleUpload} 
            uploadPreset="etuk30ly"
            options={{
                maxFiles: 1,
            }}
        >
            {
                (({open}) => {
                    return (
                        <div className="
                        relative
                        cursor-pointer
                        hover:opacity-80
                        transition
                        border-dashed
                        border-2
                        border-neutral-300
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-4
                        text-neutral-600
                        p-20
                        " onClick={() => open?.()}>
                            <TbPhotoPlus size={50} />
                            <div className="text-lg font-medium">Click to upload</div>
                            {
                                value && (
                                    <div className="
                                    absolute
                                    inset-0
                                    w-full
                                    h-full
                                    ">
                                        <Image src={value} fill  alt="Upload"
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </CldUploadWidget>
     );
}
 
export default ImageUpload;