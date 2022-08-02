import mongoose from "mongoose";
import 'dotenv/config'

const DB_NAME2 = process.env.DB_NAME2;

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.1vxmmjy.mongodb.net/${DB_NAME2}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, 
    useUnifiedTopology: true 
    }
)
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.log(err));