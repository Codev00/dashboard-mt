import tmdbConfig from "@/api/config/tmdb.config";
import {
   Button,
   Modal,
   ModalBody,
   ModalContent,
   useDisclosure,
} from "@nextui-org/react";
import React from "react";

const PlayModal = ({
   children,
   link,
}: {
   children: React.ReactNode;
   link: string;
}) => {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   return (
      <>
         <div onClick={onOpen}>{children}</div>
         <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            motionProps={{
               variants: {
                  enter: {
                     y: 0,
                     opacity: 1,
                     transition: {
                        duration: 0.3,
                        ease: "easeOut",
                     },
                  },
                  exit: {
                     y: -20,
                     opacity: 0,
                     transition: {
                        duration: 0.2,
                        ease: "easeIn",
                     },
                  },
               },
            }}
            shadow="md"
            size="3xl"
            classNames={{
               body: "p-0 bg-transparent h-full w-full",
            }}
         >
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalBody>
                        <iframe
                           src={tmdbConfig.youtubePath(link)}
                           title="YouTube video player"
                           height={500}
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                           allowFullScreen
                        ></iframe>
                     </ModalBody>
                  </>
               )}
            </ModalContent>
         </Modal>
      </>
   );
};

export default PlayModal;
