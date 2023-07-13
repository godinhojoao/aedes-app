import React, { createContext } from 'react';

const DEFAULT_VALUE = {
  setComplaints: () => { },
  complaints: []
};
export const ComplaintsContext = createContext(DEFAULT_VALUE);

export function ComplaintsProvider(props) {
  const { children, complaints, setComplaints } = props;

  return (
    <ComplaintsContext.Provider value={{ complaints, setComplaints }}>
      {children}
    </ComplaintsContext.Provider>
  );
}