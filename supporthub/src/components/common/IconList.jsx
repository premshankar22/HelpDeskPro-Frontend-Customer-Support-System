import { Box, IconButton, Tooltip } from "@mui/material";
import {
  Google,
  GitHub,
  Twitter,
  LinkedIn,
  Facebook,
} from "@mui/icons-material";

const icons = [
  { label: "Google", icon: <Google />, color: "#DB4437" },
  { label: "GitHub", icon: <GitHub />, color: "#000000" },
  { label: "X", icon: <Twitter />, color: "#1DA1F2" },
  { label: "LinkedIn", icon: <LinkedIn />, color: "#0A66C2" },
  { label: "Facebook", icon: <Facebook />, color: "#1877F2" },
];

export default function IconList() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 1.5,
        marginTop: 2,
      }}
    >
      {icons.map((item) => (
        <Tooltip key={item.label} title={item.label}>
          <IconButton
            sx={{
              color: item.color,
              backgroundColor: "#f5f5f5",
              "&:hover": {
                backgroundColor: "#eaeaea",
                transform: "scale(1.08)",
              },
              transition: "all 0.2s ease",
            }}
            aria-label={item.label}
          >
            {item.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}
