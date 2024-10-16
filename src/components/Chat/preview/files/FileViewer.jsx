import React from 'react';
import { useSelector } from 'react-redux';
import PDF from './files/PDF.webp';
import TXT from './files/TXT.webp';
import PPTX from './files/PPTX.webp';
import DOCX from './files/DOCX.webp';

export default function FileViewer({activeIndex}) {
    const { files } = useSelector((state) => state.chat);

    
    const fileTypeToImage = {
        PDF: PDF,
        TXT: TXT,
        PPTX: PPTX,
        DOCX: DOCX
    };

    return (
        <div className='w-full mt-[200px] max-w-[60%]'>
            {/* Container */}
            <div className="flex justify-center items-center">
                {
                    files[activeIndex]?.type === "IMAGE" ? (
                        <img src={files[activeIndex].fileData} alt={files[activeIndex]?.file.name} className='max-w-[20rem] object-contain hview max-h-[10rem]' />
                    ) : files[activeIndex]?.type === "VIDEO" ? (
                        <video  src={files[activeIndex].fileData} controls className='hview max-w-[80%] object-contain' ></video>
                    ) : (
                        <div className='min-w-full py-2 hview flex flex-col items-center justify-center'>
                            {/* Use the mapped image based on file type */}
                            <img alt={files.name} src={fileTypeToImage[files[activeIndex].type]} width="100rem" />
                            {/* No Preview Text */}
                            <h1 className="dark:text-dark_text_2 text-2xl">
                                No Previews Available
                            </h1>
                            {/* Files Size */}
                            <span  className="dark:text-dark_text_2 ">
                                {files[activeIndex]?.file?.size} KB - {files[activeIndex]?.type}
                            </span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
