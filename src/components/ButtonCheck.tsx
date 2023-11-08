import React from "react";
import { toast } from "react-toastify";
import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Button,
   useDisclosure,
} from "@nextui-org/react";
import mediaApi from "@/api/modules/media.api";
import { useRouter } from "next/navigation";

export default function ButtonCheck({ id }: { id: string | string[] }) {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const router = useRouter();
   const handleAccept = async () => {
      const { res, error } = await mediaApi.AcceptMovie({ id });
      if (res) {
         toast.success("Accept Movie to successfuly");
         router.push("/censorship");
      }
      if (error) toast.error(error.message);
   };
   return (
      <>
         <Button variant="ghost" color="primary" onPress={onOpen}>
            Accept Media
         </Button>
         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className="flex flex-col gap-1">
                        Accept Media
                     </ModalHeader>
                     <ModalBody>Do you agree to accept the video?</ModalBody>
                     <ModalFooter>
                        <Button
                           color="danger"
                           variant="light"
                           onPress={onClose}
                        >
                           Close
                        </Button>
                        <Button
                           color="primary"
                           onPress={onClose}
                           onClick={handleAccept}
                        >
                           Accept
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>
      </>
   );
}
