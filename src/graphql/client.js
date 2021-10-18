import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';


const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://record-crate.hasura.app/v1/graphql',
    options: {
      reconnect: true
    }
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true
})


export default client;


