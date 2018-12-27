parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"c2nQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;const t=[{id:1,firstName:"Tom",lastName:"Coleman"},{id:2,firstName:"Sashko",lastName:"Stubailo"}],o=[{id:1,authorId:1,title:"Introduction to GraphQL",votes:2},{id:2,authorId:2,title:"GraphQL Rocks",votes:3},{id:3,authorId:2,title:"Advanced GraphQL",votes:1}],e={Query:{posts:()=>o,author:(o,{id:e})=>t.find(t=>t.id===e)},Mutation:{upvotePost(t,{postId:e}){const d=o.find(t=>t.id===e);if(!d)throw new Error(`Couldn't find post with id ${e}`);return d.votes+=1,d}},Author:{posts:t=>o.filter(o=>o.authorId===t.id)},Post:{author:o=>t.find(t=>t.id===o.authorId)}};var d=e;exports.default=d;
},{}],"dmRD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("apollo-server-cloud-functions"),e=o(require("./resolvers"));function o(t){return t&&t.__esModule?t:{default:t}}const s=t.gql`
  type Author {
    id: Int! # the ! means that every author object _must_ have an id
    firstName: String
    lastName: String
    posts: [Post] # the list of Posts by this author
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost(postId: Int!): Post
  }
`;var r={typeDefs:s,resolvers:e.default};exports.default=r;
},{"./resolvers":"c2nQ"}],"cUx7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.api=void 0;var e=require("apollo-server-cloud-functions"),r=t(require("./graphql/schema")),o=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var o=arguments[r];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(e[t]=o[t])}return e};function t(e){return e&&e.__esModule?e:{default:e}}const i=require("firebase-admin"),n=require("firebase-functions"),a=new e.ApolloServer(o({},r.default,{playground:!0}));i.initializeApp(n.config().firebase);const s=n.https.onRequest(a.createHandler({cors:{origin:"*"}}));exports.api=s;
},{"./graphql/schema":"dmRD"}]},{},["cUx7"], null)
//# sourceMappingURL=/index.map