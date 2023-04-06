import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cron from 'node-cron'
import adminAuth from './middlewares/adminAuth.js'
// import { sendEmail } from './utils/sendEmail.js'


// Models
import User from './models/User.js'
import UserInfo from './models/UserInfo.js'
import Journal from './models/Journal.js'
import TradeSummary from './models/TradeSummary.js'
import UserPost from './models/UserPost.js'

// Routes
import general from './routes/general.js'
import administrative from './routes/administrative.js'
import trades from './routes/trades.js'
import analysis from './routes/analysis.js'
import userPosts from './routes/posts.js'
import subscription from './routes/subscription.js'

// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 9000;

// Routes
app.use("/api/users", general)
app.use("/api/administrative", adminAuth, administrative)
app.use('/user-uploads', express.static('public'))
app.use('/trade-images', express.static('data/postImages'))
app.use('/api/trades', trades)
app.use('/api/analysis/', analysis)
app.use('/api/posts', userPosts)
app.use('/api/subscription', subscription)

// sendEmail('jaganrajcj7667@gmail.com', 'Subject', 'Content')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));

}).catch((error) => console.log(`${error} did not connect`))