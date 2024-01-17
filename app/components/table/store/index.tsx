"use client";

import { PropsWithChildren, createContext, useReducer } from "react";
import Reducer from "./reducer";

export const TableContext = createContext({});

const initialState = {
  data: [],
};

const TableContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <TableContext.Provider value={[state, dispatch]}>
      {children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
