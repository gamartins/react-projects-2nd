import { createContext } from 'react';
import useDataFetching from '../hooks/useDataFetching';

export const ListsContext = createContext();

export const ListsContextProvider = ({ children }) => {
  const dataSource = 'https://my-json-server.typicode.com/PacktPublishing/React-Projects-Second-Edition/lists';
  const [ loading, error, data ] = useDataFetching(dataSource);

  return (
    <ListsContext.Provider value={{ lists: data, loading, error }}>
      {children}
    </ListsContext.Provider>
  );
}

export default ListsContext