import * as mongoose from 'mongoose';

export const createMongoConnection = async (uri: string): Promise<mongoose.Mongoose> => {
    try {
        const connection = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Mongo DB connected successfully');
        return connection;
    } catch (e) {
        console.error(new Error(`Mongo DB connection error: ${e.message}`));
    }
};
