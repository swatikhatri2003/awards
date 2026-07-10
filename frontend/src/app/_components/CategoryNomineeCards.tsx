"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type NomineeCardProps = {
  name: string;
  photoSrc: string;
  votes?: number;
  fallbackImage: string;
};

export function NomineeCard(props: NomineeCardProps) {
  const { name, photoSrc, votes, fallbackImage } = props;

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: 2,
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="120"
        image={photoSrc || fallbackImage}
        alt=""
        sx={{ objectFit: "cover", bgcolor: "#e2e8f0" }}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = fallbackImage;
        }}
      />
      <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Typography variant="subtitle2" component="div" noWrap title={name} sx={{ fontWeight: 700 }}>
          {name}
        </Typography>
        {typeof votes === "number" ? (
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
            {votes} {votes === 1 ? "vote" : "votes"}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
}

type CategoryGroupProps = {
  name: string;
  nomineeCount?: number;
  meta?: string;
  children: React.ReactNode;
};

function categoryMetaLabel(meta: string | undefined, nomineeCount: number | undefined): string | null {
  if (meta) return meta;
  if (typeof nomineeCount === "number") {
    return `${nomineeCount} ${nomineeCount === 1 ? "nominee" : "nominees"}`;
  }
  return null;
}

function CategoryGroupHeader(props: Pick<CategoryGroupProps, "name" | "nomineeCount" | "meta">) {
  const metaLabel = categoryMetaLabel(props.meta, props.nomineeCount);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 1.5,
        mb: 2,
      }}
    >
      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
        {props.name}
      </Typography>
      {metaLabel ? (
        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
          {metaLabel}
        </Typography>
      ) : null}
    </Box>
  );
}

export function CategoryGroupsPanel(props: { children: React.ReactNode }) {
  return (
    <Card variant="outlined" sx={{ bgcolor: "background.paper" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5,
          "& > section + section": {
            pt: 2.5,
            borderTop: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        {props.children}
      </CardContent>
    </Card>
  );
}

export function CategorySection(props: CategoryGroupProps) {
  const { name, nomineeCount, meta, children } = props;

  return (
    <Box component="section">
      <CategoryGroupHeader name={name} nomineeCount={nomineeCount} meta={meta} />
      {children}
    </Box>
  );
}

/** @deprecated Prefer CategoryGroupsPanel + CategorySection for grouped layouts */
export function CategoryCard(props: CategoryGroupProps) {
  const { name, nomineeCount, meta, children } = props;

  return (
    <Card variant="outlined" sx={{ bgcolor: "background.paper" }}>
      <CardContent>
        <CategoryGroupHeader name={name} nomineeCount={nomineeCount} meta={meta} />
        {children}
      </CardContent>
    </Card>
  );
}

export function NomineeCardGrid(props: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 1.5,
      }}
    >
      {props.children}
    </Box>
  );
}
