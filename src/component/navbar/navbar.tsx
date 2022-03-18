import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TelegramIcon from "@mui/icons-material/Telegram";
export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ flexGrow: 3 }}>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <TelegramIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            News
          </Typography>
        </Box>

        <Box
          sx={{ flexGrow: 1, display: "flex", justifyContent: "space-around" }}
        >
          <Button color="inherit" href="/">
            Home
          </Button>

          <Button color="inherit" href="/editpost/:id">
            Edit
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }}></Box>
      </Toolbar>
    </AppBar>
  );
}
