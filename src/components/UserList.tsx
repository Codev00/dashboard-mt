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
   const [data, setData] = useState<UserType[]>([]);
   useLayoutEffect(() => {
      if (users) {
         setIsLoading(false);
         setData(users);
      }
   }, [users]);

   const hasMore = page < 9;

   return (
      <Suspense fallback={null}>
         {
            <Table
               aria-label="Example table with client side sorting"
               bottomContent={
                  hasMore && !isLoading ? (
                     <div className="flex w-full justify-center">
                        <Button
                           isDisabled={isLoading}
                           variant="ghost"
                           color="warning"
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
                  items={data}
                  isLoading={isLoading}
                  loadingContent={<Spinner label="Loading..." />}
               >
                  {(item) => (
                     <TableRow key={item?._id}>
                        <TableCell>
                           <span className="text-xl">{item.displayName}</span>
                        </TableCell>
                        <TableCell>
                           {item.premium === true ? (
                              <Chip variant="dot" color="success" radius="full">
                                 Premium
                              </Chip>
                           ) : (
                              <Chip
                                 variant="dot"
                                 color="secondary"
                                 radius="full"
                              >
                                 Free
                              </Chip>
                           )}
                        </TableCell>
                        <TableCell>
                           {dayjs(item.createdAt).format("DD-MM-YYYY")}
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         }
      </Suspense>
   );
}
