import React, { Suspense, useLayoutEffect, useState } from "react";
import {
   Table,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   getKeyValue,
   Spinner,
   Button,
   Chip,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { UserType } from "@/types/user.type";
import dayjs from "dayjs";

export default function UserList({ users }: { users: UserType[] | null }) {
   const [page, setPage] = React.useState(1);
   const [isLoading, setIsLoading] = React.useState(true);

   useLayoutEffect(() => {
      if (users) {
         setIsLoading(false);
      }
   }, [users]);

   const hasMore = page < 9;

   return (
      <Suspense fallback={null}>
         {users && (
            <Table
               aria-label="Example table with client side sorting"
               bottomContent={
                  hasMore && !isLoading ? (
                     <div className="flex w-full justify-center">
                        <Button
                           isDisabled={isLoading}
                           variant="flat"
                           onPress={() => setPage(page + 1)}
                        >
                           {isLoading && <Spinner color="white" size="sm" />}
                           Load More
                        </Button>
                     </div>
                  ) : null
               }
               classNames={{
                  base: "max-h-[520px] overflow-hidden",
                  table: "min-h-[420px]",
               }}
            >
               <TableHeader>
                  <TableColumn key="username">Username</TableColumn>
                  <TableColumn key="status">Status</TableColumn>
                  <TableColumn key="date">Created date</TableColumn>
               </TableHeader>
               <TableBody
                  items={users}
                  isLoading={isLoading}
                  loadingContent={<Spinner label="Loading..." />}
               >
                  {(item) => (
                     <TableRow key={item?._id}>
                        <TableCell>{item.displayName}</TableCell>
                        <TableCell>
                           {item.status === true ? (
                              <Chip
                                 variant="bordered"
                                 color="success"
                                 radius="full"
                              >
                                 Online
                              </Chip>
                           ) : (
                              <Chip
                                 variant="bordered"
                                 color="default"
                                 radius="full"
                              >
                                 Offline
                              </Chip>
                           )}
                        </TableCell>
                        <TableCell>
                           {dayjs(item.createdAt).format("YYYY-MM-DD")}
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         )}
      </Suspense>
   );
}
