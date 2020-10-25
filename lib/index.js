"use strict";

require("core-js/modules/es.symbol.description");

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
const SAVE_DATA = Symbol();
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

function parse(jsman, target) {
  let mapSrc = [];

  for (let key of Reflect.ownKeys(jsman)) {
    let content = jsman[key];
    let originalKey = key;

    if (_data[key] !== undefined) {
      originalKey = _data[key];
      delete _data[key];

      if (typeof content === 'object' && !Array.isArray(content)) {
        content = parse(content, target);
      }
    }

    mapSrc.push([originalKey, content]);
  }

  if (target === targets.ARRAY) return mapSrc;
  if (target === targets.MAP) return new Map(mapSrc);
  if (target === targets.WEAK_MAP) return new WeakMap(mapSrc);
}

$$.arrayFrom = jsman => parse(jsman, targets.ARRAY);

$$.mapFrom = jsman => parse(jsman, targets.MAP);

$$.weakMapFrom = jsman => parse(jsman, targets.WEAK_MAP);

var _default = $$;
exports.default = _default;
module.exports = exports.default;