// app/ApolloWrapper.jsx
'use client';

import { ApolloProvider } from '@apollo/client';
import client from './lib/ApolloClient';

export function ApolloWrapper({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
