'use client';
import {
  Pagination,
  PaginationItem,
  PaginationProps,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function LinkPagination({
  rootPath = '/',
  ...props
}: PaginationProps & {
  rootPath?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const handleChange = useCallback((e: React.ChangeEvent<unknown>, page: number) => {
    router.push(`${rootPath}?page=${page}`);
  }, []);

  return (
    <Pagination
      page={Number(params.get('page')) || 1}
      onChange={handleChange}
      {...props}
    />
  )
}
