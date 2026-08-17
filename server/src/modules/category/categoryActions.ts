// Some data to make the trick

import type { RequestHandler } from "express";

// Import access to data :
import categoryRepository from "./categoryRepository";

// const categories = [
//   {
//     id: 1,
//     name: "ComedieNotInDatabase",
//   },
//   {
//     id: 2,
//     name: "Science-Fiction",
//   },
// ];

// Declare the actions

const browse: RequestHandler = async (req, res) => {
  const categoriesFromDB = await categoryRepository.readAll();

  res.json(categoriesFromDB);
};

const read: RequestHandler = async (req, res) => {
  const parsedId = Number.parseInt(req.params.id);
  const categoriesFromDB = await categoryRepository.readAll();
  const category = categoriesFromDB.find((c) => c.id === parsedId);

  if (category != null) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};

// Export them to import them somewhere else

export default { browse, read };
