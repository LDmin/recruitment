import React from 'react';
import { split, ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/link-ws';

// Create an http link:
const httpLink = new HttpLink({
  uri: 'http://localhost:3000/graphql'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `ws://localhost:3000/graphql`,
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  // 连接到graphql服务器
  link,
  // 设置缓存
  cache: new InMemoryCache(),
});


const BasicLayout: React.FC = props => {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
};

export default BasicLayout;
