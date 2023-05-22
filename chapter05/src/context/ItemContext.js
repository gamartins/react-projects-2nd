import { createContext, useCallback, useReducer } from 'react';

export const ItemsContext = createContext();

const initialState = {
  items: [],
  loading: true,
  error: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ITEMS_SUCCESS':
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case 'GET_ITEMS_ERROR':
      return {
        ...state,
        items: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const ItemsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchItems = useCallback(async (listId) => {
    try {
      const source = `https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists/${listId}/items`
      const data = await fetch(source);
      const result = await data.json();
      if (result) {
        dispatch({ type: 'GET_ITEMS_SUCCESS', payload: result })
      }      
    } catch(e) {
      dispatch({ type: 'GET_ITEMS_ERROR', payload: e.message })
    }
  }, []);
  
  return (
    <ItemsContext.Provider value={{ ...state, fetchItems }}>
      {children}
    </ItemsContext.Provider>
  );
}