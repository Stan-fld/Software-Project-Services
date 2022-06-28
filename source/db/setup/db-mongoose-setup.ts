import mongoose from 'mongoose';

// connect mongoose to our mongodb database server
if (process.env.NODE_ENV === 'test') {
    mongoose.connect(process.env.host!, {});
} else {
    mongoose.connect(process.env.host!, {
        dbName: process.env.database
    });
}

export default mongoose;
