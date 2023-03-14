import { Box, Button, useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Navbar from "scenes/navbar";

import DetailPage from "./DetailPage";
import DiscoverPage from "./DiscoverPage";

const ComunityPage = () => {
  const { communityId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const socket = io(process.env.PROXY);
  console.log(socket);

  socket.on("chat-message", (data) => {
    const messageList = document.getElementById("chat-messages");
    const li = document.createElement("li");
    li.textContent = data.message;
    messageList.appendChild(li);
  });
  function handleClick() {
    socket.emit("chat-message", "ahoj");
  }

  return (
    <Box>
      <Navbar />
      <Button onClick={handleClick}>ssss</Button>
      <Box
        width="100%"
        padding="0.75rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {!communityId ? <DiscoverPage /> : <DetailPage />}
      </Box>
    </Box>
  );
};

export default ComunityPage;
