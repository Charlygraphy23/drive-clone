"use client";

import { Dispatch, PropsWithChildren, createContext, useReducer } from "react";
import Reducer from "./reducer";

type TableContextType = [typeof initialState, Dispatch<any>];

export const TableContext = createContext([] as unknown as TableContextType);

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
