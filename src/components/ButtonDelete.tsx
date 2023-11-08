import React from "react";
import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Button,
   useDisclosure,
} from "@nextui-org/react";
import { DeleteIcon } from "@/assets/images/DeleteIcon";
import { log } from "console";

export default function ButtonDelete({ id }: { id: string | string[] }) {
   const { isOpen, onOpen, onOpenChange } = useDisclosure();
   const handleDelete = () => {
      try {
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <div onClick={onOpen}>
            <DeleteIcon />
         </div>

         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className="flex flex-col gap-1">
                        Accept Media
                     </ModalHeader>
                     <ModalBody>
                        <span>
                           Do you want to{" "}
                           <span className="text-red-600 font-bold">
                              DELETE
                           </span>{" "}
                           the video?
                        </span>
                     </ModalBody>
                     <ModalFooter>
                        <Button
                           color="primary"
                           variant="light"
                           onPress={onClose}
                        >
                           No
                        </Button>
                        <Button
                           variant="ghost"
                           color="danger"
                           onPress={onClose}
                        >
                           Delete
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>
      </>
   );
}
