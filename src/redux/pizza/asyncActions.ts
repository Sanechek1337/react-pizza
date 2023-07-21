import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchPizzaParams } from "./slice";
import { Pizza } from "./types";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "users/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://64932246428c3d2035d1632a.mockapi.io/pizzasData/pizzas?page=${currentPage}&limit=4&sortBy=${sortBy}&order=${order}${category}${search}`,
    );
    return data;
  },
);
