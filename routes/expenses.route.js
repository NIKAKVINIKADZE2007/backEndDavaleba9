const { Router } = require('express');
const {
  getExpense,
  deleteExpense,
  editExpense,
} = require('./expenses.services');
const { createExpense } = require('./expenses.services');
const hasKeyMiddlewear = require('../middleweares/hasKey.middlewar');
const useRouter = Router();

useRouter.get('/', getExpense);

useRouter.post('/', hasKeyMiddlewear, createExpense);

useRouter.delete('/:id', deleteExpense);

useRouter.put('/:id', editExpense);

module.exports = useRouter;
