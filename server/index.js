import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { createServer } from "http";

//IMPORT ROUTES----------------
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import communityRoutes from "./routes/communities.js";
import categoryRoutes from "./routes/category.js";
import messageRoutes from "./routes/message.js";
import generalRoutes from "./routes/general.js";
import conversationRoutes from "./routes/conversation.js";
import notificationRoutes from "./routes/notifications.js";
//-----------------------------
import { createPost } from "./controllers/posts.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { editProfile } from "./controllers/users.js";

/* CONFIGURATION */
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
dotenv.config();
const app = express();

app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirName, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.post("/users/edit", verifyToken, upload.single("picture"), editProfile);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/community", communityRoutes);
app.use("/category", categoryRoutes);
app.use("/message", messageRoutes);
app.use("/general", generalRoutes);
app.use("/conversation", conversationRoutes);
app.use("/notification", notificationRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
const SOCET_PORT = 3002;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

/* SOCKET SERVER */
const server = createServer(app);
const io = new Server(server, { cors: "*" });

// List of connected users
let users = [];
let communityUsers = [];

// Event listener for new connection
io.on("connection", (socket) => {
  console.log(socket.id, "connected");

  // Event listener for new user joining
  socket.on("join", (data) => {
    const { userId, chatId } = data;
    if (chatId) {
      console.log("User joined community:", userId, chatId);
      communityUsers.push({
        id: socket.id,
        userId,
        chatId,
      });
    } else {
      console.log("User joined:", userId);
      users.push({ id: socket.id, userId });
      io.emit("getUsers", users);
    }
  });

  // Event listener for new message
  socket.on(
    "sendMessage",
    ({ senderId, receiverId, text, chatId, ...rest }) => {
      if (receiverId) {
        console.log(
          `Message received from ${senderId} to ${receiverId}: ${text}`
        );
        const user = users.find((u) => u.userId === receiverId);
        if (user) {
          io.to(user.id).emit("getMessage", {
            senderId,
            text,
            ...rest,
          });
        }
      } else {
        const filteredUsers = communityUsers
          .filter((cu) => {
            if (cu.userId === senderId) return false;
            if (cu.chatId !== chatId) return false;
            return cu;
          })
          .map((cu) => cu.id);
        io.to(filteredUsers).emit("getMessage", {
          senderId,
          text,
          ...rest,
        });
      }
    }
  );

  // Event listener for disconnection
  socket.on("disconnect", () => {
    console.log(socket.id, "disconnected");
    users = users.filter((user) => user.id !== socket.id);
    io.emit("getUsers", users);
  });
});

// Listen for incoming connections on port 3002
server.listen(SOCET_PORT, () => {
  console.log("Socket server listening on port 3002");
});
