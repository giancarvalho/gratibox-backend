function chooseRandom(list) {
  const item = list[Math.round(Math.random() * (list.length - 1))];

  return item;
}

export default chooseRandom;
