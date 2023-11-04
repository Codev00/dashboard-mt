import tmdbConfig from "@/api/config/tmdb.config";
import mediaApi from "@/api/modules/media.api";
import { DeleteIcon } from "@/assets/images/DeleteIcon";
import { EditIcon } from "@/assets/images/EditIcon";
import { EyeIcon } from "@/assets/images/EyeIcon";
import {
   Chip,
   Image,
   Pagination,
   Spinner,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow,
   Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const columns = [
   { title: "Poster", id: 1 },
   { title: "Name", id: 2 },
   { title: "Action", id: 3 },
];

const ListMovie = () => {
   const router = useRouter();
   const [list, setList] = useState<any>([]);
   const [isLoading, setLoading] = useState(true);
   const [page, setPage] = React.useState(1);
   const rowsPerPage = 3;

   const pages = Math.ceil(list.length / rowsPerPage);

   const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      return list.slice(start, end);
   }, [page, list]);
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.listMovie();
         if (res) {
            setLoading(false);
            setList(res.reverse());
         }
         if (error) toast.error(error?.message);
      })();
   }, []);

   return (
      <div className="w-[580px] h-[600px]">
         <Table
            isStriped
            aria-label="Example empty table with custom cells client side sorting async pagination "
            color="secondary"
            classNames={{
               base: "max-h-[600px] overflow-hidden",
               table: "min-h-[600px]",
            }}
            bottomContent={
               <div className="flex w-full justify-center">
                  <Pagination
                     showControls
                     showShadow
                     radius="full"
                     color="secondary"
                     page={page}
                     total={pages}
                     initialPage={page}
                     onChange={(page) => setPage(page)}
                  />
               </div>
            }
         >
            <TableHeader columns={columns}>
               {(column) => (
                  <TableColumn key={column.id} align="start">
                     {column.title}
                  </TableColumn>
               )}
            </TableHeader>
            <TableBody
               isLoading={isLoading}
               loadingContent={<Spinner label="Loading..." />}
            >
               {items.reverse().map((item, index) => (
                  <TableRow key={index}>
                     <TableCell>
                        <Image
                           src={tmdbConfig.posterPath(item?.poster_path)}
                           width={100}
                           height={200}
                        />
                     </TableCell>
                     <TableCell>
                        <span>{item.name}</span>
                     </TableCell>
                     <TableCell>
                        <div className="relative flex items-center gap-2">
                           <Tooltip content="Details" color="warning">
                              <span
                                 className="text-2xl text-warning cursor-pointer active:opacity-50"
                                 onClick={() =>
                                    router.push(`/movie/${item?._id}`)
                                 }
                              >
                                 <EyeIcon />
                              </span>
                           </Tooltip>
                           <Tooltip content="Edit" color="secondary">
                              <span className="text-2xl text-secondary cursor-pointer active:opacity-50">
                                 <EditIcon />
                              </span>
                           </Tooltip>
                           <Tooltip color="danger" content="Delete">
                              <span className="text-2xl text-danger cursor-pointer active:opacity-50">
                                 <DeleteIcon />
                              </span>
                           </Tooltip>
                        </div>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
};

export default ListMovie;
