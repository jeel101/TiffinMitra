const express = require('express')
const env = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const CronJob = require('cron').CronJob;

const user = require('./routes/User');
const provider = require('./routes/provider');
const food = require('./routes/foods');
const order = require('./routes/order');
const address = require('./routes/address');
const review = require('./routes/review');
const initialData = require('./routes/initialData');

const foodModel = require('./models/food');
const Provider = require('./models/provider'); // <-- Required for update logic

const app = express();

env.config();

// CORS setup
const originsWhitelist = [
    'https://tiffin-managment-client.vercel.app',
    'http://localhost:3000'
];
const corsOptions = {
    origin: function (origin, callback) {
        const isWhitelisted = originsWhitelist.indexOf(origin) !== -1 || !origin;
        callback(null, isWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// MongoDB connection + update existing providers
mongoose.connect(process.env.MONGODB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log("Database Connected");

    // Update existing providers with new fields (if missing)
    await Provider.updateMany({}, {
        $set: {
            aadhaarNo: "",
            panNo: "",
            gstNo: ""
        }
    });
    console.log("Existing providers updated with aadhaarNo, panNo, and gstNo fields.");

}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});

// CRON job to update food quantities at midnight
const updateFood = async () => {
    const foods = await foodModel.find();
    for (let i = 0; i < foods.length; i++) {
        await foodModel.findByIdAndUpdate(foods[i]._id, { $set: { quantity: foods[i].enteredQuantity } });
    }
}
new CronJob('0 0 * * *', async () => {
    await updateFood();
}, null, true, 'Asia/Kolkata');

// Routes
app.get('/', (req, res) => {
    console.log("Server Is Running");
    res.send("Server is running");
});
app.use('/api/v1/user', user);
app.use('/api/v1/provider', provider);
app.use('/api/v1/food', food);
app.use('/api/v1/order', order);
app.use('/api/v1/address', address);
app.use('/api/v1/review', review);
app.use('/api/v1/initialData', initialData);

// Start server
app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});
