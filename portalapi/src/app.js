import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import authRouters from "./routes/user.routes.js";
import healthCheckRouter from "./routes/healthcheck.routes.js";
import exhibitorRouters from "./routes/exhibitor.routes.js";
import operationRouters from "./routes/operation.routes.js";
import accountRouter from "./routes/account.routes.js";
import adminRouter from "./routes/admin.routes.js";

dotenv.config({
  path: "./.env",
});

const app = express();

// Create HTTP server FIRST
const server = createServer(app);

// Initialize Socket.io with the server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }
});

// Add a test route to verify socket.io is working
app.get('/socket-test', (req, res) => {
  res.json({ 
    message: 'Socket.io server is running!',
    socketPath: '/socket.io/',
    timestamp: new Date()
  });
});

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());

// Make io available in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('✅ User connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`👥 User ${userId} joined room ${userId}`);
    
    // Send confirmation back to client
    socket.emit('joined', { userId, roomId: userId });
  });

  socket.on('sendNotification', (data) => {
    const { userId, message, type } = data;
    console.log(`📤 Sending notification to user ${userId}: ${message}`);
    
    io.to(userId).emit('notification', {
      message,
      type,
      timestamp: new Date(),
      id: Date.now()
    });
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ User disconnected:', socket.id, 'Reason:', reason);
  });
});

// Routes
app.use("/healthcheck", healthCheckRouter);
app.use("/api/v1/users", authRouters);
app.use("/api/v1/exhibitors", exhibitorRouters);
app.use("/api/v1/operation", operationRouters);
app.use("/api/v1/account", accountRouter);
app.use("/api/v1/admin", adminRouter);

// Export server instead of app
export { app, server, io };