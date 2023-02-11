import { Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box
      width={size}
      height={size}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {image ? (
        <img
          style={{ objectFit: "cover", borderRadius: "50%" }}
          width={size}
          height={size}
          alt="user"
          src={`http://localhost:3001/assets/${image}`}
        />
      ) : (
        <PersonIcon sx={{ fontSize: size }} />
      )}
    </Box>
  );
};

export default UserImage;
