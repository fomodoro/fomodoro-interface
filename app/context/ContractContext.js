import React from 'react'

const ContractContext = React.createContext({});

export const ContractProvider = ContractContext.Provider;
export const ContextConsumer = ContractContext.Consumer;
export default ContractContext;