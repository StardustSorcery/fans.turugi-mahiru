'use client';
import NextLink from "next/link";
import { NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, BreadcrumbsProps, Link, Typography } from "@mui/material";

export default function NewsBreadcrumbs({
  title,
  ...props
}: BreadcrumbsProps<
  any,
  {
    title: string;
  }
>) {
  return (
    <Breadcrumbs
      separator={<NavigateNext fontSize="small" />}
    >
      <Link
        component={NextLink}
        href="/news"
        color="inherit"
        underline="hover"
      >
        ニュース
      </Link>
      <Typography
        color="text.primary"
      >
        {title}
      </Typography>
    </Breadcrumbs>
  )
}
