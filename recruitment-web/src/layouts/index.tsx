import React from 'react';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
// import { ApolloProvider } from 'react-apollo'

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

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

// 我们可以自定义fetch，对请求进行统一处理
// const customFetch = (uri, options) => {
//     return fetch(uri, options);
// };


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
