parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"lZRP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.functions=exports.admin=void 0;const e=require("firebase-admin");exports.admin=e;const i=require("firebase-functions");exports.functions=i,e.initializeApp(i.config().firebase);
},{}],"c2nQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("../firebaseSingleton");let t=(()=>{var e=n(function*(){const e=r.collection("provisions").doc("food"),t=(yield e.get().catch(function(e){throw new Error(e)})).data();return Object.keys(t).reduce((n=t,function(e,t,r){let o={name:t,inStock:n[t].inStock};return e.concat(o)}),[]);var n});return function(){return e.apply(this,arguments)}})();function n(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){return function r(o,i){try{var u=t[o](i),c=u.value}catch(a){return void n(a)}if(!u.done)return Promise.resolve(c).then(function(e){r("next",e)},function(e){r("throw",e)});e(c)}("next")})}}const r=e.admin.firestore(),o={Query:{foodSupply:t}};var i=o;exports.default=i;
},{"../firebaseSingleton":"lZRP"}],"dmRD":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=require("apollo-server-cloud-functions"),t=o(require("./resolvers"));function o(e){return e&&e.__esModule?e:{default:e}}const r=e.gql`
  type Food {
    id: ID!
    name: String
    inStock: Int
  }

  # the schema allows the following query:
  type Query {
    foodSupply: [Food]
  }

  # this schema allows the following mutation:
  # type Mutation {
  #   upvotePost(postId: Int!): Post
  # }
`;var s={typeDefs:r,resolvers:t.default};exports.default=s;
},{"./resolvers":"c2nQ"}],"cUx7":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.api=void 0;var e=require("./firebaseSingleton"),r=require("apollo-server-cloud-functions"),o=n(require("./graphql/schema")),t=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var o=arguments[r];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(e[t]=o[t])}return e};function n(e){return e&&e.__esModule?e:{default:e}}const a=new r.ApolloServer(t({},o.default,{playground:!0})),s=e.functions.https.onRequest(a.createHandler({cors:{origin:"*"}}));exports.api=s;
},{"./firebaseSingleton":"lZRP","./graphql/schema":"dmRD"}]},{},["cUx7"], null)
//# sourceMappingURL=/index.map