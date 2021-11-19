import insertUserDB from '../queries/insertUserDB';

async function signUp(req, res) {
  const userData = req.body;

  try {
    await insertUserDB(userData);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export default signUp;
