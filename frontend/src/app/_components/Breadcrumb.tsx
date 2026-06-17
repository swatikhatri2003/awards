"use client";

import React from "react";
import NextLink from "next/link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export type BreadcrumbItem =
  | { label: string; href: string }
  | { label: string; onClick: () => void }
  | { label: string };

function isLinkItem(item: BreadcrumbItem): item is { label: string; href: string } {
  return "href" in item;
}

function isButtonItem(item: BreadcrumbItem): item is { label: string; onClick: () => void } {
  return "onClick" in item;
}

export function Breadcrumb(props: { items: BreadcrumbItem[]; className?: string }) {
  const { items, className } = props;
  if (items.length === 0) return null;

  return (
    <Box className={className}>
      <Breadcrumbs aria-label="breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const key = `${item.label}-${index}`;

          if (isLast) {
            return (
              <Typography key={key} sx={{ color: "text.primary" }} noWrap title={item.label}>
                {item.label}
              </Typography>
            );
          }

          if (isLinkItem(item)) {
            return (
              <Link
                key={key}
                component={NextLink}
                href={item.href}
                underline="hover"
                color="inherit"
              >
                {item.label}
              </Link>
            );
          }

          if (isButtonItem(item)) {
            return (
              <Link
                key={key}
                component="button"
                type="button"
                underline="hover"
                color="inherit"
                onClick={item.onClick}
                sx={{
                  background: "none",
                  border: 0,
                  cursor: "pointer",
                  font: "inherit",
                  p: 0,
                }}
              >
                {item.label}
              </Link>
            );
          }

          return (
            <Typography key={key} color="inherit">
              {item.label}
            </Typography>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
