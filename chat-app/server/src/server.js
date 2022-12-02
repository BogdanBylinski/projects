const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const Middleware = require("./middleware");
const connectDB = require("./config/db");
const admin = require("./config/firebase.config");
const getUsersByIds = require("./controllers/getDocs");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 3333;
app.use(express.json());
app.use(cors());
// app.use(Middleware.decodeToken);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// const getUserFromFireStore = async (req) => {
//   const db = admin.firestore();
//   return db
//     .collection("users")
//     .doc("" + req.user.uid)
//     .get()
//     .then(function (doc) {
//       return doc.data().following;
//     })
//     .then(async (ids) => {
//       console.log(ids);
//       let data = await getUsersByIds(ids);
//       console.log(data, "dataaaaaaaaaaaaaaa");
//       return data;
//     });
// };
// const search = async (req) => {
//   console.log(req);
//   try {
//     let array = [];
//     // const users = admin.firestore().collection("users");
//     let users = admin.firestore().collection("users");

//     const snapshot = await users.where("uid", "==", req.trim()).get();
//     if (snapshot.empty) {
//       console.log("No matching documents.");
//       return [];
//     } else {
//       snapshot.forEach(async (doc) => {
//         console.log(doc);
//         const newData = doc.data();
//         array.push(newData);
//       });

//       return array;
//     }
//   } catch (e) {}
// };
// // const search2 = async (email) => {
// //   console.log(email);
// //   try {
// //     const userByEmail = await admin.auth().getUserByEmail(email);
// //     return { ...userByEmail };
// //   } catch (e) {
// //     console.log(e);
// //   }
// // };

// app.get("/search", async (req, res) => {
//   const data = await search(req.headers.input);
//   return res.json(data);
// });
// app.get("/getUser", async (req, res) => {
//   const data = await getUserFromFireStore(req);
//   console.log(data);

//   return res.json(data);
// });

const server = app.listen(port, () => {
  console.log(
    port.brightMagenta.bold,
    `server is running in ${port}`.brightMagenta.bold
  );
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("user_left", (room) => {
    console.log("user left");
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.to(chat._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
