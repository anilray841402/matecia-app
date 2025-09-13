import app from './app.js'
import connectDB from './db/index.js';

const PORT = process.env.PORT || 4000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on port number ${PORT}`);
    })
})
.catch((err) => {
    console.log('mongo db connection error', err);
    process.exit(1);
});


