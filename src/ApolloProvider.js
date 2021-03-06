
import App from "./App"
import {ApolloClient } from "apollo-client"
import {InMemoryCache} from "apollo-cache-inmemory"
import {createHttpLink} from "apollo-link-http"
import {ApolloProvider} from "@apollo/react-hooks"
import { setContext } from "apollo-link-context"


const httpLink= createHttpLink({
    uri:'https://kiki-server-amna.herokuapp.com'
});

const AuthLink = setContext(()=>{
    const token = localStorage.getItem('token');
    return{
        headers:{
            Authorization:token?`bearer ${token}`:''
        }
    }

})


const client = new ApolloClient({
    link:AuthLink.concat(httpLink),
    cache: new InMemoryCache(),
    
});

export default (
    <ApolloProvider client = {client}>
        <App/>
    </ApolloProvider>
)

