import React, { Suspense } from "react";
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
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { UserType } from "@/types/user.type";

export default function UserList({ users }: { users: UserType[] | null }) {
   const [page, setPage] = React.useState(1);
   const [isLoading, setIsLoading] = React.useState(true);

   const hasMore = page < 9;

   return (
      <Suspense>
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
                  <TableRow>
                     <TableCell>dasda</TableCell>
                     <TableCell>dasda</TableCell>
                     <TableCell>dasda</TableCell>
                  </TableRow>
               </TableBody>
            </Table>
         )}
      </Suspense>
   );
}
