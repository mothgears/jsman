"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.map");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

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

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var CONTINUE_IDX = Symbol();
var TO_MAP = Symbol();
var _index = 0,
    _data = {};

function $$(object) {
  var key = 'JSMAN_' + _index++;
  _data[key] = object;
  return key;
}

function parse(jsman) {
  var toMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var continueIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var mapSrc = [];

  for (var _i = 0, _Object$keys = Object.keys(jsman); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var content = jsman[key];
    var originalKey = key;

    if (_data[key] !== undefined) {
      originalKey = _data[key];
      delete _data[key];

      if ((0, _typeof2.default)(content) === 'object' && !Array.isArray(content)) {
        content = parse(content, toMap, CONTINUE_IDX);
      }
    }

    mapSrc.push([originalKey, content]);
  }

  if (continueIndex !== CONTINUE_IDX) _index = 0;
  return toMap === TO_MAP ? new Map(mapSrc) : mapSrc;
}

$$.arrayFrom = function (jsman) {
  return parse(jsman);
};

$$.mapFrom = function (jsman) {
  return parse(jsman, TO_MAP);
};

var _default = $$;
exports.default = _default;
module.exports = exports.default;