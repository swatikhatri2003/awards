"use client";

import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import switchStyles from "../../actions/led-kiosk.module.css";

const cardSx = {
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
} as const;

function MoreVertIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function IconTrash() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11v6M14 11v6" strokeLinecap="round" />
    </svg>
  );
}

export function AdminNomineeCard(props: {
  name: string;
  categoryName: string;
  description?: string | null;
  photoSrc: string;
  approved: boolean;
  disabled?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onApprovedChange: (next: boolean) => void;
}) {
  const { name, categoryName, description, photoSrc, approved, disabled, onEdit, onDelete, onApprovedChange } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const initials = name.slice(0, 2).toUpperCase();

  const closeMenu = () => setAnchorEl(null);

  return (
    <Card sx={cardSx}>
      <CardHeader
        title={name}
        subheader={categoryName}
        titleTypographyProps={{
          fontWeight: 800,
          fontSize: "1rem",
          lineHeight: 1.3,
          sx: { display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
        }}
        subheaderTypographyProps={{ fontSize: "0.8rem" }}
        action={
          <>
            <IconButton
              aria-label={`Actions for ${name}`}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={closeMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  closeMenu();
                  onEdit();
                }}
              >
                <ListItemIcon>
                  <IconPencil />
                </ListItemIcon>
                <ListItemText>Edit nominee</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  closeMenu();
                  onDelete();
                }}
                disabled={disabled}
                sx={{ color: "error.main" }}
              >
                <ListItemIcon sx={{ color: "error.main" }}>
                  <IconTrash />
                </ListItemIcon>
                <ListItemText>Delete nominee</ListItemText>
              </MenuItem>
            </Menu>
          </>
        }
        sx={{ alignItems: "flex-start", "& .MuiCardHeader-action": { m: 0 } }}
      />
      {photoSrc ? (
        <CardMedia component="img" height="160" image={photoSrc} alt="" sx={{ objectFit: "cover" }} />
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
      <CardContent sx={{ flex: 1, pt: 1.5, pb: 2 }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: "3.6em",
          }}
        >
          {description?.trim() || "No description"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            mt: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Chip
            label={approved ? "Approved" : "Pending"}
            size="small"
            color={approved ? "success" : "warning"}
            variant="outlined"
          />
          <label
            className={switchStyles.adminApproveSwitch}
            title={approved ? "Unapprove nominee" : "Approve nominee"}
            style={{ margin: 0 }}
          >
            <input
              type="checkbox"
              role="switch"
              checked={approved}
              disabled={disabled}
              onChange={(e) => onApprovedChange(e.target.checked)}
              aria-label={approved ? `Unapprove ${name}` : `Approve ${name}`}
            />
            <span className={switchStyles.adminApproveTrack} aria-hidden />
          </label>
        </Box>
      </CardContent>
    </Card>
  );
}
