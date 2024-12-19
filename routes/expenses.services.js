const path = require('path');
const fs = require('fs/promises');

async function getData() {
  const rawData = await fs.readFile(newPath, 'utf-8');
  const data = await JSON.parse(rawData);

  return data;
}

const newPath = path.join(__dirname, '..', 'expense.json');

const getExpense = async (req, res) => {
  const data = await getData();

  res.json(data);
};

const createExpense = async (req, res) => {
  const { catagory, price, ammount } = req.body;

  if (!catagory || !price || !ammount)
    return res
      .status(400)
      .json({ message: 'catagory price and ammount is requierd' });

  const data = await getData();
  const lastId = data[data.length - 1]?.id || 0;
  const newExpense = {
    id: lastId + 1,
    catagory,
    price,
    ammount,
  };

  data.push(newExpense);

  await fs.writeFile(newPath, JSON.stringify(data));

  return res.status(201).json({ message: 'added new expense' });
};

const deleteExpense = async (req, res) => {
  const data = await getData();
  const id = req.params.id;
  const index = data.findIndex((el) => {
    return el.id === Number(id);
  });

  if (index === -1)
    return res.status(400).json({ message: 'id does not match' });

  data.splice(index, 1);

  await fs.writeFile(newPath, JSON.stringify(data));

  return res.status(200).json({ message: 'deleted succesfuly' });
};

const editExpense = async (req, res) => {
  const id = req.params.id;
  const data = await getData();
  const index = data.findIndex((el) => el.id === Number(id));

  if (index === -1)
    return res.status(400).json({ message: 'element not found' });

  const { category, price, amount } = req.body;

  if (category) data[index].catagory = category;
  if (price) data[index].price = price;
  if (amount) data[index].amount = amount;

  // console.log(data);

  await fs.writeFile(newPath, JSON.stringify(data));

  return res.status(200).json({ message: 'updated succesfuly' });
};

module.exports = { getExpense, createExpense, deleteExpense, editExpense };
