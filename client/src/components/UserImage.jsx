import { Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import { getRequest } from "api";
import { api } from "api/routes";

const UserImage = ({ image, size = "60px", userId }) => {
  const [imgPath, setImgPath] = useState(null);

  useEffect(() => {
    async function getUser() {
      const request = await getRequest(api.users.getUserById(userId));
      if (request) setImgPath(request.picturePath);
    }
    if (userId) {
      getUser();
    } else {
      setImgPath(image);
    }
  }, [image, userId]);

  return (
    <Box
      width={size}
      height={size}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {imgPath ? (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`http://localhost:3001/assets/${imgPath}`}
        />
      ) : (
        <PersonIcon sx={{ fontSize: size }} />
      )}
    </Box>
  );
};

export default UserImage;
