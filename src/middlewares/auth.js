import getTokenDataDB from '../queries/sessions/getTokenDataDB.js';

async function auth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) return res.sendStatus(401);

  const user = await getTokenDataDB(token);

  if (!user) return res.sendStatus(401);

  next();
}

export default auth;
