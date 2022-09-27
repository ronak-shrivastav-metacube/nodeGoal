import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) => {
    try {
        const DATABASE_OPTIONS = {
            dbName : "crmdb"
        };
        await mongoose.connect(DATABASE_URL, DATABASE_OPTIONS);
        console.log("Database Connected!"); 
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;