"use client"
import { useSearchParams } from 'next/navigation'
import { useRef, useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';

// type Props = {
//     title: string,
//     onClose: () => void,
//     onOk: () => void,
//     children: React.ReactNode,
// }

export default function DialogStartup({
  title,
  onClose,
  onOk,
  children,
  showDialog,
   
}) {
  //  const searchParams = useSearchParams()
  const dialogRef = useRef(null);
  //   const showDialog = searchParams.get('showDialog')

  useEffect(() => {
    // console.log("lokr")
    if (showDialog ) {
      dialogRef.current?.show();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

    const closeDialog = () => {
       
    dialogRef.current?.close();

        onClose();
       
  };

    const clickOk = () => {
      
        onOk();
         
    closeDialog();
  };

  const dialog = showDialog ? (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-10  rounded-xl backdrop:bg-gray-800/50 border-none"
    >
      <div className="w-[300px] sm:w-[500px] max-w-full bg-gray-200 flex flex-col overflow-hidden">
        <div className="flex flex-row justify-between   pt-2 px-5 ">
          <h1 className="text-2xl">{title}</h1>
          {/* <AiOutlineCloseCircle
              onClick={closeDialog}
              className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-10 h-10 font-bold  "
            /> */}
          {/* <button
              onClick={closeDialog}
              className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
            >
              x
            </button> */}
        </div>
        <div className="overflow-y-hidden max-h-full mx-6 mb-6">
          <div className="flex justify-center w-full">{children}</div>
        </div>
      </div>
    </dialog>
  ) : null;

  return dialog;
}