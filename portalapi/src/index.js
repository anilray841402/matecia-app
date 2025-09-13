import { server } from './app.js'; // Import server instead of app
import connectDB from './db/index.js';

const PORT = process.env.PORT || 4000;

connectDB()
.then(() => {
    // Use server.listen() instead of app.listen()
    server.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server is running on port ${PORT}`);
        console.log(`📡 Socket.io endpoint: http://localhost:${PORT}/socket.io/`);
    })
})
.catch((err) => {
    console.log('❌ MongoDB connection error:', err);
    process.exit(1);
});