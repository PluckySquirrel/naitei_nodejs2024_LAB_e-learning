import 'reflect-metadata';
import { AppDataSource } from './repos/db';
import http from 'http';
import app from './server';
import session from 'express-session';

app.use(session({
  secret: process.env.JWT_SECRET || 'your-secret-key', 
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false 
  }
}));

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error: unknown) => {
    console.log('Error during Data Source initialization:', error);
  });

const server = http.createServer(app);
server.listen(3000, () => {
  console.log('Server is running on port', 3000);
});
