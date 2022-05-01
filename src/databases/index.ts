import { DB_HOST, DB_PORT, DB_DATABASE } from '@config';

export const dbConnection = {
  url: 'mongodb+srv://nthteam:nth123@cluster0.3vhvo.mongodb.net/shoes-shop?retryWrites=true&w=majority',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};

// url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
