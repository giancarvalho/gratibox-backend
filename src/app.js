import express from 'express';
import cors from 'cors';
import signUp from './controllers/signUp';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.post('/sign-up', signUp);

export default app;
