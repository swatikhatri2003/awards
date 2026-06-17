"use client";

import React from "react";
import NextLink from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";

type PublicEventCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  detailHref: string;
  live?: boolean;
};

export function PublicEventCard(props: PublicEventCardProps) {
  const { title, description, imageSrc, detailHref, live } = props;
  const initials = title.slice(0, 2).toUpperCase();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 12px 48px rgba(15, 23, 42, 0.1)",
        border: "1px solid rgba(15, 23, 42, 0.06)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 24px 64px rgba(37, 99, 235, 0.15)",
        },
      }}
    >
      <CardActionArea
        component={NextLink}
        href={detailHref}
        sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        {imageSrc ? (
          <CardMedia
            component="img"
            height="160"
            image={imageSrc}
            alt=""
            sx={{ objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              height: 160,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "rgba(37, 99, 235, 0.35)",
              background:
                "radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.12), transparent 50%), radial-gradient(circle at 80% 70%, rgba(14, 165, 233, 0.1), transparent 45%), #fff",
            }}
            aria-hidden
          >
            {initials}
          </Box>
        )}
        <CardContent sx={{ flex: 1, width: "100%" }}>
          <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 800, lineHeight: 1.3 }}>
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.5em",
            }}
          >
            {description || "No description"}
          </Typography>
          {live ? (
            <Chip label="Live" size="small" color="success" variant="outlined" sx={{ mt: 1.5 }} />
          ) : null}
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: "center" }}>
        <Button
          component={NextLink}
          href={detailHref}
          variant="contained"
          size="small"
          endIcon={
            <Box component="span" aria-hidden sx={{ transition: "transform 0.2s", ".MuiButton-root:hover &": { transform: "translateX(3px)" } }}>
              →
            </Box>
          }
          sx={{ borderRadius: 2, px: 2.5, py: 0.75, minWidth: 0 }}
        >
          View event
        </Button>
      </CardActions>
    </Card>
  );
}
