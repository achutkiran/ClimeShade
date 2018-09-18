import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {setContext} from 'apollo-link-context'; 
import { HttpHeaders } from '@angular/common/http';


@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const uri = 'http://localhost:8000/graphql';
    const http = httpLink.create({ uri });
    const auth = setContext((_,{headers}) => {
      const token = localStorage.getItem('token');
      if(!token) {
        return {};
      }
      else {
        return {
          headers: {token: `${token}`}
        };
      }
    });
    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache()
    });
  }
}