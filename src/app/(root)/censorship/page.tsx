"use client";
import tmdbConfig from "@/api/config/tmdb.config";
import mediaApi from "@/api/modules/media.api";
import { DeleteIcon } from "@/assets/images/DeleteIcon";
import { EditIcon } from "@/assets/images/EditIcon";
import { EyeIcon } from "@/assets/images/EyeIcon";
import { MovieType } from "@/types/media.type";
import {
   Chip,
   Image,
   Input,
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

const Censorship = () => {
   const router = useRouter();
   const [list, setList] = useState<MovieType[]>([]);
   const [isLoading, setLoading] = useState(true);
   const [page, setPage] = useState(1);
   const rowsPerPage = 3;
   const [filterValue, setFilterValue] = useState("");
   const hasSearchFilter = Boolean(filterValue);

   const pages = Math.ceil(list.length / rowsPerPage);

   // const items = React.useMemo(() => {
   //    const start = (page - 1) * rowsPerPage;
   //    const end = start + rowsPerPage;
   //    return list.slice(start, end);
   // }, [page, list]);
   useEffect(() => {
      (async () => {
         const { res, error } = await mediaApi.listCensorship();

         if (res) {
            setLoading(false);
            setList(res.reverse());
         }
         if (error) toast.error(error?.message);
      })();
   }, []);
   const filteredItems = React.useMemo(() => {
      let filteredMovie = [...list];

      if (hasSearchFilter) {
         filteredMovie = filteredMovie.filter((movie) =>
            movie.name.toLowerCase().includes(filterValue.toLowerCase())
         );
      }

      return filteredMovie;
   }, [list, filterValue]);
   const onSearchChange = React.useCallback((value: any) => {
      if (value) {
         setFilterValue(value);
      } else {
         setFilterValue("");
      }
   }, []);
   const onClear = React.useCallback(() => {
      setFilterValue("");
   }, []);
   return (
      <div className="w-full h-[600px] flex gap-6">
         <Input
            isClearable
            className="w-[300px] sm:max-w-[44%] mb-5"
            placeholder="Search by name..."
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            variant="underlined"
         />
         <Table
            aria-label="Example empty table with custom cells client side sorting async pagination "
            color="secondary"
            radius="none"
            layout="fixed"
            shadow="lg"
            classNames={{
               base: "max-h-[600px] overflow-hidden",
               table: "min-h-[300px]",
            }}
            // bottomContent={
            //    <div className="flex w-full justify-center">
            //       <Pagination
            //          showControls
            //          showShadow
            //          radius="full"
            //          color="secondary"
            //          page={page}
            //          total={pages}
            //          initialPage={1}
            //          onChange={(page) => setPage(page)}
            //       />
            //    </div>
            // }
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
               emptyContent={"No media to display."}
            >
               {filteredItems.reverse().map((item, index) => (
                  <TableRow key={index}>
                     <TableCell>
                        <Image
                           src={tmdbConfig.posterPath(item?.poster_path)}
                           width={200}
                           height={300}
                           radius="none"
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
                                    router.push(`/censorship/${item?._id}`)
                                 }
                              >
                                 <EyeIcon />
                              </span>
                           </Tooltip>
                           {/* <Tooltip content="Edit" color="secondary">
                              <span className="text-2xl text-secondary cursor-pointer active:opacity-50">
                                 <EditIcon />
                              </span>
                           </Tooltip>
                           <Tooltip color="danger" content="Delete">
                              <span className="text-2xl text-danger cursor-pointer active:opacity-50">
                                 <DeleteIcon />
                              </span>
                           </Tooltip> */}
                        </div>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   );
};

export default Censorship;
