"use strict";

require("core-js/modules/esnext.map.delete-all");

require("core-js/modules/esnext.map.every");

require("core-js/modules/esnext.map.filter");

require("core-js/modules/esnext.map.find");

require("core-js/modules/esnext.map.find-key");

require("core-js/modules/esnext.map.includes");

require("core-js/modules/esnext.map.key-of");

require("core-js/modules/esnext.map.map-keys");

require("core-js/modules/esnext.map.map-values");

require("core-js/modules/esnext.map.merge");

require("core-js/modules/esnext.map.reduce");

require("core-js/modules/esnext.map.some");

require("core-js/modules/esnext.map.update");

require("core-js/modules/esnext.weak-map.delete-all");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const targets = {
  ARRAY: Symbol(),
  MAP: Symbol(),
  WEAK_MAP: Symbol()
};
let _data = {};

function $$(object) {
  let key = Symbol();
  _data[key] = object;
  return key;
}

function parse(srcObj, target, detectChange = false) {
  let asArr = [];
  let isChanged = false;
  let isJsman = false;

  for (let key of Reflect.ownKeys(srcObj)) {
    let content = srcObj[key];
    let originalKey = key;

    if (typeof key === 'symbol' && _data[key] !== undefined) {
      isJsman = true;
      originalKey = _data[key];
      delete _data[key];
    }

    if (content && typeof content === 'object' && (content.constructor || {}).name === 'Object') {
      let parsedContent = parse(content, target, true);

      if (parsedContent) {
        isChanged = true;
        content = parsedContent;
        srcObj[key] = content;
      }
    }

    asArr.push([originalKey, content]);
  }

  if (isJsman) {
    if (target === targets.ARRAY) return asArr;
    if (target === targets.MAP) return new Map(asArr);
    if (target === targets.WEAK_MAP) return new WeakMap(asArr);
  } else {
    if (isChanged || !detectChange) return srcObj;
    return null;
  }
}

$$.arrayFrom = jsman => parse(jsman, targets.ARRAY);

$$.mapFrom = jsman => parse(jsman, targets.MAP);

$$.weakMapFrom = jsman => parse(jsman, targets.WEAK_MAP);

var _default = $$;
exports.default = _default;
module.exports = exports.default;
