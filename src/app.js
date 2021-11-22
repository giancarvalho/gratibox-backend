import express from 'express';
import cors from 'cors';
import signUp from './controllers/signUp.js';
import signIn from './controllers/signIn.js';
import getPlans from './controllers/getPlans.js';
import auth from './middlewares/auth.js';
import signToPlan from './controllers/signToPlan.js';
import getFormDetails from './controllers/getFormDetails.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/plans', auth);

app.post('/sign-in', signIn);
app.post('/sign-up', signUp);

app.post('/plans', signToPlan);
app.get('/plans', getPlans);

app.get('/form-details', auth, getFormDetails);

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

export default app;
