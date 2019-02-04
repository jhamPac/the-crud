parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"lZRP":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.functions=exports.admin=void 0;const e=require("firebase-admin");exports.admin=e;const i=require("firebase-functions");exports.functions=i,e.initializeApp(i.config().firebase);
},{}],"c2nQ":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var t=require("../firebaseSingleton");let e=(()=>{var t=r(function*(){const t=(yield u.get().catch(function(t){throw new Error(t)})).data();return Object.keys(t).reduce((e=t,function(t,n,r){return t.concat(e[n])}),[]);var e});return function(){return t.apply(this,arguments)}})(),n=(()=>{var t=r(function*(t,{label:e,inStock:n}){const r={[e]:{label:e,inStock:n}};return yield u.update(r),r[e]});return function(e,n){return t.apply(this,arguments)}})();function r(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){return function r(o,u){try{var i=e[o](u),c=i.value}catch(a){return void n(a)}if(!i.done)return Promise.resolve(c).then(function(t){r("next",t)},function(t){r("throw",t)});t(c)}("next")})}}const o=t.admin.firestore(),u=o.collection("provisions").doc("food"),i={Query:{getFoodSupply:e},Mutation:{addFoodToSupply:n}};var c=i;exports.default=c;
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
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.vulcan=exports.api=void 0;var e=require("./firebaseSingleton"),o=require("apollo-server-cloud-functions"),r=n(require("./graphql/schema")),t=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var r=arguments[o];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e};function n(e){return e&&e.__esModule?e:{default:e}}const s=new o.ApolloServer(t({},r.default,{playground:!0})),a=e.functions.https.onRequest(s.createHandler({cors:{origin:"*"}}));exports.api=a;const i=e.functions.firestore.document("provisions/food").onWrite((e,o)=>{console.log(e.before.data()),console.log(e.after.data())});exports.vulcan=i;
},{"./firebaseSingleton":"lZRP","./graphql/schema":"dmRD"}]},{},["cUx7"], null)
//# sourceMappingURL=/index.map