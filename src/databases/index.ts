import { DB_URL } from '@config';

export const dbConnection = {
  url: DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};

// url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
