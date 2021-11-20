function chooseRandom(list) {
  const item = list[Math.round(Math.random() * list.length)];

  return item;
}

export default chooseRandom;
