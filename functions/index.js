parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"lZRP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.functions=exports.admin=void 0;const e=require("firebase-admin");exports.admin=e;const i=require("firebase-functions");exports.functions=i,e.initializeApp(i.config().firebase);
},{}],"c2nQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("../firebaseSingleton");const t=e.admin.firestore(),o=t.collection("provisions").doc("food");async function r(){const e=(await o.get().catch(e=>{throw new Error(e)})).data();return Object.keys(e).reduce((e=>(t,o,r)=>t.concat(e[o]))(e),[])}async function n(e,{label:t,inStock:r}){const n={[t]:{label:t,inStock:r}};return await o.update(n),n[t]}const a={Query:{getFoodSupply:r},Mutation:{addFoodToSupply:n}};var c=a;exports.default=c;
},{"../firebaseSingleton":"lZRP"}],"dmRD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("apollo-server-cloud-functions"),o=t(require("./resolvers"));function t(e){return e&&e.__esModule?e:{default:e}}const l=e.gql`
  type Food {
    id: ID!
    label: String
    inStock: Int
  }

  # the schema allows the following query:
  type Query {
    getFoodSupply: [Food]
  }

  # this schema allows the following mutation:
  type Mutation {
    addFoodToSupply(label: String!, inStock: Int!): Food
  }
`;var r={typeDefs:l,resolvers:o.default};exports.default=r;
},{"./resolvers":"c2nQ"}],"cUx7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.vulcan=exports.api=void 0;var e=require("./firebaseSingleton"),r=require("apollo-server-cloud-functions"),o=t(require("./graphql/schema"));function t(e){return e&&e.__esModule?e:{default:e}}function n(e){for(var r=1;r<arguments.length;r++){var o=null!=arguments[r]?arguments[r]:{},t=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),t.forEach(function(r){u(e,r,o[r])})}return e}function u(e,r,o){return r in e?Object.defineProperty(e,r,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[r]=o,e}const c=new r.ApolloServer(n({},o.default,{playground:!0})),i=e.functions.https.onRequest(c.createHandler({cors:{origin:"*"}}));exports.api=i;const l=e.functions.firestore.document("provisions/food").onWrite((e,r)=>{console.log(e.before.data()),console.log(e.after.data())});exports.vulcan=l;
},{"./firebaseSingleton":"lZRP","./graphql/schema":"dmRD"}]},{},["cUx7"], null)
//# sourceMappingURL=/index.map