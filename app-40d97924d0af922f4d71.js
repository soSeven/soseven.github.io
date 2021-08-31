(self["webpackChunkgatsby_starter_default"] = self["webpackChunkgatsby_starter_default"] || []).push([[143],{

/***/ 1506:
/***/ (function(module) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 7154:
/***/ (function(module) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  module.exports.default = module.exports, module.exports.__esModule = true;
  return _extends.apply(this, arguments);
}

module.exports = _extends;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 5354:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(9489);

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}

module.exports = _inheritsLoose;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 5318:
/***/ (function(module) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 7316:
/***/ (function(module) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 9489:
/***/ (function(module) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports.default = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 2393:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = true;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var getLocation = function getLocation(source) {
  var _source$location = source.location,
      search = _source$location.search,
      hash = _source$location.hash,
      href = _source$location.href,
      origin = _source$location.origin,
      protocol = _source$location.protocol,
      host = _source$location.host,
      hostname = _source$location.hostname,
      port = _source$location.port;
  var pathname = source.location.pathname;

  if (!pathname && href && canUseDOM) {
    var url = new URL(href);
    pathname = url.pathname;
  }

  return {
    pathname: encodeURI(decodeURI(pathname)),
    search: search,
    hash: hash,
    href: href,
    origin: origin,
    protocol: protocol,
    host: host,
    hostname: hostname,
    port: port,
    state: source.history.state,
    key: source.history.state && source.history.state.key || "initial"
  };
};

var createHistory = function createHistory(source, options) {
  var listeners = [];
  var location = getLocation(source);
  var transitioning = false;

  var resolveTransition = function resolveTransition() {};

  return {
    get location() {
      return location;
    },

    get transitioning() {
      return transitioning;
    },

    _onTransitionComplete: function _onTransitionComplete() {
      transitioning = false;
      resolveTransition();
    },
    listen: function listen(listener) {
      listeners.push(listener);

      var popstateListener = function popstateListener() {
        location = getLocation(source);
        listener({
          location: location,
          action: "POP"
        });
      };

      source.addEventListener("popstate", popstateListener);
      return function () {
        source.removeEventListener("popstate", popstateListener);
        listeners = listeners.filter(function (fn) {
          return fn !== listener;
        });
      };
    },
    navigate: function navigate(to) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          state = _ref.state,
          _ref$replace = _ref.replace,
          replace = _ref$replace === undefined ? false : _ref$replace;

      if (typeof to === "number") {
        source.history.go(to);
      } else {
        state = _extends({}, state, {
          key: Date.now() + ""
        }); // try...catch iOS Safari limits to 100 pushState calls

        try {
          if (transitioning || replace) {
            source.history.replaceState(state, null, to);
          } else {
            source.history.pushState(state, null, to);
          }
        } catch (e) {
          source.location[replace ? "replace" : "assign"](to);
        }
      }

      location = getLocation(source);
      transitioning = true;
      var transition = new Promise(function (res) {
        return resolveTransition = res;
      });
      listeners.forEach(function (listener) {
        return listener({
          location: location,
          action: "PUSH"
        });
      });
      return transition;
    }
  };
}; ////////////////////////////////////////////////////////////////////////////////
// Stores history entries in memory for testing or other platforms like Native


var createMemorySource = function createMemorySource() {
  var initialPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";
  var searchIndex = initialPath.indexOf("?");
  var initialLocation = {
    pathname: searchIndex > -1 ? initialPath.substr(0, searchIndex) : initialPath,
    search: searchIndex > -1 ? initialPath.substr(searchIndex) : ""
  };
  var index = 0;
  var stack = [initialLocation];
  var states = [null];
  return {
    get location() {
      return stack[index];
    },

    addEventListener: function addEventListener(name, fn) {},
    removeEventListener: function removeEventListener(name, fn) {},
    history: {
      get entries() {
        return stack;
      },

      get index() {
        return index;
      },

      get state() {
        return states[index];
      },

      pushState: function pushState(state, _, uri) {
        var _uri$split = uri.split("?"),
            pathname = _uri$split[0],
            _uri$split$ = _uri$split[1],
            search = _uri$split$ === undefined ? "" : _uri$split$;

        index++;
        stack.push({
          pathname: pathname,
          search: search.length ? "?" + search : search
        });
        states.push(state);
      },
      replaceState: function replaceState(state, _, uri) {
        var _uri$split2 = uri.split("?"),
            pathname = _uri$split2[0],
            _uri$split2$ = _uri$split2[1],
            search = _uri$split2$ === undefined ? "" : _uri$split2$;

        stack[index] = {
          pathname: pathname,
          search: search
        };
        states[index] = state;
      },
      go: function go(to) {
        var newIndex = index + to;

        if (newIndex < 0 || newIndex > states.length - 1) {
          return;
        }

        index = newIndex;
      }
    }
  };
}; ////////////////////////////////////////////////////////////////////////////////
// global history - uses window.history as the source if available, otherwise a
// memory history


var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

var getSource = function getSource() {
  return canUseDOM ? window : createMemorySource();
};

var globalHistory = createHistory(getSource());
var navigate = globalHistory.navigate; ////////////////////////////////////////////////////////////////////////////////

exports.V5 = globalHistory;
__webpack_unused_export__ = navigate;
__webpack_unused_export__ = createHistory;
__webpack_unused_export__ = createMemorySource;

/***/ }),

/***/ 2098:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.shallowCompare = exports.validateRedirect = exports.insertParams = exports.resolve = exports.match = exports.pick = exports.startsWith = undefined;

var _invariant = __webpack_require__(1143);

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} ////////////////////////////////////////////////////////////////////////////////
// startsWith(string, search) - Check if `string` starts with `search`


var startsWith = function startsWith(string, search) {
  return string.substr(0, search.length) === search;
}; ////////////////////////////////////////////////////////////////////////////////
// pick(routes, uri)
//
// Ranks and picks the best route to match. Each segment gets the highest
// amount of points, then the type of segment gets an additional amount of
// points where
//
//     static > dynamic > splat > root
//
// This way we don't have to worry about the order of our routes, let the
// computers do it.
//
// A route looks like this
//
//     { path, default, value }
//
// And a returned match looks like:
//
//     { route, params, uri }
//
// I know, I should use TypeScript not comments for these types.


var pick = function pick(routes, uri) {
  var match = void 0;
  var default_ = void 0;

  var _uri$split = uri.split("?"),
      uriPathname = _uri$split[0];

  var uriSegments = segmentize(uriPathname);
  var isRootUri = uriSegments[0] === "";
  var ranked = rankRoutes(routes);

  for (var i = 0, l = ranked.length; i < l; i++) {
    var missed = false;
    var route = ranked[i].route;

    if (route.default) {
      default_ = {
        route: route,
        params: {},
        uri: uri
      };
      continue;
    }

    var routeSegments = segmentize(route.path);
    var params = {};
    var max = Math.max(uriSegments.length, routeSegments.length);
    var index = 0;

    for (; index < max; index++) {
      var routeSegment = routeSegments[index];
      var uriSegment = uriSegments[index];

      if (isSplat(routeSegment)) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/*
        var param = routeSegment.slice(1) || "*";
        params[param] = uriSegments.slice(index).map(decodeURIComponent).join("/");
        break;
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true;
        break;
      }

      var dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        var matchIsNotReserved = reservedNames.indexOf(dynamicMatch[1]) === -1;
        !matchIsNotReserved ?  false ? 0 : (0, _invariant2.default)(false) : void 0;
        var value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        route: route,
        params: params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }

  return match || default_ || null;
}; ////////////////////////////////////////////////////////////////////////////////
// match(path, uri) - Matches just one path to a uri, also lol


var match = function match(path, uri) {
  return pick([{
    path: path
  }], uri);
}; ////////////////////////////////////////////////////////////////////////////////
// resolve(to, basepath)
//
// Resolves URIs as though every path is a directory, no files.  Relative URIs
// in the browser can feel awkward because not only can you be "in a directory"
// you can be "at a file", too. For example
//
//     browserSpecResolve('foo', '/bar/') => /bar/foo
//     browserSpecResolve('foo', '/bar') => /foo
//
// But on the command line of a file system, it's not as complicated, you can't
// `cd` from a file, only directories.  This way, links have to know less about
// their current path. To go deeper you can do this:
//
//     <Link to="deeper"/>
//     // instead of
//     <Link to=`{${props.uri}/deeper}`/>
//
// Just like `cd`, if you want to go deeper from the command line, you do this:
//
//     cd deeper
//     # not
//     cd $(pwd)/deeper
//
// By treating every path as a directory, linking to relative paths should
// require less contextual information and (fingers crossed) be more intuitive.


var resolve = function resolve(to, base) {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to;
  }

  var _to$split = to.split("?"),
      toPathname = _to$split[0],
      toQuery = _to$split[1];

  var _base$split = base.split("?"),
      basePathname = _base$split[0];

  var toSegments = segmentize(toPathname);
  var baseSegments = segmentize(basePathname); // ?a=b, /users?b=c => /users?a=b

  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  } // profile, /users/789 => /users/789/profile


  if (!startsWith(toSegments[0], ".")) {
    var pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  } // ./         /users/123  =>  /users/123
  // ../        /users/123  =>  /users
  // ../..      /users/123  =>  /
  // ../../one  /a/b/c/d    =>  /a/b/one
  // .././one   /a/b/c/d    =>  /a/b/c/one


  var allSegments = baseSegments.concat(toSegments);
  var segments = [];

  for (var i = 0, l = allSegments.length; i < l; i++) {
    var segment = allSegments[i];
    if (segment === "..") segments.pop();else if (segment !== ".") segments.push(segment);
  }

  return addQuery("/" + segments.join("/"), toQuery);
}; ////////////////////////////////////////////////////////////////////////////////
// insertParams(path, params)


var insertParams = function insertParams(path, params) {
  var _path$split = path.split("?"),
      pathBase = _path$split[0],
      _path$split$ = _path$split[1],
      query = _path$split$ === undefined ? "" : _path$split$;

  var segments = segmentize(pathBase);
  var constructedPath = "/" + segments.map(function (segment) {
    var match = paramRe.exec(segment);
    return match ? params[match[1]] : segment;
  }).join("/");
  var _params$location = params.location;
  _params$location = _params$location === undefined ? {} : _params$location;
  var _params$location$sear = _params$location.search,
      search = _params$location$sear === undefined ? "" : _params$location$sear;
  var searchSplit = search.split("?")[1] || "";
  constructedPath = addQuery(constructedPath, query, searchSplit);
  return constructedPath;
};

var validateRedirect = function validateRedirect(from, to) {
  var filter = function filter(segment) {
    return isDynamic(segment);
  };

  var fromString = segmentize(from).filter(filter).sort().join("/");
  var toString = segmentize(to).filter(filter).sort().join("/");
  return fromString === toString;
}; ////////////////////////////////////////////////////////////////////////////////
// Junk


var paramRe = /^:(.+)/;
var SEGMENT_POINTS = 4;
var STATIC_POINTS = 3;
var DYNAMIC_POINTS = 2;
var SPLAT_PENALTY = 1;
var ROOT_POINTS = 1;

var isRootSegment = function isRootSegment(segment) {
  return segment === "";
};

var isDynamic = function isDynamic(segment) {
  return paramRe.test(segment);
};

var isSplat = function isSplat(segment) {
  return segment && segment[0] === "*";
};

var rankRoute = function rankRoute(route, index) {
  var score = route.default ? 0 : segmentize(route.path).reduce(function (score, segment) {
    score += SEGMENT_POINTS;
    if (isRootSegment(segment)) score += ROOT_POINTS;else if (isDynamic(segment)) score += DYNAMIC_POINTS;else if (isSplat(segment)) score -= SEGMENT_POINTS + SPLAT_PENALTY;else score += STATIC_POINTS;
    return score;
  }, 0);
  return {
    route: route,
    score: score,
    index: index
  };
};

var rankRoutes = function rankRoutes(routes) {
  return routes.map(rankRoute).sort(function (a, b) {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index;
  });
};

var segmentize = function segmentize(uri) {
  return uri // strip starting/ending slashes
  .replace(/(^\/+|\/+$)/g, "").split("/");
};

var addQuery = function addQuery(pathname) {
  for (var _len = arguments.length, query = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    query[_key - 1] = arguments[_key];
  }

  query = query.filter(function (q) {
    return q && q.length > 0;
  });
  return pathname + (query && query.length > 0 ? "?" + query.join("&") : "");
};

var reservedNames = ["uri", "path"];
/**
 * Shallow compares two objects.
 * @param {Object} obj1 The first object to compare.
 * @param {Object} obj2 The second object to compare.
 */

var shallowCompare = function shallowCompare(obj1, obj2) {
  var obj1Keys = Object.keys(obj1);
  return obj1Keys.length === Object.keys(obj2).length && obj1Keys.every(function (key) {
    return obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
  });
}; ////////////////////////////////////////////////////////////////////////////////


exports.startsWith = startsWith;
exports.pick = pick;
exports.match = match;
exports.resolve = resolve;
exports.insertParams = insertParams;
exports.validateRedirect = validateRedirect;
exports.shallowCompare = shallowCompare;

/***/ }),

/***/ 4811:
/***/ (function(module) {

"use strict";


var preserveCamelCase = function preserveCamelCase(string) {
  var isLastCharLower = false;
  var isLastCharUpper = false;
  var isLastLastCharUpper = false;

  for (var i = 0; i < string.length; i++) {
    var character = string[i];

    if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
      string = string.slice(0, i) + '-' + string.slice(i);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      i++;
    } else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
      string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
    }
  }

  return string;
};

var camelCase = function camelCase(input, options) {
  if (!(typeof input === 'string' || Array.isArray(input))) {
    throw new TypeError('Expected the input to be `string | string[]`');
  }

  options = Object.assign({
    pascalCase: false
  }, options);

  var postProcess = function postProcess(x) {
    return options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;
  };

  if (Array.isArray(input)) {
    input = input.map(function (x) {
      return x.trim();
    }).filter(function (x) {
      return x.length;
    }).join('-');
  } else {
    input = input.trim();
  }

  if (input.length === 0) {
    return '';
  }

  if (input.length === 1) {
    return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
  }

  var hasUpperCase = input !== input.toLowerCase();

  if (hasUpperCase) {
    input = preserveCamelCase(input);
  }

  input = input.replace(/^[_.\- ]+/, '').toLowerCase().replace(/[_.\- ]+(\w|$)/g, function (_, p1) {
    return p1.toUpperCase();
  }).replace(/\d+(\w|$)/g, function (m) {
    return m.toUpperCase();
  });
  return postProcess(input);
};

module.exports = camelCase; // TODO: Remove this for the next major release

module.exports.default = camelCase;

/***/ }),

/***/ 4041:
/***/ (function() {

"use strict";

// UNUSED EXPORTS: TemplateTag, codeBlock, commaLists, commaListsAnd, commaListsOr, html, inlineArrayTransformer, inlineLists, oneLine, oneLineCommaLists, oneLineCommaListsAnd, oneLineCommaListsOr, oneLineInlineLists, oneLineTrim, removeNonPrintingValuesTransformer, replaceResultTransformer, replaceStringTransformer, replaceSubstitutionTransformer, safeHtml, source, splitStringTransformer, stripIndent, stripIndentTransformer, stripIndents, trimResultTransformer

;// CONCATENATED MODULE: ./node_modules/common-tags/es/TemplateTag/TemplateTag.js
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _templateObject = _taggedTemplateLiteral(['', ''], ['', '']);

function _taggedTemplateLiteral(strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/**
 * @class TemplateTag
 * @classdesc Consumes a pipeline of composable transformer plugins and produces a template tag.
 */


var TemplateTag = function () {
  /**
   * constructs a template tag
   * @constructs TemplateTag
   * @param  {...Object} [...transformers] - an array or arguments list of transformers
   * @return {Function}                    - a template tag
   */
  function TemplateTag() {
    var _this = this;

    for (var _len = arguments.length, transformers = Array(_len), _key = 0; _key < _len; _key++) {
      transformers[_key] = arguments[_key];
    }

    _classCallCheck(this, TemplateTag);

    this.tag = function (strings) {
      for (var _len2 = arguments.length, expressions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        expressions[_key2 - 1] = arguments[_key2];
      }

      if (typeof strings === 'function') {
        // if the first argument passed is a function, assume it is a template tag and return
        // an intermediary tag that processes the template using the aforementioned tag, passing the
        // result to our tag
        return _this.interimTag.bind(_this, strings);
      }

      if (typeof strings === 'string') {
        // if the first argument passed is a string, just transform it
        return _this.transformEndResult(strings);
      } // else, return a transformed end result of processing the template with our tag


      strings = strings.map(_this.transformString.bind(_this));
      return _this.transformEndResult(strings.reduce(_this.processSubstitutions.bind(_this, expressions)));
    }; // if first argument is an array, extrude it as a list of transformers


    if (transformers.length > 0 && Array.isArray(transformers[0])) {
      transformers = transformers[0];
    } // if any transformers are functions, this means they are not initiated - automatically initiate them


    this.transformers = transformers.map(function (transformer) {
      return typeof transformer === 'function' ? transformer() : transformer;
    }); // return an ES2015 template tag

    return this.tag;
  }
  /**
   * Applies all transformers to a template literal tagged with this method.
   * If a function is passed as the first argument, assumes the function is a template tag
   * and applies it to the template, returning a template tag.
   * @param  {(Function|String|Array<String>)} strings        - Either a template tag or an array containing template strings separated by identifier
   * @param  {...*}                            ...expressions - Optional list of substitution values.
   * @return {(String|Function)}                              - Either an intermediary tag function or the results of processing the template.
   */


  _createClass(TemplateTag, [{
    key: 'interimTag',

    /**
     * An intermediary template tag that receives a template tag and passes the result of calling the template with the received
     * template tag to our own template tag.
     * @param  {Function}        nextTag          - the received template tag
     * @param  {Array<String>}   template         - the template to process
     * @param  {...*}            ...substitutions - `substitutions` is an array of all substitutions in the template
     * @return {*}                                - the final processed value
     */
    value: function interimTag(previousTag, template) {
      for (var _len3 = arguments.length, substitutions = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        substitutions[_key3 - 2] = arguments[_key3];
      }

      return this.tag(_templateObject, previousTag.apply(undefined, [template].concat(substitutions)));
    }
    /**
     * Performs bulk processing on the tagged template, transforming each substitution and then
     * concatenating the resulting values into a string.
     * @param  {Array<*>} substitutions - an array of all remaining substitutions present in this template
     * @param  {String}   resultSoFar   - this iteration's result string so far
     * @param  {String}   remainingPart - the template chunk after the current substitution
     * @return {String}                 - the result of joining this iteration's processed substitution with the result
     */

  }, {
    key: 'processSubstitutions',
    value: function processSubstitutions(substitutions, resultSoFar, remainingPart) {
      var substitution = this.transformSubstitution(substitutions.shift(), resultSoFar);
      return ''.concat(resultSoFar, substitution, remainingPart);
    }
    /**
     * Iterate through each transformer, applying the transformer's `onString` method to the template
     * strings before all substitutions are processed.
     * @param {String}  str - The input string
     * @return {String}     - The final results of processing each transformer
     */

  }, {
    key: 'transformString',
    value: function transformString(str) {
      var cb = function cb(res, transform) {
        return transform.onString ? transform.onString(res) : res;
      };

      return this.transformers.reduce(cb, str);
    }
    /**
     * When a substitution is encountered, iterates through each transformer and applies the transformer's
     * `onSubstitution` method to the substitution.
     * @param  {*}      substitution - The current substitution
     * @param  {String} resultSoFar  - The result up to and excluding this substitution.
     * @return {*}                   - The final result of applying all substitution transformations.
     */

  }, {
    key: 'transformSubstitution',
    value: function transformSubstitution(substitution, resultSoFar) {
      var cb = function cb(res, transform) {
        return transform.onSubstitution ? transform.onSubstitution(res, resultSoFar) : res;
      };

      return this.transformers.reduce(cb, substitution);
    }
    /**
     * Iterates through each transformer, applying the transformer's `onEndResult` method to the
     * template literal after all substitutions have finished processing.
     * @param  {String} endResult - The processed template, just before it is returned from the tag
     * @return {String}           - The final results of processing each transformer
     */

  }, {
    key: 'transformEndResult',
    value: function transformEndResult(endResult) {
      var cb = function cb(res, transform) {
        return transform.onEndResult ? transform.onEndResult(res) : res;
      };

      return this.transformers.reduce(cb, endResult);
    }
  }]);

  return TemplateTag;
}();

/* harmony default export */ var TemplateTag_TemplateTag = (TemplateTag);
;// CONCATENATED MODULE: ./node_modules/common-tags/es/TemplateTag/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineArrayTransformer/inlineArrayTransformer.js
var defaults = {
  separator: '',
  conjunction: '',
  serial: false
};
/**
 * Converts an array substitution to a string containing a list
 * @param  {String} [opts.separator = ''] - the character that separates each item
 * @param  {String} [opts.conjunction = '']  - replace the last separator with this
 * @param  {Boolean} [opts.serial = false] - include the separator before the conjunction? (Oxford comma use-case)
 *
 * @return {Object}                     - a TemplateTag transformer
 */

var inlineArrayTransformer = function inlineArrayTransformer() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaults;
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      // only operate on arrays
      if (Array.isArray(substitution)) {
        var arrayLength = substitution.length;
        var separator = opts.separator;
        var conjunction = opts.conjunction;
        var serial = opts.serial; // join each item in the array into a string where each item is separated by separator
        // be sure to maintain indentation

        var indent = resultSoFar.match(/(\n?[^\S\n]+)$/);

        if (indent) {
          substitution = substitution.join(separator + indent[1]);
        } else {
          substitution = substitution.join(separator + ' ');
        } // if conjunction is set, replace the last separator with conjunction, but only if there is more than one substitution


        if (conjunction && arrayLength > 1) {
          var separatorIndex = substitution.lastIndexOf(separator);
          substitution = substitution.slice(0, separatorIndex) + (serial ? separator : '') + ' ' + conjunction + substitution.slice(separatorIndex + 1);
        }
      }

      return substitution;
    }
  };
};

/* harmony default export */ var inlineArrayTransformer_inlineArrayTransformer = (inlineArrayTransformer);
;// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineArrayTransformer/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndentTransformer/stripIndentTransformer.js
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
}
/**
 * strips indentation from a template literal
 * @param  {String} type = 'initial' - whether to remove all indentation or just leading indentation. can be 'all' or 'initial'
 * @return {Object}                  - a TemplateTag transformer
 */


var stripIndentTransformer = function stripIndentTransformer() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initial';
  return {
    onEndResult: function onEndResult(endResult) {
      if (type === 'initial') {
        // remove the shortest leading indentation from each line
        var match = endResult.match(/^[^\S\n]*(?=\S)/gm);
        var indent = match && Math.min.apply(Math, _toConsumableArray(match.map(function (el) {
          return el.length;
        })));

        if (indent) {
          var regexp = new RegExp('^.{' + indent + '}', 'gm');
          return endResult.replace(regexp, '');
        }

        return endResult;
      }

      if (type === 'all') {
        // remove all indentation from each line
        return endResult.replace(/^[^\S\n]+/gm, '');
      }

      throw new Error('Unknown type: ' + type);
    }
  };
};

/* harmony default export */ var stripIndentTransformer_stripIndentTransformer = (stripIndentTransformer);
;// CONCATENATED MODULE: ./node_modules/common-tags/es/trimResultTransformer/trimResultTransformer.js
/**
 * TemplateTag transformer that trims whitespace on the end result of a tagged template
 * @param  {String} side = '' - The side of the string to trim. Can be 'start' or 'end' (alternatively 'left' or 'right')
 * @return {Object}           - a TemplateTag transformer
 */
var trimResultTransformer = function trimResultTransformer() {
  var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return {
    onEndResult: function onEndResult(endResult) {
      if (side === '') {
        return endResult.trim();
      }

      side = side.toLowerCase();

      if (side === 'start' || side === 'left') {
        return endResult.replace(/^\s*/, '');
      }

      if (side === 'end' || side === 'right') {
        return endResult.replace(/\s*$/, '');
      }

      throw new Error('Side not supported: ' + side);
    }
  };
};

/* harmony default export */ var trimResultTransformer_trimResultTransformer = (trimResultTransformer);
;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaLists/commaLists.js




var commaLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ','
}), stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var commaLists_commaLists = ((/* unused pure expression or super */ null && (commaLists)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaLists/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsAnd/commaListsAnd.js




var commaListsAnd = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ',',
  conjunction: 'and'
}), stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var commaListsAnd_commaListsAnd = ((/* unused pure expression or super */ null && (commaListsAnd)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsAnd/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsOr/commaListsOr.js




var commaListsOr = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ',',
  conjunction: 'or'
}), stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var commaListsOr_commaListsOr = ((/* unused pure expression or super */ null && (commaListsOr)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/commaListsOr/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/splitStringTransformer/splitStringTransformer.js
var splitStringTransformer = function splitStringTransformer(splitBy) {
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      if (splitBy != null && typeof splitBy === 'string') {
        if (typeof substitution === 'string' && substitution.includes(splitBy)) {
          substitution = substitution.split(splitBy);
        }
      } else {
        throw new Error('You need to specify a string character to split by.');
      }

      return substitution;
    }
  };
};

/* harmony default export */ var splitStringTransformer_splitStringTransformer = (splitStringTransformer);
;// CONCATENATED MODULE: ./node_modules/common-tags/es/removeNonPrintingValuesTransformer/removeNonPrintingValuesTransformer.js
var isValidValue = function isValidValue(x) {
  return x != null && !Number.isNaN(x) && typeof x !== 'boolean';
};

var removeNonPrintingValuesTransformer = function removeNonPrintingValuesTransformer() {
  return {
    onSubstitution: function onSubstitution(substitution) {
      if (Array.isArray(substitution)) {
        return substitution.filter(isValidValue);
      }

      if (isValidValue(substitution)) {
        return substitution;
      }

      return '';
    }
  };
};

/* harmony default export */ var removeNonPrintingValuesTransformer_removeNonPrintingValuesTransformer = (removeNonPrintingValuesTransformer);
;// CONCATENATED MODULE: ./node_modules/common-tags/es/html/html.js






var html = new TemplateTag_TemplateTag(splitStringTransformer_splitStringTransformer('\n'), removeNonPrintingValuesTransformer_removeNonPrintingValuesTransformer, inlineArrayTransformer_inlineArrayTransformer, stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var html_html = ((/* unused pure expression or super */ null && (html)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/html/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/codeBlock/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/source/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/replaceSubstitutionTransformer/replaceSubstitutionTransformer.js
var replaceSubstitutionTransformer = function replaceSubstitutionTransformer(replaceWhat, replaceWith) {
  return {
    onSubstitution: function onSubstitution(substitution, resultSoFar) {
      if (replaceWhat == null || replaceWith == null) {
        throw new Error('replaceSubstitutionTransformer requires at least 2 arguments.');
      } // Do not touch if null or undefined


      if (substitution == null) {
        return substitution;
      } else {
        return substitution.toString().replace(replaceWhat, replaceWith);
      }
    }
  };
};

/* harmony default export */ var replaceSubstitutionTransformer_replaceSubstitutionTransformer = (replaceSubstitutionTransformer);
;// CONCATENATED MODULE: ./node_modules/common-tags/es/safeHtml/safeHtml.js






var safeHtml = new TemplateTag_TemplateTag(splitStringTransformer_splitStringTransformer('\n'), inlineArrayTransformer_inlineArrayTransformer, stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer, replaceSubstitutionTransformer_replaceSubstitutionTransformer(/&/g, '&amp;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/</g, '&lt;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/>/g, '&gt;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/"/g, '&quot;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/'/g, '&#x27;'), replaceSubstitutionTransformer_replaceSubstitutionTransformer(/`/g, '&#x60;'));
/* harmony default export */ var safeHtml_safeHtml = ((/* unused pure expression or super */ null && (safeHtml)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/safeHtml/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/replaceResultTransformer/replaceResultTransformer.js
/**
 * Replaces tabs, newlines and spaces with the chosen value when they occur in sequences
 * @param  {(String|RegExp)} replaceWhat - the value or pattern that should be replaced
 * @param  {*}               replaceWith - the replacement value
 * @return {Object}                      - a TemplateTag transformer
 */
var replaceResultTransformer = function replaceResultTransformer(replaceWhat, replaceWith) {
  return {
    onEndResult: function onEndResult(endResult) {
      if (replaceWhat == null || replaceWith == null) {
        throw new Error('replaceResultTransformer requires at least 2 arguments.');
      }

      return endResult.replace(replaceWhat, replaceWith);
    }
  };
};

/* harmony default export */ var replaceResultTransformer_replaceResultTransformer = (replaceResultTransformer);
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLine/oneLine.js



var oneLine = new TemplateTag_TemplateTag(replaceResultTransformer_replaceResultTransformer(/(?:\n(?:\s*))+/g, ' '), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLine_oneLine = ((/* unused pure expression or super */ null && (oneLine)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLine/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineTrim/oneLineTrim.js



var oneLineTrim = new TemplateTag_TemplateTag(replaceResultTransformer_replaceResultTransformer(/(?:\n\s*)/g, ''), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLineTrim_oneLineTrim = ((/* unused pure expression or super */ null && (oneLineTrim)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineTrim/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaLists/oneLineCommaLists.js




var oneLineCommaLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ','
}), replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLineCommaLists_oneLineCommaLists = ((/* unused pure expression or super */ null && (oneLineCommaLists)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaLists/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsOr/oneLineCommaListsOr.js




var oneLineCommaListsOr = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ',',
  conjunction: 'or'
}), replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLineCommaListsOr_oneLineCommaListsOr = ((/* unused pure expression or super */ null && (oneLineCommaListsOr)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsOr/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsAnd/oneLineCommaListsAnd.js




var oneLineCommaListsAnd = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer({
  separator: ',',
  conjunction: 'and'
}), replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLineCommaListsAnd_oneLineCommaListsAnd = ((/* unused pure expression or super */ null && (oneLineCommaListsAnd)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineCommaListsAnd/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineLists/inlineLists.js




var inlineLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer, stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var inlineLists_inlineLists = ((/* unused pure expression or super */ null && (inlineLists)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/inlineLists/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineInlineLists/oneLineInlineLists.js




var oneLineInlineLists = new TemplateTag_TemplateTag(inlineArrayTransformer_inlineArrayTransformer, replaceResultTransformer_replaceResultTransformer(/(?:\s+)/g, ' '), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var oneLineInlineLists_oneLineInlineLists = ((/* unused pure expression or super */ null && (oneLineInlineLists)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/oneLineInlineLists/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndent/stripIndent.js



var stripIndent = new TemplateTag_TemplateTag(stripIndentTransformer_stripIndentTransformer, trimResultTransformer_trimResultTransformer);
/* harmony default export */ var stripIndent_stripIndent = ((/* unused pure expression or super */ null && (stripIndent)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndent/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndents/stripIndents.js



var stripIndents = new TemplateTag_TemplateTag(stripIndentTransformer_stripIndentTransformer('all'), trimResultTransformer_trimResultTransformer);
/* harmony default export */ var stripIndents_stripIndents = ((/* unused pure expression or super */ null && (stripIndents)));
;// CONCATENATED MODULE: ./node_modules/common-tags/es/stripIndents/index.js


;// CONCATENATED MODULE: ./node_modules/common-tags/es/index.js
// core

 // transformers
















 // tags


































/***/ }),

/***/ 6494:
/***/ (function(module) {

"use strict";


module.exports = Object.assign;

/***/ }),

/***/ 8037:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


var _interopRequireDefault = __webpack_require__(5318);

__webpack_unused_export__ = true;
exports.dq = withPrefix;
exports.mc = withAssetPrefix;
exports.c4 = exports.ZP = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(7316));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(1506));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5354));

var _extends2 = _interopRequireDefault(__webpack_require__(7154));

var _propTypes = _interopRequireDefault(__webpack_require__(5697));

var _react = _interopRequireDefault(__webpack_require__(7294));

var _reachRouter = __webpack_require__(9499);

var _utils = __webpack_require__(2098);

var _parsePath = __webpack_require__(1752);

exports.cP = _parsePath.parsePath;
var _excluded = ["to", "getProps", "onClick", "onMouseEnter", "activeClassName", "activeStyle", "innerRef", "partiallyActive", "state", "replace", "_location"];

var isAbsolutePath = function isAbsolutePath(path) {
  return path === null || path === void 0 ? void 0 : path.startsWith("/");
};

function withPrefix(path, prefix) {
  var _ref, _prefix;

  if (prefix === void 0) {
    prefix = getGlobalBasePrefix();
  }

  if (!isLocalLink(path)) {
    return path;
  }

  if (path.startsWith("./") || path.startsWith("../")) {
    return path;
  }

  var base = (_ref = (_prefix = prefix) !== null && _prefix !== void 0 ? _prefix : getGlobalPathPrefix()) !== null && _ref !== void 0 ? _ref : "/";
  return "" + (base !== null && base !== void 0 && base.endsWith("/") ? base.slice(0, -1) : base) + (path.startsWith("/") ? path : "/" + path);
} // These global values are wrapped in typeof clauses to ensure the values exist.
// This is especially problematic in unit testing of this component.


var getGlobalPathPrefix = function getGlobalPathPrefix() {
  return  false ? 0 : "";
};

var getGlobalBasePrefix = function getGlobalBasePrefix() {
  return  false ? 0 : "";
};

var isLocalLink = function isLocalLink(path) {
  return path && !path.startsWith("http://") && !path.startsWith("https://") && !path.startsWith("//");
};

function withAssetPrefix(path) {
  return withPrefix(path, getGlobalPathPrefix());
}

function absolutify(path, current) {
  // If it's already absolute, return as-is
  if (isAbsolutePath(path)) {
    return path;
  }

  return (0, _utils.resolve)(path, current);
}

var rewriteLinkPath = function rewriteLinkPath(path, relativeTo) {
  if (typeof path === "number") {
    return path;
  }

  if (!isLocalLink(path)) {
    return path;
  }

  return isAbsolutePath(path) ? withPrefix(path) : absolutify(path, relativeTo);
};

var NavLinkPropTypes = {
  activeClassName: _propTypes.default.string,
  activeStyle: _propTypes.default.object,
  partiallyActive: _propTypes.default.bool
}; // Set up IntersectionObserver

var createIntersectionObserver = function createIntersectionObserver(el, cb) {
  var io = new window.IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (el === entry.target) {
        // Check if element is within viewport, remove listener, destroy observer, and run link callback.
        // MSEdge doesn't currently support isIntersecting, so also test for  an intersectionRatio > 0
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          io.unobserve(el);
          io.disconnect();
          cb();
        }
      }
    });
  }); // Add element to the observer

  io.observe(el);
  return {
    instance: io,
    el: el
  };
};

function GatsbyLinkLocationWrapper(props) {
  return /*#__PURE__*/_react.default.createElement(_reachRouter.Location, null, function (_ref2) {
    var location = _ref2.location;
    return /*#__PURE__*/_react.default.createElement(GatsbyLink, (0, _extends2.default)({}, props, {
      _location: location
    }));
  });
}

var GatsbyLink = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(GatsbyLink, _React$Component);

  function GatsbyLink(props) {
    var _this;

    _this = _React$Component.call(this, props) || this; // Default to no support for IntersectionObserver

    _this.defaultGetProps = function (_ref3) {
      var isPartiallyCurrent = _ref3.isPartiallyCurrent,
          isCurrent = _ref3.isCurrent;

      if (_this.props.partiallyActive ? isPartiallyCurrent : isCurrent) {
        return {
          className: [_this.props.className, _this.props.activeClassName].filter(Boolean).join(" "),
          style: (0, _extends2.default)({}, _this.props.style, _this.props.activeStyle)
        };
      }

      return null;
    };

    var IOSupported = false;

    if (typeof window !== "undefined" && window.IntersectionObserver) {
      IOSupported = true;
    }

    _this.state = {
      IOSupported: IOSupported
    };
    _this.handleRef = _this.handleRef.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  var _proto = GatsbyLink.prototype;

  _proto._prefetch = function _prefetch() {
    var currentPath = window.location.pathname; // reach router should have the correct state

    if (this.props._location && this.props._location.pathname) {
      currentPath = this.props._location.pathname;
    }

    var rewrittenPath = rewriteLinkPath(this.props.to, currentPath);
    var newPathName = (0, _parsePath.parsePath)(rewrittenPath).pathname; // Prefech is used to speed up next navigations. When you use it on the current navigation,
    // there could be a race-condition where Chrome uses the stale data instead of waiting for the network to complete

    if (currentPath !== newPathName) {
      ___loader.enqueue(newPathName);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // Preserve non IO functionality if no support
    if (this.props.to !== prevProps.to && !this.state.IOSupported) {
      this._prefetch();
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    // Preserve non IO functionality if no support
    if (!this.state.IOSupported) {
      this._prefetch();
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (!this.io) {
      return;
    }

    var _this$io = this.io,
        instance = _this$io.instance,
        el = _this$io.el;
    instance.unobserve(el);
    instance.disconnect();
  };

  _proto.handleRef = function handleRef(ref) {
    var _this2 = this;

    if (this.props.innerRef && this.props.innerRef.hasOwnProperty("current")) {
      this.props.innerRef.current = ref;
    } else if (this.props.innerRef) {
      this.props.innerRef(ref);
    }

    if (this.state.IOSupported && ref) {
      // If IO supported and element reference found, setup Observer functionality
      this.io = createIntersectionObserver(ref, function () {
        _this2._prefetch();
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        to = _this$props.to,
        _this$props$getProps = _this$props.getProps,
        getProps = _this$props$getProps === void 0 ? this.defaultGetProps : _this$props$getProps,
        _onClick = _this$props.onClick,
        _onMouseEnter = _this$props.onMouseEnter,
        $activeClassName = _this$props.activeClassName,
        $activeStyle = _this$props.activeStyle,
        $innerRef = _this$props.innerRef,
        partiallyActive = _this$props.partiallyActive,
        state = _this$props.state,
        replace = _this$props.replace,
        _location = _this$props._location,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, _excluded);

    if (false) {}

    var prefixedTo = rewriteLinkPath(to, _location.pathname);

    if (!isLocalLink(prefixedTo)) {
      return /*#__PURE__*/_react.default.createElement("a", (0, _extends2.default)({
        href: prefixedTo
      }, rest));
    }

    return /*#__PURE__*/_react.default.createElement(_reachRouter.Link, (0, _extends2.default)({
      to: prefixedTo,
      state: state,
      getProps: getProps,
      innerRef: this.handleRef,
      onMouseEnter: function onMouseEnter(e) {
        if (_onMouseEnter) {
          _onMouseEnter(e);
        }

        ___loader.hovering((0, _parsePath.parsePath)(prefixedTo).pathname);
      },
      onClick: function onClick(e) {
        if (_onClick) {
          _onClick(e);
        }

        if (e.button === 0 && // ignore right clicks
        !_this3.props.target && // let browser handle "target=_blank"
        !e.defaultPrevented && // onClick prevented default
        !e.metaKey && // ignore clicks with modifier keys...
        !e.altKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          var shouldReplace = replace;

          var isCurrent = encodeURI(prefixedTo) === _location.pathname;

          if (typeof replace !== "boolean" && isCurrent) {
            shouldReplace = true;
          } // Make sure the necessary scripts and data are
          // loaded before continuing.


          window.___navigate(prefixedTo, {
            state: state,
            replace: shouldReplace
          });
        }

        return true;
      }
    }, rest));
  };

  return GatsbyLink;
}(_react.default.Component);

GatsbyLink.propTypes = (0, _extends2.default)({}, NavLinkPropTypes, {
  onClick: _propTypes.default.func,
  to: _propTypes.default.string.isRequired,
  replace: _propTypes.default.bool,
  state: _propTypes.default.object
});

var _default = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(GatsbyLinkLocationWrapper, (0, _extends2.default)({
    innerRef: ref
  }, props));
});

exports.ZP = _default;

var navigate = function navigate(to, options) {
  window.___navigate(rewriteLinkPath(to, window.location.pathname), options);
};

exports.c4 = navigate;

/***/ }),

/***/ 1752:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.parsePath = parsePath;

function parsePath(path) {
  var pathname = path || "/";
  var search = "";
  var hash = "";
  var hashIndex = pathname.indexOf("#");

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf("?");

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === "?" ? "" : search,
    hash: hash === "#" ? "" : hash
  };
}

/***/ }),

/***/ 9679:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = true;
exports.p2 = exports.$C = void 0;

var _scrollHandler = __webpack_require__(1432);

exports.$C = _scrollHandler.ScrollHandler;

var _useScrollRestoration = __webpack_require__(4855);

exports.p2 = _useScrollRestoration.useScrollRestoration;

/***/ }),

/***/ 1432:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(5318);

exports.__esModule = true;
exports.ScrollHandler = exports.ScrollContext = void 0;

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(1506));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(5354));

var React = _interopRequireWildcard(__webpack_require__(7294));

var _propTypes = _interopRequireDefault(__webpack_require__(5697));

var _sessionStorage = __webpack_require__(1142);

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ScrollContext = /*#__PURE__*/React.createContext(new _sessionStorage.SessionStorage());
exports.ScrollContext = ScrollContext;
ScrollContext.displayName = "GatsbyScrollContext";

var ScrollHandler = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(ScrollHandler, _React$Component);

  function ScrollHandler() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this._stateStorage = new _sessionStorage.SessionStorage();
    _this._isTicking = false;
    _this._latestKnownScrollY = 0;

    _this.scrollListener = function () {
      _this._latestKnownScrollY = window.scrollY;

      if (!_this._isTicking) {
        _this._isTicking = true;
        requestAnimationFrame(_this._saveScroll.bind((0, _assertThisInitialized2.default)(_this)));
      }
    };

    _this.windowScroll = function (position, prevProps) {
      if (_this.shouldUpdateScroll(prevProps, _this.props)) {
        window.scrollTo(0, position);
      }
    };

    _this.scrollToHash = function (hash, prevProps) {
      var node = document.getElementById(hash.substring(1));

      if (node && _this.shouldUpdateScroll(prevProps, _this.props)) {
        node.scrollIntoView();
      }
    };

    _this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
      var shouldUpdateScroll = _this.props.shouldUpdateScroll;

      if (!shouldUpdateScroll) {
        return true;
      } // Hack to allow accessing this._stateStorage.


      return shouldUpdateScroll.call((0, _assertThisInitialized2.default)(_this), prevRouterProps, routerProps);
    };

    return _this;
  }

  var _proto = ScrollHandler.prototype;

  _proto._saveScroll = function _saveScroll() {
    var key = this.props.location.key || null;

    if (key) {
      this._stateStorage.save(this.props.location, key, this._latestKnownScrollY);
    }

    this._isTicking = false;
  };

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener("scroll", this.scrollListener);
    var scrollPosition;
    var _this$props$location = this.props.location,
        key = _this$props$location.key,
        hash = _this$props$location.hash;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    if (scrollPosition) {
      this.windowScroll(scrollPosition, undefined);
    } else if (hash) {
      this.scrollToHash(decodeURI(hash), undefined);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props$location2 = this.props.location,
        hash = _this$props$location2.hash,
        key = _this$props$location2.key;
    var scrollPosition;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }
    /**  There are two pieces of state: the browser url and
     * history state which keeps track of scroll position
     * Native behaviour prescribes that we ought to restore scroll position
     * when a user navigates back in their browser (this is the `POP` action)
     * Currently, reach router has a bug that prevents this at https://github.com/reach/router/issues/228
     * So we _always_ stick to the url as a source of truth — if the url
     * contains a hash, we scroll to it
     */


    if (hash) {
      this.scrollToHash(decodeURI(hash), prevProps);
    } else {
      this.windowScroll(scrollPosition, prevProps);
    }
  };

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
      value: this._stateStorage
    }, this.props.children);
  };

  return ScrollHandler;
}(React.Component);

exports.ScrollHandler = ScrollHandler;
ScrollHandler.propTypes = {
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.element.isRequired,
  location: _propTypes.default.object.isRequired
};

/***/ }),

/***/ 1142:
/***/ (function(__unused_webpack_module, exports) {

"use strict";


exports.__esModule = true;
exports.SessionStorage = void 0;
var STATE_KEY_PREFIX = "@@scroll|";
var GATSBY_ROUTER_SCROLL_STATE = "___GATSBY_REACT_ROUTER_SCROLL";

var SessionStorage = /*#__PURE__*/function () {
  function SessionStorage() {}

  var _proto = SessionStorage.prototype;

  _proto.read = function read(location, key) {
    var stateKey = this.getStateKey(location, key);

    try {
      var value = window.sessionStorage.getItem(stateKey);
      return value ? JSON.parse(value) : 0;
    } catch (e) {
      if (false) {}

      if (window && window[GATSBY_ROUTER_SCROLL_STATE] && window[GATSBY_ROUTER_SCROLL_STATE][stateKey]) {
        return window[GATSBY_ROUTER_SCROLL_STATE][stateKey];
      }

      return 0;
    }
  };

  _proto.save = function save(location, key, value) {
    var stateKey = this.getStateKey(location, key);
    var storedValue = JSON.stringify(value);

    try {
      window.sessionStorage.setItem(stateKey, storedValue);
    } catch (e) {
      if (window && window[GATSBY_ROUTER_SCROLL_STATE]) {
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      } else {
        window[GATSBY_ROUTER_SCROLL_STATE] = {};
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      }

      if (false) {}
    }
  };

  _proto.getStateKey = function getStateKey(location, key) {
    var stateKeyBase = "" + STATE_KEY_PREFIX + location.pathname;
    return key === null || typeof key === "undefined" ? stateKeyBase : stateKeyBase + "|" + key;
  };

  return SessionStorage;
}();

exports.SessionStorage = SessionStorage;

/***/ }),

/***/ 4855:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = useScrollRestoration;

var _scrollHandler = __webpack_require__(1432);

var _react = __webpack_require__(7294);

var _reachRouter = __webpack_require__(9499);

function useScrollRestoration(identifier) {
  var location = (0, _reachRouter.useLocation)();
  var state = (0, _react.useContext)(_scrollHandler.ScrollContext);
  var ref = (0, _react.useRef)(null);
  (0, _react.useLayoutEffect)(function () {
    if (ref.current) {
      var position = state.read(location, identifier);
      ref.current.scrollTo(0, position || 0);
    }
  }, [location.key]);
  return {
    ref: ref,
    onScroll: function onScroll() {
      if (ref.current) {
        state.save(location, identifier, ref.current.scrollTop);
      }
    }
  };
}

/***/ }),

/***/ 4999:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

// prefer default export if available
var preferDefault=function preferDefault(m){return m&&m.default||m;};exports.components={"component---src-pages-404-js":function componentSrcPages404Js(){return Promise.all(/* import() | component---src-pages-404-js */[__webpack_require__.e(532), __webpack_require__.e(351), __webpack_require__.e(883)]).then(__webpack_require__.bind(__webpack_require__, 9616));},"component---src-pages-index-js":function componentSrcPagesIndexJs(){return Promise.all(/* import() | component---src-pages-index-js */[__webpack_require__.e(532), __webpack_require__.e(351), __webpack_require__.e(678)]).then(__webpack_require__.bind(__webpack_require__, 7704));}};

/***/ }),

/***/ 5182:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports=[{plugin:__webpack_require__(6988),options:{"plugins":[]}},{plugin:__webpack_require__(992),options:{"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#663399","theme_color":"#663399","display":"minimal-ui","icon":"src/images/gatsby-icon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"4a9773549091c227cd2eb82ccd9c5e3a"}},{plugin:__webpack_require__(8454),options:{"plugins":[]}},{plugin:__webpack_require__(9037),options:{"plugins":[]}}];

/***/ }),

/***/ 7343:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var plugins=__webpack_require__(5182);var _require$publicLoader=__webpack_require__(8741)/* .publicLoader */ .jN,getResourceURLsForPathname=_require$publicLoader.getResourceURLsForPathname,loadPage=_require$publicLoader.loadPage,loadPageSync=_require$publicLoader.loadPageSync;exports.h=function(api,args,defaultReturn,argTransform){if(args===void 0){args={};}// Hooks for gatsby-cypress's API handler
if(undefined){if(window.___apiHandler){window.___apiHandler(api);}else if(window.___resolvedAPIs){window.___resolvedAPIs.push(api);}else{window.___resolvedAPIs=[api];}}var results=plugins.map(function(plugin){if(!plugin.plugin[api]){return undefined;}args.getResourceURLsForPathname=getResourceURLsForPathname;args.loadPage=loadPage;args.loadPageSync=loadPageSync;var result=plugin.plugin[api](args,plugin.options);if(result&&argTransform){args=argTransform({args:args,result:result,plugin:plugin});}return result;});// Filter out undefined results.
results=results.filter(function(result){return typeof result!=="undefined";});if(results.length>0){return results;}else if(defaultReturn){return[defaultReturn];}else{return[];}};exports.I=function(api,args,defaultReturn){return plugins.reduce(function(previous,next){return next.plugin[api]?previous.then(function(){return next.plugin[api](args,next.options);}):previous;},Promise.resolve());};

/***/ }),

/***/ 8110:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ _cache_emitter; }
});

;// CONCATENATED MODULE: ./node_modules/mitt/dist/mitt.es.js
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
                                                               

// An array of all currently registered event handlers for a type
                                            
                                                            
// A map of event types and their corresponding event handlers.
                        
                                 
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ var mitt_es = (mitt);
//# sourceMappingURL=mitt.es.js.map

;// CONCATENATED MODULE: ./.cache/emitter.js
var emitter=mitt_es();/* harmony default export */ var _cache_emitter = (emitter);

/***/ }),

/***/ 2257:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "UD": function() { return /* binding */ findMatchPath; },
  "Cj": function() { return /* binding */ findPath; },
  "GA": function() { return /* binding */ grabMatchParams; },
  "DS": function() { return /* binding */ setMatchPaths; }
});

// UNUSED EXPORTS: cleanPath

// EXTERNAL MODULE: ./node_modules/@gatsbyjs/reach-router/lib/utils.js
var utils = __webpack_require__(2098);
// EXTERNAL MODULE: ./.cache/strip-prefix.js
var strip_prefix = __webpack_require__(1578);
;// CONCATENATED MODULE: ./.cache/normalize-page-path.js
/* harmony default export */ var normalize_page_path = (function(path){if(path===undefined){return path;}if(path==="/"){return"/";}if(path.charAt(path.length-1)==="/"){return path.slice(0,-1);}return path;});
// EXTERNAL MODULE: ./.cache/redirect-utils.js + 1 modules
var redirect_utils = __webpack_require__(969);
;// CONCATENATED MODULE: ./.cache/find-path.js
var pathCache=new Map();var matchPaths=[];var trimPathname=function trimPathname(rawPathname){var pathname=decodeURIComponent(rawPathname);// Remove the pathPrefix from the pathname.
var trimmedPathname=(0,strip_prefix/* default */.Z)(pathname,decodeURIComponent(""))// Remove any hashfragment
.split("#")[0]// Remove search query
.split("?")[0];return trimmedPathname;};function absolutify(path){// If it's already absolute, return as-is
if(path.startsWith("/")||path.startsWith("https://")||path.startsWith("http://")){return path;}// Calculate path relative to current location, adding a trailing slash to
// match behavior of @reach/router
return new URL(path,window.location.href+(window.location.href.endsWith("/")?"":"/")).pathname;}/**
 * Set list of matchPaths
 *
 * @param {Array<{path: string, matchPath: string}>} value collection of matchPaths
 */var setMatchPaths=function setMatchPaths(value){matchPaths=value;};/**
 * Return a matchpath url
 * if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
 * `/foo?bar=far` => `/page1`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string|null}
 */var findMatchPath=function findMatchPath(rawPathname){var trimmedPathname=cleanPath(rawPathname);var pickPaths=matchPaths.map(function(_ref){var path=_ref.path,matchPath=_ref.matchPath;return{path:matchPath,originalPath:path};});var path=(0,utils.pick)(pickPaths,trimmedPathname);if(path){return normalize_page_path(path.route.originalPath);}return null;};/**
 * Return a matchpath params from reach/router rules
 * if `match-paths.json` contains `{ ":bar/*foo" }`, and the path is /baz/zaz/zoo
 * then it returns
 *  { bar: baz, foo: zaz/zoo }
 *
 * @param {string} rawPathname A raw pathname
 * @return {object}
 */var grabMatchParams=function grabMatchParams(rawPathname){var trimmedPathname=cleanPath(rawPathname);var pickPaths=matchPaths.map(function(_ref2){var path=_ref2.path,matchPath=_ref2.matchPath;return{path:matchPath,originalPath:path};});var path=(0,utils.pick)(pickPaths,trimmedPathname);if(path){return path.params;}return{};};// Given a raw URL path, returns the cleaned version of it (trim off
// `#` and query params), or if it matches an entry in
// `match-paths.json`, its matched path is returned
//
// E.g. `/foo?bar=far` => `/foo`
//
// Or if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
// `/foo?bar=far` => `/page1`
var findPath=function findPath(rawPathname){var trimmedPathname=trimPathname(absolutify(rawPathname));if(pathCache.has(trimmedPathname)){return pathCache.get(trimmedPathname);}var redirect=(0,redirect_utils/* maybeGetBrowserRedirect */.J)(rawPathname);if(redirect){return findPath(redirect.toPath);}var foundPath=findMatchPath(trimmedPathname);if(!foundPath){foundPath=cleanPath(rawPathname);}pathCache.set(trimmedPathname,foundPath);return foundPath;};/**
 * Clean a url and converts /index.html => /
 * E.g. `/foo?bar=far` => `/foo`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string}
 */var cleanPath=function cleanPath(rawPathname){var trimmedPathname=trimPathname(absolutify(rawPathname));var foundPath=trimmedPathname;if(foundPath==="/index.html"){foundPath="/";}foundPath=normalize_page_path(foundPath);return foundPath;};

/***/ }),

/***/ 5444:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Link": function() { return /* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_1__.ZP; },
/* harmony export */   "withAssetPrefix": function() { return /* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_1__.mc; },
/* harmony export */   "withPrefix": function() { return /* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_1__.dq; },
/* harmony export */   "graphql": function() { return /* binding */ graphql; },
/* harmony export */   "parsePath": function() { return /* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_1__.cP; },
/* harmony export */   "navigate": function() { return /* reexport safe */ gatsby_link__WEBPACK_IMPORTED_MODULE_1__.c4; },
/* harmony export */   "useScrollRestoration": function() { return /* reexport safe */ gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2__.p2; },
/* harmony export */   "StaticQueryContext": function() { return /* binding */ StaticQueryContext; },
/* harmony export */   "StaticQuery": function() { return /* binding */ StaticQuery; },
/* harmony export */   "PageRenderer": function() { return /* reexport default from dynamic */ _public_page_renderer__WEBPACK_IMPORTED_MODULE_3___default.a; },
/* harmony export */   "useStaticQuery": function() { return /* binding */ useStaticQuery; },
/* harmony export */   "prefetchPathname": function() { return /* binding */ prefetchPathname; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var gatsby_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8037);
/* harmony import */ var gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9679);
/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(861);
/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_public_page_renderer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8741);
var prefetchPathname=_loader__WEBPACK_IMPORTED_MODULE_4__/* .default.enqueue */ .ZP.enqueue;var StaticQueryContext=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({});function StaticQueryDataRenderer(_ref){var staticQueryData=_ref.staticQueryData,data=_ref.data,query=_ref.query,render=_ref.render;var finalData=data?data.data:staticQueryData[query]&&staticQueryData[query].data;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,finalData&&render(finalData),!finalData&&/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",null,"Loading (StaticQuery)"));}var StaticQuery=function StaticQuery(props){var data=props.data,query=props.query,render=props.render,children=props.children;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StaticQueryContext.Consumer,null,function(staticQueryData){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(StaticQueryDataRenderer,{data:data,query:query,render:render||children,staticQueryData:staticQueryData});});};var useStaticQuery=function useStaticQuery(query){var _context$query;if(typeof react__WEBPACK_IMPORTED_MODULE_0__.useContext!=="function"&&"production"==="development"){throw new Error("You're likely using a version of React that doesn't support Hooks\n"+"Please update React and ReactDOM to 16.8.0 or later to use the useStaticQuery hook.");}var context=react__WEBPACK_IMPORTED_MODULE_0__.useContext(StaticQueryContext);// query is a stringified number like `3303882` when wrapped with graphql, If a user forgets
// to wrap the query in a grqphql, then casting it to a Number results in `NaN` allowing us to
// catch the misuse of the API and give proper direction
if(isNaN(Number(query))){throw new Error("useStaticQuery was called with a string but expects to be called using `graphql`. Try this:\n\nimport { useStaticQuery, graphql } from 'gatsby';\n\nuseStaticQuery(graphql`"+query+"`);\n");}if((_context$query=context[query])!==null&&_context$query!==void 0&&_context$query.data){return context[query].data;}else{throw new Error("The result of this StaticQuery could not be fetched.\n\n"+"This is likely a bug in Gatsby and if refreshing the page does not fix it, "+"please open an issue in https://github.com/gatsbyjs/gatsby/issues");}};function graphql(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls "+"are supposed to only be evaluated at compile time, and then compiled away. "+"Unfortunately, something went wrong and the query was left in the compiled code.\n\n"+"Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.");}

/***/ }),

/***/ 8741:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "uQ": function() { return /* binding */ PageResourceStatus; },
  "kL": function() { return /* binding */ ProdLoader; },
  "ZP": function() { return /* binding */ loader; },
  "hs": function() { return /* binding */ getStaticQueryResults; },
  "jN": function() { return /* binding */ publicLoader; },
  "N1": function() { return /* binding */ setLoader; }
});

// UNUSED EXPORTS: BaseLoader

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js + 1 modules
var inheritsLoose = __webpack_require__(1721);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(2982);
;// CONCATENATED MODULE: ./.cache/prefetch.js
var support=function support(feature){if(typeof document==="undefined"){return false;}var fakeLink=document.createElement("link");try{if(fakeLink.relList&&typeof fakeLink.relList.supports==="function"){return fakeLink.relList.supports(feature);}}catch(err){return false;}return false;};var linkPrefetchStrategy=function linkPrefetchStrategy(url,options){return new Promise(function(resolve,reject){if(typeof document==="undefined"){reject();return;}var link=document.createElement("link");link.setAttribute("rel","prefetch");link.setAttribute("href",url);Object.keys(options).forEach(function(key){link.setAttribute(key,options[key]);});link.onload=resolve;link.onerror=reject;var parentElement=document.getElementsByTagName("head")[0]||document.getElementsByName("script")[0].parentNode;parentElement.appendChild(link);});};var xhrPrefetchStrategy=function xhrPrefetchStrategy(url){return new Promise(function(resolve,reject){var req=new XMLHttpRequest();req.open("GET",url,true);req.onload=function(){if(req.status===200){resolve();}else{reject();}};req.send(null);});};var supportedPrefetchStrategy=support("prefetch")?linkPrefetchStrategy:xhrPrefetchStrategy;var preFetched={};var prefetch=function prefetch(url,options){return new Promise(function(resolve){if(preFetched[url]){resolve();return;}supportedPrefetchStrategy(url,options).then(function(){resolve();preFetched[url]=true;}).catch(function(){});// 404s are logged to the console anyway
});};/* harmony default export */ var _cache_prefetch = (prefetch);
// EXTERNAL MODULE: ./.cache/emitter.js + 1 modules
var emitter = __webpack_require__(8110);
// EXTERNAL MODULE: ./.cache/find-path.js + 1 modules
var find_path = __webpack_require__(2257);
;// CONCATENATED MODULE: ./.cache/loader.js
/**
 * Available resource loading statuses
 */var PageResourceStatus={/**
   * At least one of critical resources failed to load
   */Error:"error",/**
   * Resources loaded successfully
   */Success:"success"};var preferDefault=function preferDefault(m){return m&&m.default||m;};var stripSurroundingSlashes=function stripSurroundingSlashes(s){s=s[0]==="/"?s.slice(1):s;s=s.endsWith("/")?s.slice(0,-1):s;return s;};var createPageDataUrl=function createPageDataUrl(path){var fixedPath=path==="/"?"index":stripSurroundingSlashes(path);return ""+"/page-data/"+fixedPath+"/page-data.json";};function doFetch(url,method){if(method===void 0){method="GET";}return new Promise(function(resolve,reject){var req=new XMLHttpRequest();req.open(method,url,true);req.onreadystatechange=function(){if(req.readyState==4){resolve(req);}};req.send(null);});}var doesConnectionSupportPrefetch=function doesConnectionSupportPrefetch(){if("connection"in navigator&&typeof navigator.connection!=="undefined"){if((navigator.connection.effectiveType||"").includes("2g")){return false;}if(navigator.connection.saveData){return false;}}return true;};var toPageResources=function toPageResources(pageData,component){if(component===void 0){component=null;}var page={componentChunkName:pageData.componentChunkName,path:pageData.path,webpackCompilationHash:pageData.webpackCompilationHash,matchPath:pageData.matchPath,staticQueryHashes:pageData.staticQueryHashes};return{component:component,json:pageData.result,page:page};};var BaseLoader=/*#__PURE__*/function(){function BaseLoader(loadComponent,matchPaths){this.inFlightNetworkRequests=new Map();// Map of pagePath -> Page. Where Page is an object with: {
//   status: PageResourceStatus.Success || PageResourceStatus.Error,
//   payload: PageResources, // undefined if PageResourceStatus.Error
// }
// PageResources is {
//   component,
//   json: pageData.result,
//   page: {
//     componentChunkName,
//     path,
//     webpackCompilationHash,
//     staticQueryHashes
//   },
//   staticQueryResults
// }
this.pageDb=new Map();this.inFlightDb=new Map();this.staticQueryDb={};this.pageDataDb=new Map();this.prefetchTriggered=new Set();this.prefetchCompleted=new Set();this.loadComponent=loadComponent;(0,find_path/* setMatchPaths */.DS)(matchPaths);}var _proto=BaseLoader.prototype;_proto.memoizedGet=function memoizedGet(url){var _this=this;var inFlightPromise=this.inFlightNetworkRequests.get(url);if(!inFlightPromise){inFlightPromise=doFetch(url,"GET");this.inFlightNetworkRequests.set(url,inFlightPromise);}// Prefer duplication with then + catch over .finally to prevent problems in ie11 + firefox
return inFlightPromise.then(function(response){_this.inFlightNetworkRequests.delete(url);return response;}).catch(function(err){_this.inFlightNetworkRequests.delete(url);throw err;});};_proto.setApiRunner=function setApiRunner(apiRunner){this.apiRunner=apiRunner;this.prefetchDisabled=apiRunner("disableCorePrefetching").some(function(a){return a;});};_proto.fetchPageDataJson=function fetchPageDataJson(loadObj){var _this2=this;var pagePath=loadObj.pagePath,_loadObj$retries=loadObj.retries,retries=_loadObj$retries===void 0?0:_loadObj$retries;var url=createPageDataUrl(pagePath);return this.memoizedGet(url).then(function(req){var status=req.status,responseText=req.responseText;// Handle 200
if(status===200){try{var jsonPayload=JSON.parse(responseText);if(jsonPayload.path===undefined){throw new Error("not a valid pageData response");}return Object.assign(loadObj,{status:PageResourceStatus.Success,payload:jsonPayload});}catch(err){// continue regardless of error
}}// Handle 404
if(status===404||status===200){// If the request was for a 404 page and it doesn't exist, we're done
if(pagePath==="/404.html"){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Need some code here to cache the 404 request. In case
// multiple loadPageDataJsons result in 404s
return _this2.fetchPageDataJson(Object.assign(loadObj,{pagePath:"/404.html",notFound:true}));}// handle 500 response (Unrecoverable)
if(status===500){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Handle everything else, including status === 0, and 503s. Should retry
if(retries<3){return _this2.fetchPageDataJson(Object.assign(loadObj,{retries:retries+1}));}// Retried 3 times already, result is an error.
return Object.assign(loadObj,{status:PageResourceStatus.Error});});};_proto.loadPageDataJson=function loadPageDataJson(rawPath){var _this3=this;var pagePath=(0,find_path/* findPath */.Cj)(rawPath);if(this.pageDataDb.has(pagePath)){var pageData=this.pageDataDb.get(pagePath);if(true){return Promise.resolve(pageData);}}return this.fetchPageDataJson({pagePath:pagePath}).then(function(pageData){_this3.pageDataDb.set(pagePath,pageData);return pageData;});};_proto.findMatchPath=function findMatchPath(rawPath){return (0,find_path/* findMatchPath */.UD)(rawPath);}// TODO check all uses of this and whether they use undefined for page resources not exist
;_proto.loadPage=function loadPage(rawPath){var _this4=this;var pagePath=(0,find_path/* findPath */.Cj)(rawPath);if(this.pageDb.has(pagePath)){var page=this.pageDb.get(pagePath);if(true){if(page.error){return{error:page.error,status:page.status};}return Promise.resolve(page.payload);}}if(this.inFlightDb.has(pagePath)){return this.inFlightDb.get(pagePath);}var inFlightPromise=Promise.all([this.loadAppData(),this.loadPageDataJson(pagePath)]).then(function(allData){var result=allData[1];if(result.status===PageResourceStatus.Error){return{status:PageResourceStatus.Error};}var pageData=result.payload;var _pageData=pageData,componentChunkName=_pageData.componentChunkName,_pageData$staticQuery=_pageData.staticQueryHashes,staticQueryHashes=_pageData$staticQuery===void 0?[]:_pageData$staticQuery;var finalResult={};var componentChunkPromise=_this4.loadComponent(componentChunkName).then(function(component){finalResult.createdAt=new Date();var pageResources;if(!component||component instanceof Error){finalResult.status=PageResourceStatus.Error;finalResult.error=component;}else{finalResult.status=PageResourceStatus.Success;if(result.notFound===true){finalResult.notFound=true;}pageData=Object.assign(pageData,{webpackCompilationHash:allData[0]?allData[0].webpackCompilationHash:""});pageResources=toPageResources(pageData,component);}// undefined if final result is an error
return pageResources;});var staticQueryBatchPromise=Promise.all(staticQueryHashes.map(function(staticQueryHash){// Check for cache in case this static query result has already been loaded
if(_this4.staticQueryDb[staticQueryHash]){var jsonPayload=_this4.staticQueryDb[staticQueryHash];return{staticQueryHash:staticQueryHash,jsonPayload:jsonPayload};}return _this4.memoizedGet(""+"/page-data/sq/d/"+staticQueryHash+".json").then(function(req){var jsonPayload=JSON.parse(req.responseText);return{staticQueryHash:staticQueryHash,jsonPayload:jsonPayload};}).catch(function(){throw new Error("We couldn't load \""+""+"/page-data/sq/d/"+staticQueryHash+".json\"");});})).then(function(staticQueryResults){var staticQueryResultsMap={};staticQueryResults.forEach(function(_ref){var staticQueryHash=_ref.staticQueryHash,jsonPayload=_ref.jsonPayload;staticQueryResultsMap[staticQueryHash]=jsonPayload;_this4.staticQueryDb[staticQueryHash]=jsonPayload;});return staticQueryResultsMap;});return Promise.all([componentChunkPromise,staticQueryBatchPromise]).then(function(_ref2){var pageResources=_ref2[0],staticQueryResults=_ref2[1];var payload;if(pageResources){payload=Object.assign({},pageResources,{staticQueryResults:staticQueryResults});finalResult.payload=payload;emitter/* default.emit */.Z.emit("onPostLoadPageResources",{page:payload,pageResources:payload});}_this4.pageDb.set(pagePath,finalResult);if(finalResult.error){return{error:finalResult.error,status:finalResult.status};}return payload;})// when static-query fail to load we throw a better error
.catch(function(err){return{error:err,status:PageResourceStatus.Error};});});inFlightPromise.then(function(){_this4.inFlightDb.delete(pagePath);}).catch(function(error){_this4.inFlightDb.delete(pagePath);throw error;});this.inFlightDb.set(pagePath,inFlightPromise);return inFlightPromise;}// returns undefined if the page does not exists in cache
;_proto.loadPageSync=function loadPageSync(rawPath,options){if(options===void 0){options={};}var pagePath=(0,find_path/* findPath */.Cj)(rawPath);if(this.pageDb.has(pagePath)){var _options;var pageData=this.pageDb.get(pagePath);if(pageData.payload){return pageData.payload;}if((_options=options)!==null&&_options!==void 0&&_options.withErrorDetails){return{error:pageData.error,status:pageData.status};}}return undefined;};_proto.shouldPrefetch=function shouldPrefetch(pagePath){// Skip prefetching if we know user is on slow or constrained connection
if(!doesConnectionSupportPrefetch()){return false;}// Check if the page exists.
if(this.pageDb.has(pagePath)){return false;}return true;};_proto.prefetch=function prefetch(pagePath){var _this5=this;if(!this.shouldPrefetch(pagePath)){return false;}// Tell plugins with custom prefetching logic that they should start
// prefetching this path.
if(!this.prefetchTriggered.has(pagePath)){this.apiRunner("onPrefetchPathname",{pathname:pagePath});this.prefetchTriggered.add(pagePath);}// If a plugin has disabled core prefetching, stop now.
if(this.prefetchDisabled){return false;}var realPath=(0,find_path/* findPath */.Cj)(pagePath);// Todo make doPrefetch logic cacheable
// eslint-disable-next-line consistent-return
this.doPrefetch(realPath).then(function(){if(!_this5.prefetchCompleted.has(pagePath)){_this5.apiRunner("onPostPrefetchPathname",{pathname:pagePath});_this5.prefetchCompleted.add(pagePath);}});return true;};_proto.doPrefetch=function doPrefetch(pagePath){var _this6=this;var pageDataUrl=createPageDataUrl(pagePath);return _cache_prefetch(pageDataUrl,{crossOrigin:"anonymous",as:"fetch"}).then(function(){return(// This was just prefetched, so will return a response from
// the cache instead of making another request to the server
_this6.loadPageDataJson(pagePath));});};_proto.hovering=function hovering(rawPath){this.loadPage(rawPath);};_proto.getResourceURLsForPathname=function getResourceURLsForPathname(rawPath){var pagePath=(0,find_path/* findPath */.Cj)(rawPath);var page=this.pageDataDb.get(pagePath);if(page){var pageResources=toPageResources(page.payload);return[].concat((0,toConsumableArray/* default */.Z)(createComponentUrls(pageResources.page.componentChunkName)),[createPageDataUrl(pagePath)]);}else{return null;}};_proto.isPageNotFound=function isPageNotFound(rawPath){var pagePath=(0,find_path/* findPath */.Cj)(rawPath);var page=this.pageDb.get(pagePath);return!page||page.notFound;};_proto.loadAppData=function loadAppData(retries){var _this7=this;if(retries===void 0){retries=0;}return this.memoizedGet(""+"/page-data/app-data.json").then(function(req){var status=req.status,responseText=req.responseText;var appData;if(status!==200&&retries<3){// Retry 3 times incase of non-200 responses
return _this7.loadAppData(retries+1);}// Handle 200
if(status===200){try{var jsonPayload=JSON.parse(responseText);if(jsonPayload.webpackCompilationHash===undefined){throw new Error("not a valid app-data response");}appData=jsonPayload;}catch(err){// continue regardless of error
}}return appData;});};return BaseLoader;}();var createComponentUrls=function createComponentUrls(componentChunkName){return(window.___chunkMapping[componentChunkName]||[]).map(function(chunk){return ""+chunk;});};var ProdLoader=/*#__PURE__*/function(_BaseLoader){(0,inheritsLoose/* default */.Z)(ProdLoader,_BaseLoader);function ProdLoader(asyncRequires,matchPaths){var loadComponent=function loadComponent(chunkName){if(!asyncRequires.components[chunkName]){throw new Error("We couldn't find the correct component chunk with the name "+chunkName);}return asyncRequires.components[chunkName]().then(preferDefault)// loader will handle the case when component is error
.catch(function(err){return err;});};return _BaseLoader.call(this,loadComponent,matchPaths)||this;}var _proto2=ProdLoader.prototype;_proto2.doPrefetch=function doPrefetch(pagePath){return _BaseLoader.prototype.doPrefetch.call(this,pagePath).then(function(result){if(result.status!==PageResourceStatus.Success){return Promise.resolve();}var pageData=result.payload;var chunkName=pageData.componentChunkName;var componentUrls=createComponentUrls(chunkName);return Promise.all(componentUrls.map(_cache_prefetch)).then(function(){return pageData;});});};_proto2.loadPageDataJson=function loadPageDataJson(rawPath){return _BaseLoader.prototype.loadPageDataJson.call(this,rawPath).then(function(data){if(data.notFound){// check if html file exist using HEAD request:
// if it does we should navigate to it instead of showing 404
return doFetch(rawPath,"HEAD").then(function(req){if(req.status===200){// page (.html file) actually exist (or we asked for 404 )
// returning page resources status as errored to trigger
// regular browser navigation to given page
return{status:PageResourceStatus.Error};}// if HEAD request wasn't 200, return notFound result
// and show 404 page
return data;});}return data;});};return ProdLoader;}(BaseLoader);var instance;var setLoader=function setLoader(_loader){instance=_loader;};var publicLoader={enqueue:function enqueue(rawPath){return instance.prefetch(rawPath);},// Real methods
getResourceURLsForPathname:function getResourceURLsForPathname(rawPath){return instance.getResourceURLsForPathname(rawPath);},loadPage:function loadPage(rawPath){return instance.loadPage(rawPath);},// TODO add deprecation to v4 so people use withErrorDetails and then we can remove in v5 and change default behaviour
loadPageSync:function loadPageSync(rawPath,options){if(options===void 0){options={};}return instance.loadPageSync(rawPath,options);},prefetch:function prefetch(rawPath){return instance.prefetch(rawPath);},isPageNotFound:function isPageNotFound(rawPath){return instance.isPageNotFound(rawPath);},hovering:function hovering(rawPath){return instance.hovering(rawPath);},loadAppData:function loadAppData(){return instance.loadAppData();}};/* harmony default export */ var loader = (publicLoader);function getStaticQueryResults(){if(instance){return instance.staticQueryDb;}else{return{};}}

/***/ }),

/***/ 804:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1721);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var _api_runner_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7343);
/* harmony import */ var _find_path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2257);
// Renders page
var PageRenderer=/*#__PURE__*/function(_React$Component){(0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z)(PageRenderer,_React$Component);function PageRenderer(){return _React$Component.apply(this,arguments)||this;}var _proto=PageRenderer.prototype;_proto.render=function render(){var props=Object.assign({},this.props,{params:Object.assign({},(0,_find_path__WEBPACK_IMPORTED_MODULE_2__/* .grabMatchParams */ .GA)(this.props.location.pathname),this.props.pageResources.json.pageContext.__params)});var pageElement=/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(this.props.pageResources.component,Object.assign({},props,{key:this.props.path||this.props.pageResources.page.path}));var wrappedPage=(0,_api_runner_browser__WEBPACK_IMPORTED_MODULE_1__/* .apiRunner */ .h)("wrapPageElement",{element:pageElement,props:props},pageElement,function(_ref){var result=_ref.result;return{element:result,props:props};}).pop();return wrappedPage;};return PageRenderer;}(react__WEBPACK_IMPORTED_MODULE_0__.Component);/* harmony default export */ __webpack_exports__["Z"] = (PageRenderer);

/***/ }),

/***/ 9917:
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js + 1 modules
var inheritsLoose = __webpack_require__(1721);
// EXTERNAL MODULE: ./.cache/api-runner-browser.js
var api_runner_browser = __webpack_require__(7343);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(3935);
// EXTERNAL MODULE: ./node_modules/@gatsbyjs/reach-router/es/index.js + 2 modules
var es = __webpack_require__(9499);
// EXTERNAL MODULE: ./node_modules/gatsby-react-router-scroll/index.js
var gatsby_react_router_scroll = __webpack_require__(9679);
// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__(5444);
// EXTERNAL MODULE: ./.cache/loader.js + 1 modules
var loader = __webpack_require__(8741);
// EXTERNAL MODULE: ./.cache/redirect-utils.js + 1 modules
var redirect_utils = __webpack_require__(969);
// EXTERNAL MODULE: ./.cache/emitter.js + 1 modules
var emitter = __webpack_require__(8110);
;// CONCATENATED MODULE: ./.cache/route-announcer-props.js
// This is extracted to separate module because it's shared
// between browser and SSR code
var RouteAnnouncerProps={id:"gatsby-announcer",style:{position:"absolute",top:0,width:1,height:1,padding:0,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",border:0},"aria-live":"assertive","aria-atomic":"true"};
// EXTERNAL MODULE: ./node_modules/@gatsbyjs/reach-router/lib/history.js
var lib_history = __webpack_require__(2393);
// EXTERNAL MODULE: ./node_modules/gatsby-link/index.js
var gatsby_link = __webpack_require__(8037);
;// CONCATENATED MODULE: ./.cache/navigation.js
function maybeRedirect(pathname){var redirect=(0,redirect_utils/* maybeGetBrowserRedirect */.J)(pathname);var _window$location=window.location,hash=_window$location.hash,search=_window$location.search;if(redirect!=null){window.___replace(redirect.toPath+search+hash);return true;}else{return false;}}var onPreRouteUpdate=function onPreRouteUpdate(location,prevLocation){if(!maybeRedirect(location.pathname)){(0,api_runner_browser/* apiRunner */.h)("onPreRouteUpdate",{location:location,prevLocation:prevLocation});}};var onRouteUpdate=function onRouteUpdate(location,prevLocation){if(!maybeRedirect(location.pathname)){(0,api_runner_browser/* apiRunner */.h)("onRouteUpdate",{location:location,prevLocation:prevLocation});if(false){}}};var navigation_navigate=function navigate(to,options){if(options===void 0){options={};}// Support forward/backward navigation with numbers
// navigate(-2) (jumps back 2 history steps)
// navigate(2)  (jumps forward 2 history steps)
if(typeof to==="number"){lib_history/* globalHistory.navigate */.V5.navigate(to);return;}var _parsePath=(0,gatsby_link/* parsePath */.cP)(to),pathname=_parsePath.pathname,search=_parsePath.search,hash=_parsePath.hash;var redirect=(0,redirect_utils/* maybeGetBrowserRedirect */.J)(pathname);// If we're redirecting, just replace the passed in pathname
// to the one we want to redirect to.
if(redirect){to=redirect.toPath+search+hash;}// If we had a service worker update, no matter the path, reload window and
// reset the pathname whitelist
if(window.___swUpdated){window.location=pathname+search+hash;return;}// Start a timer to wait for a second before transitioning and showing a
// loader in case resources aren't around yet.
var timeoutId=setTimeout(function(){emitter/* default.emit */.Z.emit("onDelayedLoadPageResources",{pathname:pathname});(0,api_runner_browser/* apiRunner */.h)("onRouteUpdateDelayed",{location:window.location});},1000);loader/* default.loadPage */.ZP.loadPage(pathname).then(function(pageResources){// If no page resources, then refresh the page
// Do this, rather than simply `window.location.reload()`, so that
// pressing the back/forward buttons work - otherwise when pressing
// back, the browser will just change the URL and expect JS to handle
// the change, which won't always work since it might not be a Gatsby
// page.
if(!pageResources||pageResources.status===loader/* PageResourceStatus.Error */.uQ.Error){window.history.replaceState({},"",location.href);window.location=pathname;clearTimeout(timeoutId);return;}// If the loaded page has a different compilation hash to the
// window, then a rebuild has occurred on the server. Reload.
if( true&&pageResources){// window.___webpackCompilationHash gets set in production-app.js after navigationInit() is called
// So on a direct visit of a page with a browser redirect this check is truthy and thus the codepath is hit
// While the resource actually exists, but only too late
// TODO: This should probably be fixed by setting ___webpackCompilationHash before navigationInit() is called
if(pageResources.page.webpackCompilationHash!==window.___webpackCompilationHash){// Purge plugin-offline cache
if("serviceWorker"in navigator&&navigator.serviceWorker.controller!==null&&navigator.serviceWorker.controller.state==="activated"){navigator.serviceWorker.controller.postMessage({gatsbyApi:"clearPathResources"});}window.location=pathname+search+hash;}}(0,es.navigate)(to,options);clearTimeout(timeoutId);});};function shouldUpdateScroll(prevRouterProps,_ref){var _this=this;var location=_ref.location;var pathname=location.pathname,hash=location.hash;var results=(0,api_runner_browser/* apiRunner */.h)("shouldUpdateScroll",{prevRouterProps:prevRouterProps,// `pathname` for backwards compatibility
pathname:pathname,routerProps:{location:location},getSavedScrollPosition:function getSavedScrollPosition(args){return[0,// FIXME this is actually a big code smell, we should fix this
// eslint-disable-next-line @babel/no-invalid-this
_this._stateStorage.read(args,args.key)];}});if(results.length>0){// Use the latest registered shouldUpdateScroll result, this allows users to override plugin's configuration
// @see https://github.com/gatsbyjs/gatsby/issues/12038
return results[results.length-1];}if(prevRouterProps){var oldPathname=prevRouterProps.location.pathname;if(oldPathname===pathname){// Scroll to element if it exists, if it doesn't, or no hash is provided,
// scroll to top.
return hash?decodeURI(hash.slice(1)):[0,0];}}return true;}function init(){// The "scroll-behavior" package expects the "action" to be on the location
// object so let's copy it over.
lib_history/* globalHistory.listen */.V5.listen(function(args){args.location.action=args.action;});window.___push=function(to){return navigation_navigate(to,{replace:false});};window.___replace=function(to){return navigation_navigate(to,{replace:true});};window.___navigate=function(to,options){return navigation_navigate(to,options);};// Check for initial page-load redirect
maybeRedirect(window.location.pathname);}var RouteAnnouncer=/*#__PURE__*/function(_React$Component){(0,inheritsLoose/* default */.Z)(RouteAnnouncer,_React$Component);function RouteAnnouncer(props){var _this2;_this2=_React$Component.call(this,props)||this;_this2.announcementRef=/*#__PURE__*/react.createRef();return _this2;}var _proto=RouteAnnouncer.prototype;_proto.componentDidUpdate=function componentDidUpdate(prevProps,nextProps){var _this3=this;requestAnimationFrame(function(){var pageName="new page at "+_this3.props.location.pathname;if(document.title){pageName=document.title;}var pageHeadings=document.querySelectorAll("#gatsby-focus-wrapper h1");if(pageHeadings&&pageHeadings.length){pageName=pageHeadings[0].textContent;}var newAnnouncement="Navigated to "+pageName;if(_this3.announcementRef.current){var oldAnnouncement=_this3.announcementRef.current.innerText;if(oldAnnouncement!==newAnnouncement){_this3.announcementRef.current.innerText=newAnnouncement;}}});};_proto.render=function render(){return/*#__PURE__*/react.createElement("div",Object.assign({},RouteAnnouncerProps,{ref:this.announcementRef}));};return RouteAnnouncer;}(react.Component);var compareLocationProps=function compareLocationProps(prevLocation,nextLocation){var _prevLocation$state,_nextLocation$state;if(prevLocation.href!==nextLocation.href){return true;}if((prevLocation===null||prevLocation===void 0?void 0:(_prevLocation$state=prevLocation.state)===null||_prevLocation$state===void 0?void 0:_prevLocation$state.key)!==(nextLocation===null||nextLocation===void 0?void 0:(_nextLocation$state=nextLocation.state)===null||_nextLocation$state===void 0?void 0:_nextLocation$state.key)){return true;}return false;};// Fire on(Pre)RouteUpdate APIs
var RouteUpdates=/*#__PURE__*/function(_React$Component2){(0,inheritsLoose/* default */.Z)(RouteUpdates,_React$Component2);function RouteUpdates(props){var _this4;_this4=_React$Component2.call(this,props)||this;onPreRouteUpdate(props.location,null);return _this4;}var _proto2=RouteUpdates.prototype;_proto2.componentDidMount=function componentDidMount(){onRouteUpdate(this.props.location,null);};_proto2.shouldComponentUpdate=function shouldComponentUpdate(prevProps){if(compareLocationProps(prevProps.location,this.props.location)){onPreRouteUpdate(this.props.location,prevProps.location);return true;}return false;};_proto2.componentDidUpdate=function componentDidUpdate(prevProps){if(compareLocationProps(prevProps.location,this.props.location)){onRouteUpdate(this.props.location,prevProps.location);}};_proto2.render=function render(){return/*#__PURE__*/react.createElement(react.Fragment,null,this.props.children,/*#__PURE__*/react.createElement(RouteAnnouncer,{location:location}));};return RouteUpdates;}(react.Component);
// EXTERNAL MODULE: ./.cache/page-renderer.js
var page_renderer = __webpack_require__(804);
// EXTERNAL MODULE: ./.cache/_this_is_virtual_fs_path_/$virtual/async-requires.js
var async_requires = __webpack_require__(4999);
;// CONCATENATED MODULE: ./node_modules/shallow-compare/es/index.js
// Pulled from react-compat
// https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349
function shallowDiffers(a, b) {
  for (var i in a) {
    if (!(i in b)) return true;
  }for (var _i in b) {
    if (a[_i] !== b[_i]) return true;
  }return false;
}

/* harmony default export */ var shallow_compare_es = (function (instance, nextProps, nextState) {
  return shallowDiffers(instance.props, nextProps) || shallowDiffers(instance.state, nextState);
});
;// CONCATENATED MODULE: ./.cache/ensure-resources.js
var EnsureResources=/*#__PURE__*/function(_React$Component){(0,inheritsLoose/* default */.Z)(EnsureResources,_React$Component);function EnsureResources(props){var _this;_this=_React$Component.call(this)||this;var location=props.location,pageResources=props.pageResources;_this.state={location:Object.assign({},location),pageResources:pageResources||loader/* default.loadPageSync */.ZP.loadPageSync(location.pathname,{withErrorDetails:true})};return _this;}EnsureResources.getDerivedStateFromProps=function getDerivedStateFromProps(_ref,prevState){var location=_ref.location;if(prevState.location.href!==location.href){var pageResources=loader/* default.loadPageSync */.ZP.loadPageSync(location.pathname,{withErrorDetails:true});return{pageResources:pageResources,location:Object.assign({},location)};}return{location:Object.assign({},location)};};var _proto=EnsureResources.prototype;_proto.loadResources=function loadResources(rawPath){var _this2=this;loader/* default.loadPage */.ZP.loadPage(rawPath).then(function(pageResources){if(pageResources&&pageResources.status!==loader/* PageResourceStatus.Error */.uQ.Error){_this2.setState({location:Object.assign({},window.location),pageResources:pageResources});}else{window.history.replaceState({},"",location.href);window.location=rawPath;}});};_proto.shouldComponentUpdate=function shouldComponentUpdate(nextProps,nextState){// Always return false if we're missing resources.
if(!nextState.pageResources){this.loadResources(nextProps.location.pathname);return false;}if(false){}// Check if the component or json have changed.
if(this.state.pageResources!==nextState.pageResources){return true;}if(this.state.pageResources.component!==nextState.pageResources.component){return true;}if(this.state.pageResources.json!==nextState.pageResources.json){return true;}// Check if location has changed on a page using internal routing
// via matchPath configuration.
if(this.state.location.key!==nextState.location.key&&nextState.pageResources.page&&(nextState.pageResources.page.matchPath||nextState.pageResources.page.path)){return true;}return shallow_compare_es(this,nextProps,nextState);};_proto.render=function render(){if(false){ var message, _this$state$pageResou; }return this.props.children(this.state);};return EnsureResources;}(react.Component);/* harmony default export */ var ensure_resources = (EnsureResources);
// EXTERNAL MODULE: ./.cache/strip-prefix.js
var strip_prefix = __webpack_require__(1578);
;// CONCATENATED MODULE: ./.cache/_this_is_virtual_fs_path_/$virtual/match-paths.json
var match_paths_namespaceObject = [];
;// CONCATENATED MODULE: ./.cache/production-app.js
// Generated during bootstrap
var production_app_loader=new loader/* ProdLoader */.kL(async_requires,match_paths_namespaceObject);(0,loader/* setLoader */.N1)(production_app_loader);production_app_loader.setApiRunner(api_runner_browser/* apiRunner */.h);window.asyncRequires=async_requires;window.___emitter=emitter/* default */.Z;window.___loader=loader/* publicLoader */.jN;init();(0,api_runner_browser/* apiRunnerAsync */.I)("onClientEntry").then(function(){// Let plugins register a service worker. The plugin just needs
// to return true.
if((0,api_runner_browser/* apiRunner */.h)("registerServiceWorker").filter(Boolean).length>0){__webpack_require__(154);}// In gatsby v2 if Router is used in page using matchPaths
// paths need to contain full path.
// For example:
//   - page have `/app/*` matchPath
//   - inside template user needs to use `/app/xyz` as path
// Resetting `basepath`/`baseuri` keeps current behaviour
// to not introduce breaking change.
// Remove this in v3
var RouteHandler=function RouteHandler(props){return/*#__PURE__*/react.createElement(es.BaseContext.Provider,{value:{baseuri:"/",basepath:"/"}},/*#__PURE__*/react.createElement(page_renderer/* default */.Z,props));};var DataContext=/*#__PURE__*/react.createContext({});var GatsbyRoot=/*#__PURE__*/function(_React$Component){(0,inheritsLoose/* default */.Z)(GatsbyRoot,_React$Component);function GatsbyRoot(){return _React$Component.apply(this,arguments)||this;}var _proto=GatsbyRoot.prototype;_proto.render=function render(){var children=this.props.children;return/*#__PURE__*/react.createElement(es.Location,null,function(_ref){var location=_ref.location;return/*#__PURE__*/react.createElement(ensure_resources,{location:location},function(_ref2){var pageResources=_ref2.pageResources,location=_ref2.location;var staticQueryResults=(0,loader/* getStaticQueryResults */.hs)();return/*#__PURE__*/react.createElement(gatsby_browser_entry.StaticQueryContext.Provider,{value:staticQueryResults},/*#__PURE__*/react.createElement(DataContext.Provider,{value:{pageResources:pageResources,location:location}},children));});});};return GatsbyRoot;}(react.Component);var LocationHandler=/*#__PURE__*/function(_React$Component2){(0,inheritsLoose/* default */.Z)(LocationHandler,_React$Component2);function LocationHandler(){return _React$Component2.apply(this,arguments)||this;}var _proto2=LocationHandler.prototype;_proto2.render=function render(){var _this=this;return/*#__PURE__*/react.createElement(DataContext.Consumer,null,function(_ref3){var pageResources=_ref3.pageResources,location=_ref3.location;return/*#__PURE__*/react.createElement(RouteUpdates,{location:location},/*#__PURE__*/react.createElement(gatsby_react_router_scroll/* ScrollContext */.$C,{location:location,shouldUpdateScroll:shouldUpdateScroll},/*#__PURE__*/react.createElement(es.Router,{basepath:"",location:location,id:"gatsby-focus-wrapper"},/*#__PURE__*/react.createElement(RouteHandler,Object.assign({path:pageResources.page.path==="/404.html"?(0,strip_prefix/* default */.Z)(location.pathname,""):encodeURI(pageResources.page.matchPath||pageResources.page.path)},_this.props,{location:location,pageResources:pageResources},pageResources.json)))));});};return LocationHandler;}(react.Component);var _window=window,pagePath=_window.pagePath,browserLoc=_window.location;// Explicitly call navigate if the canonical path (window.pagePath)
// is different to the browser path (window.location.pathname). But
// only if NONE of the following conditions hold:
//
// - The url matches a client side route (page.matchPath)
// - it's a 404 page
// - it's the offline plugin shell (/offline-plugin-app-shell-fallback/)
if(pagePath&&""+pagePath!==browserLoc.pathname&&!(production_app_loader.findMatchPath((0,strip_prefix/* default */.Z)(browserLoc.pathname,""))||pagePath==="/404.html"||pagePath.match(/^\/404\/?$/)||pagePath.match(/^\/offline-plugin-app-shell-fallback\/?$/))){(0,es.navigate)(""+pagePath+browserLoc.search+browserLoc.hash,{replace:true});}loader/* publicLoader.loadPage */.jN.loadPage(browserLoc.pathname).then(function(page){if(!page||page.status===loader/* PageResourceStatus.Error */.uQ.Error){var message="page resources for "+browserLoc.pathname+" not found. Not rendering React";// if the chunk throws an error we want to capture the real error
// This should help with https://github.com/gatsbyjs/gatsby/issues/19618
if(page&&page.error){console.error(message);throw page.error;}throw new Error(message);}window.___webpackCompilationHash=page.page.webpackCompilationHash;var SiteRoot=(0,api_runner_browser/* apiRunner */.h)("wrapRootElement",{element:/*#__PURE__*/react.createElement(LocationHandler,null)},/*#__PURE__*/react.createElement(LocationHandler,null),function(_ref4){var result=_ref4.result;return{element:result};}).pop();var App=function App(){var onClientEntryRanRef=react.useRef(false);react.useEffect(function(){if(!onClientEntryRanRef.current){onClientEntryRanRef.current=true;if(performance.mark){performance.mark("onInitialClientRender");}(0,api_runner_browser/* apiRunner */.h)("onInitialClientRender");}},[]);return/*#__PURE__*/react.createElement(GatsbyRoot,null,SiteRoot);};var renderer=(0,api_runner_browser/* apiRunner */.h)("replaceHydrateFunction",undefined,react_dom.hydrateRoot?react_dom.hydrateRoot:react_dom.hydrate)[0];function runRender(){var rootElement=typeof window!=="undefined"?document.getElementById("___gatsby"):null;if(renderer===react_dom.hydrateRoot){renderer(rootElement,/*#__PURE__*/react.createElement(App,null));}else{renderer(/*#__PURE__*/react.createElement(App,null),rootElement);}}// https://github.com/madrobby/zepto/blob/b5ed8d607f67724788ec9ff492be297f64d47dfc/src/zepto.js#L439-L450
// TODO remove IE 10 support
var doc=document;if(doc.readyState==="complete"||doc.readyState!=="loading"&&!doc.documentElement.doScroll){setTimeout(function(){runRender();},0);}else{var handler=function handler(){doc.removeEventListener("DOMContentLoaded",handler,false);window.removeEventListener("load",handler,false);runRender();};doc.addEventListener("DOMContentLoaded",handler,false);window.addEventListener("load",handler,false);}});});

/***/ }),

/***/ 6947:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8741);
/* harmony import */ var _page_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(804);
var ProdPageRenderer=function ProdPageRenderer(_ref){var location=_ref.location;var pageResources=_loader__WEBPACK_IMPORTED_MODULE_1__/* .default.loadPageSync */ .ZP.loadPageSync(location.pathname);if(!pageResources){return null;}return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_page_renderer__WEBPACK_IMPORTED_MODULE_2__/* .default */ .Z,Object.assign({location:location,pageResources:pageResources},pageResources.json));};/* harmony default export */ __webpack_exports__["default"] = (ProdPageRenderer);

/***/ }),

/***/ 861:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var preferDefault=function preferDefault(m){return m&&m.default||m;};if(false){}else if(true){module.exports=preferDefault(__webpack_require__(6947));}else{}

/***/ }),

/***/ 3639:
/***/ (function(__unused_webpack_module, exports) {

exports.O=function(Component){return Component;};

/***/ }),

/***/ 969:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "J": function() { return /* binding */ maybeGetBrowserRedirect; }
});

;// CONCATENATED MODULE: ./.cache/redirects.json
var redirects_namespaceObject = [];
;// CONCATENATED MODULE: ./.cache/redirect-utils.js
// Convert to a map for faster lookup in maybeRedirect()
var redirectMap=new Map();var redirectIgnoreCaseMap=new Map();redirects_namespaceObject.forEach(function(redirect){if(redirect.ignoreCase){redirectIgnoreCaseMap.set(redirect.fromPath,redirect);}else{redirectMap.set(redirect.fromPath,redirect);}});function maybeGetBrowserRedirect(pathname){var redirect=redirectMap.get(pathname);if(!redirect){redirect=redirectIgnoreCaseMap.get(pathname.toLowerCase());}return redirect;}

/***/ }),

/***/ 154:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_runner_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7343);
if(window.location.protocol!=="https:"&&window.location.hostname!=="localhost"){console.error("Service workers can only be used over HTTPS, or on localhost for development");}else if("serviceWorker"in navigator){navigator.serviceWorker.register(""+"/sw.js").then(function(reg){reg.addEventListener("updatefound",function(){(0,_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__/* .apiRunner */ .h)("onServiceWorkerUpdateFound",{serviceWorker:reg});// The updatefound event implies that reg.installing is set; see
// https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
var installingWorker=reg.installing;console.log("installingWorker",installingWorker);installingWorker.addEventListener("statechange",function(){switch(installingWorker.state){case"installed":if(navigator.serviceWorker.controller){// At this point, the old content will have been purged and the fresh content will
// have been added to the cache.
// We set a flag so Gatsby Link knows to refresh the page on next navigation attempt
window.___swUpdated=true;// We call the onServiceWorkerUpdateReady API so users can show update prompts.
(0,_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__/* .apiRunner */ .h)("onServiceWorkerUpdateReady",{serviceWorker:reg});// If resources failed for the current page, reload.
if(window.___failedResources){console.log("resources failed, SW updated - reloading");window.location.reload();}}else{// At this point, everything has been precached.
// It's the perfect time to display a "Content is cached for offline use." message.
console.log("Content is now available offline!");// Post to service worker that install is complete.
// Delay to allow time for the event listener to be added --
// otherwise fetch is called too soon and resources aren't cached.
(0,_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__/* .apiRunner */ .h)("onServiceWorkerInstalled",{serviceWorker:reg});}break;case"redundant":console.error("The installing service worker became redundant.");(0,_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__/* .apiRunner */ .h)("onServiceWorkerRedundant",{serviceWorker:reg});break;case"activated":(0,_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__/* .apiRunner */ .h)("onServiceWorkerActive",{serviceWorker:reg});break;}});});}).catch(function(e){console.error("Error during service worker registration:",e);});}

/***/ }),

/***/ 1578:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ stripPrefix; }
/* harmony export */ });
/**
 * Remove a prefix from a string. Return the input string if the given prefix
 * isn't found.
 */function stripPrefix(str,prefix){if(prefix===void 0){prefix="";}if(!prefix){return str;}if(str===prefix){return"/";}if(str.startsWith(prefix+"/")){return str.slice(prefix.length);}return str;}

/***/ }),

/***/ 9037:
/***/ (function() {

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */ // You can delete this file if you're not using it

/***/ }),

/***/ 8454:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wrapRootElement": function() { return /* binding */ wrapRootElement; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3935);
var ShadowPortal=function ShadowPortal(_ref){var children=_ref.children,identifier=_ref.identifier;var mountNode=React.useRef(null);var portalNode=React.useRef(null);var shadowNode=React.useRef(null);var _React$useState=React.useState(),forceUpdate=_React$useState[1];React.useLayoutEffect(function(){var ownerDocument=mountNode.current.ownerDocument;portalNode.current=ownerDocument.createElement(identifier);shadowNode.current=portalNode.current.attachShadow({mode:"open"});ownerDocument.body.appendChild(portalNode.current);forceUpdate({});return function(){if(portalNode.current&&portalNode.current.ownerDocument){portalNode.current.ownerDocument.body.removeChild(portalNode.current);}};},[]);return shadowNode.current?/*#__PURE__*/createPortal(children,shadowNode.current):/*#__PURE__*/React.createElement("span",{ref:mountNode});};var wrapRootElement=function wrapRootElement(_ref2){var element=_ref2.element;if(false){}else{return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,element);}};

/***/ }),

/***/ 2359:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": function() { return /* binding */ U; },
/* harmony export */   "M": function() { return /* binding */ Q; },
/* harmony export */   "P": function() { return /* binding */ K; },
/* harmony export */   "S": function() { return /* binding */ le; },
/* harmony export */   "_": function() { return /* binding */ p; },
/* harmony export */   "a": function() { return /* binding */ c; },
/* harmony export */   "b": function() { return /* binding */ C; },
/* harmony export */   "c": function() { return /* binding */ de; },
/* harmony export */   "g": function() { return /* binding */ q; }
/* harmony export */ });
/* unused harmony exports G, d, e, f, h, i, j, w */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var common_tags__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4041);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4811);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3935);
function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r){Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);}}return e;}).apply(this,arguments);}function h(e,t){return(h=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e;})(e,t);}function p(e,t){if(null==e)return{};var r,i,a={},n=Object.keys(e);for(i=0;i<n.length;i++){t.indexOf(r=n[i])>=0||(a[r]=e[r]);}return a;}var g,f=(/* unused pure expression or super */ null && ([.25,.5,1,2])),m=(/* unused pure expression or super */ null && ([750,1080,1366,1920])),v=(/* unused pure expression or super */ null && ([320,654,768,1024,1366,1600,1920,2048,2560,3440,3840,4096])),y=function y(e){return console.warn(e);},w=function w(e,t){return e-t;},b=function b(e){return e.map(function(e){return e.src+" "+e.width+"w";}).join(",\n");};function E(e){var t=e.lastIndexOf(".");if(-1!==t){var r=e.substr(t+1);if("jpeg"===r)return"jpg";if(3===r.length||4===r.length)return r;}}function S(e){var t=e.layout,r=void 0===t?"constrained":t,i=e.width,a=e.height,n=e.sourceMetadata,o=e.breakpoints,l=e.aspectRatio,d=e.formats,u=void 0===d?["auto","webp"]:d;return u=u.map(function(e){return e.toLowerCase();}),r=s(r),i&&a?c({},e,{formats:u,layout:r,aspectRatio:i/a}):(n.width&&n.height&&!l&&(l=n.width/n.height),"fullWidth"===r?(i=i||n.width||o[o.length-1],a=a||Math.round(i/(l||1.3333333333333333))):(i||(i=a&&l?a*l:n.width?n.width:a?Math.round(a/1.3333333333333333):800),l&&!a?a=Math.round(i/l):l||(l=i/a)),c({},e,{width:i,height:a,aspectRatio:l,layout:r,formats:u}));}function M(e,t){var r;return void 0===t&&(t=20),null==(r=(0,(e=S(e)).generateImageSource)(e.filename,t,Math.round(t/e.aspectRatio),e.sourceMetadata.format||"jpg",e.fit,e.options))?void 0:r.src;}function L(e){var t,r=(e=S(e)).pluginName,i=e.sourceMetadata,a=e.generateImageSource,n=e.layout,s=e.fit,l=e.options,d=e.width,u=e.height,h=e.filename,p=e.reporter,v=void 0===p?{warn:y}:p,w=e.backgroundColor,M=e.placeholderURL;if(r||v.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'),"function"!=typeof a)throw new Error("generateImageSource must be a function");i&&(i.width||i.height)?i.format||(i.format=E(h)):i={width:d,height:u,format:(null==(t=i)?void 0:t.format)||E(h)||"auto"};var L=new Set(e.formats);(0===L.size||L.has("auto")||L.has(""))&&(L.delete("auto"),L.delete(""),L.add(i.format)),L.has("jpg")&&L.has("png")&&(v.warn("["+r+"] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"),L.delete("jpg"===i.format?"png":"jpg"));var j=function(e){var t=e.filename,r=e.layout,i=void 0===r?"constrained":r,a=e.sourceMetadata,n=e.reporter,s=void 0===n?{warn:y}:n,l=e.breakpoints,d=void 0===l?m:l,u=Object.entries({width:e.width,height:e.height}).filter(function(e){var t=e[1];return"number"==typeof t&&t<1;});if(u.length)throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are "+u.map(function(e){return e.join(": ");}).join(", "));return"fixed"===i?function(e){var t=e.filename,r=e.sourceMetadata,i=e.width,a=e.height,n=e.fit,s=void 0===n?"cover":n,l=e.outputPixelDensities,d=e.reporter,u=void 0===d?{warn:y}:d,c=r.width/r.height,h=k(void 0===l?f:l);if(i&&a){var p=_(r,{width:i,height:a,fit:s});i=p.width,a=p.height,c=p.aspectRatio;}i?a||(a=Math.round(i/c)):i=a?Math.round(a*c):800;var m,v,w=i;if(r.width<i||r.height<a){var b=r.width<i?"width":"height";u.warn(o(g||(m=["\n    The requested ",' "','px" for the image '," was larger than the actual image "," of ","px. If possible, replace the current image with a larger one."],v||(v=m.slice(0)),m.raw=v,g=m),b,"width"===b?i:a,t,b,r[b])),"width"===b?(i=r.width,a=Math.round(i/c)):i=(a=r.height)*c;}return{sizes:h.filter(function(e){return e>=1;}).map(function(e){return Math.round(e*i);}).filter(function(e){return e<=r.width;}),aspectRatio:c,presentationWidth:w,presentationHeight:Math.round(w/c),unscaledWidth:i};}(e):"constrained"===i?R(e):"fullWidth"===i?R(c({breakpoints:d},e)):(s.warn("No valid layout was provided for the image at "+t+". Valid image layouts are fixed, fullWidth, and constrained. Found "+i),{sizes:[a.width],presentationWidth:a.width,presentationHeight:a.height,aspectRatio:a.width/a.height,unscaledWidth:a.width});}(c({},e,{sourceMetadata:i})),N={sources:[]},x=e.sizes;x||(x=function(e,t){switch(t){case"constrained":return"(min-width: "+e+"px) "+e+"px, 100vw";case"fixed":return e+"px";case"fullWidth":return"100vw";default:return;}}(j.presentationWidth,n)),L.forEach(function(e){var t=j.sizes.map(function(t){var i=a(h,t,Math.round(t/j.aspectRatio),e,s,l);if(null!=i&&i.width&&i.height&&i.src&&i.format)return i;v.warn("["+r+"] The resolver for image "+h+" returned an invalid value.");}).filter(Boolean);if("jpg"===e||"png"===e||"auto"===e){var i=t.find(function(e){return e.width===j.unscaledWidth;})||t[0];i&&(N.fallback={src:i.src,srcSet:b(t),sizes:x});}else{var n;null==(n=N.sources)||n.push({srcSet:b(t),sizes:x,type:"image/"+e});}});var I={images:N,layout:n,backgroundColor:w};switch(M&&(I.placeholder={fallback:M}),n){case"fixed":I.width=j.presentationWidth,I.height=j.presentationHeight;break;case"fullWidth":I.width=1,I.height=1/j.aspectRatio;break;case"constrained":I.width=e.width||j.presentationWidth||1,I.height=(I.width||1)/j.aspectRatio;}return I;}var k=function k(e){return Array.from(new Set([1].concat(e))).sort(w);};function R(e){var t,r=e.sourceMetadata,i=e.width,a=e.height,n=e.fit,o=void 0===n?"cover":n,s=e.outputPixelDensities,l=e.breakpoints,d=e.layout,u=r.width/r.height,c=k(void 0===s?f:s);if(i&&a){var h=_(r,{width:i,height:a,fit:o});i=h.width,a=h.height,u=h.aspectRatio;}i=i&&Math.min(i,r.width),a=a&&Math.min(a,r.height),i||a||(a=(i=Math.min(800,r.width))/u),i||(i=a*u);var p=i;return(r.width<i||r.height<a)&&(i=r.width,a=r.height),i=Math.round(i),(null==l?void 0:l.length)>0?(t=l.filter(function(e){return e<=r.width;})).length<l.length&&!t.includes(r.width)&&t.push(r.width):t=(t=c.map(function(e){return Math.round(e*i);})).filter(function(e){return e<=r.width;}),"constrained"!==d||t.includes(i)||t.push(i),{sizes:t=t.sort(w),aspectRatio:u,presentationWidth:p,presentationHeight:Math.round(p/u),unscaledWidth:i};}function _(e,t){var r=e.width/e.height,i=t.width,a=t.height;switch(t.fit){case"fill":i=t.width?t.width:e.width,a=t.height?t.height:e.height;break;case"inside":var n=t.width?t.width:Number.MAX_SAFE_INTEGER,o=t.height?t.height:Number.MAX_SAFE_INTEGER;i=Math.min(n,Math.round(o*r)),a=Math.min(o,Math.round(n/r));break;case"outside":var s=t.width?t.width:0,l=t.height?t.height:0;i=Math.max(s,Math.round(l*r)),a=Math.max(l,Math.round(s/r));break;default:t.width&&!t.height&&(i=t.width,a=Math.round(t.width/r)),t.height&&!t.width&&(i=Math.round(t.height*r),a=t.height);}return{width:i,height:a,aspectRatio:i/a};}var j=(/* unused pure expression or super */ null && (["baseUrl","urlBuilder","sourceWidth","sourceHeight","pluginName","formats","breakpoints","options"])),N=(/* unused pure expression or super */ null && (["images","placeholder"])),x=new Set(),I=function I(){return"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;};function O(){return true&&true;}function W(e){e&&x.add(e);}function z(e){return x.has(e);}var T=function T(e){var t;return function(e){var t,r;return Boolean(null==e||null==(t=e.images)||null==(r=t.fallback)?void 0:r.src);}(e)?e:function(e){return Boolean(null==e?void 0:e.gatsbyImageData);}(e)?e.gatsbyImageData:null==e||null==(t=e.childImageSharp)?void 0:t.gatsbyImageData;},P=function P(e){var t,r,i;return null==(t=T(e))||null==(r=t.images)||null==(i=r.fallback)?void 0:i.src;},H=function H(e){var t,r,i;return null==(t=T(e))||null==(r=t.images)||null==(i=r.fallback)?void 0:i.srcSet;};function D(e){var t,r=e.baseUrl,i=e.urlBuilder,a=e.sourceWidth,n=e.sourceHeight,o=e.pluginName,s=void 0===o?"getImageData":o,l=e.formats,d=void 0===l?["auto"]:l,u=e.breakpoints,h=e.options,g=p(e,j);return null!=(t=u)&&t.length||"fullWidth"!==g.layout&&"FULL_WIDTH"!==g.layout||(u=v),L(c({},g,{pluginName:s,generateImageSource:function generateImageSource(e,t,r,a){return{width:t,height:r,format:a,src:i({baseUrl:e,width:t,height:r,options:h,format:a})};},filename:r,formats:d,breakpoints:u,sourceMetadata:{width:a,height:n,format:"auto"}}));}function C(e,t,r,i,a,n,o,s){var l,d;return void 0===s&&(s={}),null!=o&&o.current&&!("objectFit"in document.documentElement.style)&&(o.current.dataset.objectFit=null!=(l=s.objectFit)?l:"cover",o.current.dataset.objectPosition=""+(null!=(d=s.objectPosition)?d:"50% 50%"),function(e){try{var t=function t(){window.objectFitPolyfill(e.current);},r=function(){if(!("objectFitPolyfill"in window))return Promise.resolve(__webpack_require__.e(/* import() */ 231).then(__webpack_require__.t.bind(__webpack_require__, 7231, 23))).then(function(){});}();Promise.resolve(r&&r.then?r.then(t):t());}catch(e){return Promise.reject(e);}}(o)),O()||(s=c({height:"100%",left:0,position:"absolute",top:0,transform:"translateZ(0)",transition:"opacity 250ms linear",width:"100%",willChange:"opacity"},s)),c({},r,{loading:i,shouldLoad:e,"data-main-image":"",style:c({},s,{opacity:t?1:0}),onLoad:function onLoad(e){if(!t){W(n);var r=e.currentTarget,i=new Image();i.src=r.currentSrc,i.decode?i.decode().catch(function(){}).then(function(){a(!0);}):a(!0);}},ref:o});}function q(e,t,r,i,a,n,o,s){var l={};n&&(l.backgroundColor=n,"fixed"===r?(l.width=i,l.height=a,l.backgroundColor=n,l.position="relative"):("constrained"===r||"fullWidth"===r)&&(l.position="absolute",l.top=0,l.left=0,l.bottom=0,l.right=0)),o&&(l.objectFit=o),s&&(l.objectPosition=s);var d=c({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:c({opacity:t?0:1,transition:"opacity 500ms linear"},l)});return O()||(d.style={height:"100%",left:0,position:"absolute",top:0,width:"100%"}),d;}function A(e,t){var r,i,a,n=e.images,o=e.placeholder,s=c({},p(e,N),{images:c({},n,{sources:[]}),placeholder:o&&c({},o,{sources:[]})});return t.forEach(function(t){var r,i=t.media,a=t.image;i?(a.layout!==e.layout&&"development"==="production"&&console.warn('[gatsby-plugin-image] Mismatched image layout: expected "'+e.layout+'" but received "'+a.layout+'". All art-directed images use the same layout as the default image'),(r=s.images.sources).push.apply(r,a.images.sources.map(function(e){return c({},e,{media:i});}).concat([{media:i,srcSet:a.images.fallback.srcSet}])),s.placeholder&&s.placeholder.sources.push({media:i,srcSet:a.placeholder.fallback})): false&&0;}),(r=s.images.sources).push.apply(r,n.sources),null!=o&&o.sources&&(null==(i=s.placeholder)||(a=i.sources).push.apply(a,o.sources)),s;}var F,V=["children"],G=function G(e){var r=e.layout,i=e.width,a=e.height;return"fullWidth"===r?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{"aria-hidden":!0,style:{paddingTop:a/i*100+"%"}}):"constrained"===r?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{style:{maxWidth:i,display:"block"}},/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+a+"' width='"+i+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null;},U=function U(e){var i=e.children,a=p(e,V);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(G,c({},a)),i,!1);},B=["src","srcSet","loading","alt","shouldLoad","innerRef"],J=["fallback","sources","shouldLoad"],Y=function Y(e){var r=e.src,i=e.srcSet,a=e.loading,n=e.alt,o=void 0===n?"":n,s=e.shouldLoad,l=e.innerRef,d=p(e,B);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",c({},d,{decoding:"async",loading:a,src:s?r:void 0,"data-src":s?void 0:r,srcSet:s?i:void 0,"data-srcset":s?void 0:i,alt:o,ref:l}));},X=/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function(e,r){var i=e.fallback,a=e.sources,n=void 0===a?[]:a,o=e.shouldLoad,s=void 0===o||o,l=p(e,J),d=l.sizes||(null==i?void 0:i.sizes),u=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Y,c({},l,i,{sizes:d,shouldLoad:s,innerRef:r}));return n.length?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("picture",null,n.map(function(e){var r=e.media,i=e.srcSet,a=e.type;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("source",{key:r+"-"+a+"-"+i,type:a,media:r,srcSet:s?i:void 0,"data-srcset":s?void 0:i,sizes:d});}),u):u;});Y.propTypes={src:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,alt:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,sizes:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,shouldLoad:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool},X.displayName="Picture",X.propTypes={alt:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,shouldLoad:prop_types__WEBPACK_IMPORTED_MODULE_3__.bool,fallback:prop_types__WEBPACK_IMPORTED_MODULE_3__.exact({src:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,sizes:prop_types__WEBPACK_IMPORTED_MODULE_3__.string}),sources:prop_types__WEBPACK_IMPORTED_MODULE_3__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_3__.exact({media:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,type:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,sizes:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired}),prop_types__WEBPACK_IMPORTED_MODULE_3__.exact({media:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,type:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired,sizes:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,srcSet:prop_types__WEBPACK_IMPORTED_MODULE_3__.string.isRequired})]))};var Z=["fallback"],K=function K(e){var r=e.fallback,i=p(e,Z);return r?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(X,c({},i,{fallback:{src:r},"aria-hidden":!0,alt:""})):/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",c({},i));};K.displayName="Placeholder",K.propTypes={fallback:prop_types__WEBPACK_IMPORTED_MODULE_3__.string,sources:null==(F=X.propTypes)?void 0:F.sources,alt:function alt(e,t,r){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+r+"`. Validation failed."):null;}};var Q=/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function(e,r){return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment,null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(X,c({ref:r},e)),/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("noscript",null,/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(X,c({},e,{shouldLoad:!0}))));});Q.displayName="MainImage",Q.propTypes=X.propTypes;var $=function $(e,t,r){return e.alt||""===e.alt?prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_3___default()),[e,t,r].concat([].slice.call(arguments,3))):new Error('The "alt" prop is required in '+r+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');},ee={image:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().object.isRequired),alt:$},te=["style","className"],re=function(e){var r,i;function n(t){var r;return(r=e.call(this,t)||this).root=/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)(),r.hydrated={current:!1},r.forceRender={current:"development"==="production"},r.lazyHydrator=null,r.ref=/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)(),r.unobserveRef=void 0,r.state={isLoading:I(),isLoaded:!1},r;}i=e,(r=n).prototype=Object.create(i.prototype),r.prototype.constructor=r,h(r,i);var o=n.prototype;return o._lazyHydrate=function(e,t){var r=this,i=this.root.current.querySelector("[data-gatsby-image-ssr]");return I()&&i&&!this.hydrated.current?(this.hydrated.current=!0,Promise.resolve()):__webpack_require__.e(/* import() */ 987).then(__webpack_require__.bind(__webpack_require__, 4987)).then(function(i){r.lazyHydrator=(0,i.lazyHydrate)(c({image:e.image.images,isLoading:t.isLoading,isLoaded:t.isLoaded,toggleIsLoaded:function toggleIsLoaded(){null==e.onLoad||e.onLoad(),r.setState({isLoaded:!0});},ref:r.ref},e),r.root,r.hydrated,r.forceRender);});},o._setupIntersectionObserver=function(e){var t=this;void 0===e&&(e=!0),__webpack_require__.e(/* import() */ 175).then(__webpack_require__.bind(__webpack_require__, 7175)).then(function(r){var i=(0,r.createIntersectionObserver)(function(){if(t.root.current){var r=JSON.stringify(t.props.image.images);null==t.props.onStartLoad||t.props.onStartLoad({wasCached:e&&z(r)}),t.setState({isLoading:!0,isLoaded:e&&z(r)});}});t.root.current&&(t.unobserveRef=i(t.root));});},o.shouldComponentUpdate=function(e,t){var r=this,i=!1;return this.state.isLoading||!t.isLoading||t.isLoaded||(this.forceRender.current=!0),this.props.image.images!==e.image.images&&(this.unobserveRef&&(this.unobserveRef(),this.hydrated.current&&this.lazyHydrator&&(0,react_dom__WEBPACK_IMPORTED_MODULE_4__.render)(null,this.root.current)),this.setState({isLoading:!1,isLoaded:!1},function(){r._setupIntersectionObserver(!1);}),i=!0),this.root.current&&!i&&this._lazyHydrate(e,t),!1;},o.componentDidMount=function(){if(this.root.current){var e=this.root.current.querySelector("[data-gatsby-image-ssr]"),t=JSON.stringify(this.props.image.images);if(I()&&e&&O()){var r,i;if(null==(r=(i=this.props).onStartLoad)||r.call(i,{wasCached:!1}),e.complete){var a,n;null==(a=(n=this.props).onLoad)||a.call(n),W(t);}else{var o=this;e.addEventListener("load",function r(){e.removeEventListener("load",r),null==o.props.onLoad||o.props.onLoad(),W(t);});}return;}this._setupIntersectionObserver(!0);}},o.componentWillUnmount=function(){this.unobserveRef&&(this.unobserveRef(),this.hydrated.current&&this.lazyHydrator&&this.lazyHydrator());},o.render=function(){var e=this.props.as||"div",r=this.props.image,i=r.width,a=r.height,n=r.layout,o=function(e,t,r){var i={},a="gatsby-image-wrapper";return O()||(i.position="relative",i.overflow="hidden"),"fixed"===r?(i.width=e,i.height=t):"constrained"===r&&(O()||(i.display="inline-block",i.verticalAlign="top"),a="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:a,"data-gatsby-image-wrapper":"",style:i};}(i,a,n),s=o.style,l=o.className,d=p(o,te),u=this.props.className;this.props.class&&(u=this.props.class);var h=function(e,t,r){var i=null;return"fullWidth"===e&&(i='<div aria-hidden="true" style="padding-top: '+r/t*100+'%;"></div>'),"constrained"===e&&(i='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+r+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),i;}(n,i,a);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(e,c({},d,{style:c({},s,this.props.style,{backgroundColor:this.props.backgroundColor}),className:l+(u?" "+u:""),ref:this.root,dangerouslySetInnerHTML:{__html:h},suppressHydrationWarning:!0}));},n;}(react__WEBPACK_IMPORTED_MODULE_0__.Component),ie=function ie(e){if(!e.image)return false&&0,null;O()||"development"!=="production"||console.warn('[gatsby-plugin-image] You\'re missing out on some cool performance features. Please add "gatsby-plugin-image" to your gatsby-config.js');var r=e.image,i=JSON.stringify([r.width,r.height,r.layout,e.className,e.class,e.backgroundColor]);return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(re,c({key:i},e));};ie.propTypes=ee,ie.displayName="GatsbyImage";var ae=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions"],ne=function ne(e,t){return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?prop_types__WEBPACK_IMPORTED_MODULE_3___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_3___default()),[e,t].concat([].slice.call(arguments,2))):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.");},oe=new Set(["fixed","fullWidth","constrained"]),se={src:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string.isRequired),alt:$,width:ne,height:ne,sizes:(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),layout:function layout(e){if(void 0!==e.layout&&!oe.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');}},le=function(e){return function(r){var i=r.src,a=r.__imageData,n=r.__error,o=p(r,ae);return n&&console.warn(n),a?/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(e,c({image:a},o)):(console.warn("Image not loaded",i),n||"development"!=="production"||console.warn('Please ensure that "gatsby-plugin-image" is included in the plugins array in gatsby-config.js, and that your version of gatsby is at least 2.24.78'),null);};}(ie);function de(t){var r=t.children;return react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function(){__webpack_require__.e(/* import() */ 987).then(__webpack_require__.bind(__webpack_require__, 4987));},[]),r;}le.displayName="StaticImage",le.propTypes=se;

/***/ }),

/***/ 6988:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wrapRootElement": function() { return /* binding */ wrapRootElement; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7294);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2359);
function wrapRootElement(_ref){var element=_ref.element;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(___WEBPACK_IMPORTED_MODULE_1__.c,null,element);}

/***/ }),

/***/ 992:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__(5318);var _gatsby=__webpack_require__(5444);var _getManifestPathname=_interopRequireDefault(__webpack_require__(1632));/* global __MANIFEST_PLUGIN_HAS_LOCALISATION__ */ // when we don't have localisation in our manifest, we tree shake everything away
if(undefined){exports.onRouteUpdate=function(_ref,pluginOptions){var location=_ref.location;var localize=pluginOptions.localize;var manifestFilename=(0,_getManifestPathname.default)(location.pathname,localize);var manifestEl=document.head.querySelector("link[rel=\"manifest\"]");if(manifestEl){manifestEl.setAttribute("href",(0,_gatsby.withPrefix)(manifestFilename));}};}

/***/ }),

/***/ 1632:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
exports.__esModule=true;exports.default=void 0;/**
 * Get a manifest filename depending on localized pathname
 *
 * @param {string} pathname
 * @param {Array<{start_url: string, lang: string}>} localizedManifests
 * @return string
 */var _default=function _default(pathname,localizedManifests){var defaultFilename="manifest.webmanifest";if(!Array.isArray(localizedManifests)){return defaultFilename;}var localizedManifest=localizedManifests.find(function(app){return pathname.startsWith(app.start_url);});if(!localizedManifest){return defaultFilename;}return"manifest_"+localizedManifest.lang+".webmanifest";};exports.default=_default;

/***/ }),

/***/ 9499:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "BaseContext": function() { return /* binding */ BaseContext; },
  "Link": function() { return /* binding */ Link; },
  "Location": function() { return /* binding */ Location; },
  "LocationProvider": function() { return /* binding */ LocationProvider; },
  "Match": function() { return /* binding */ Match; },
  "Redirect": function() { return /* binding */ Redirect; },
  "Router": function() { return /* binding */ Router; },
  "ServerLocation": function() { return /* binding */ ServerLocation; },
  "createHistory": function() { return /* reexport */ createHistory; },
  "createMemorySource": function() { return /* reexport */ createMemorySource; },
  "globalHistory": function() { return /* reexport */ globalHistory; },
  "isRedirect": function() { return /* binding */ isRedirect; },
  "matchPath": function() { return /* reexport */ match; },
  "navigate": function() { return /* reexport */ history_navigate; },
  "redirectTo": function() { return /* binding */ redirectTo; },
  "useLocation": function() { return /* binding */ useLocation; },
  "useMatch": function() { return /* binding */ useMatch; },
  "useNavigate": function() { return /* binding */ useNavigate; },
  "useParams": function() { return /* binding */ useParams; }
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__(1143);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);
// EXTERNAL MODULE: ./.cache/react-lifecycles-compat.js
var react_lifecycles_compat = __webpack_require__(3639);
;// CONCATENATED MODULE: ./node_modules/@gatsbyjs/reach-router/es/lib/utils.js
 ////////////////////////////////////////////////////////////////////////////////
// startsWith(string, search) - Check if `string` starts with `search`

var startsWith = function startsWith(string, search) {
  return string.substr(0, search.length) === search;
}; ////////////////////////////////////////////////////////////////////////////////
// pick(routes, uri)
//
// Ranks and picks the best route to match. Each segment gets the highest
// amount of points, then the type of segment gets an additional amount of
// points where
//
//     static > dynamic > splat > root
//
// This way we don't have to worry about the order of our routes, let the
// computers do it.
//
// A route looks like this
//
//     { path, default, value }
//
// And a returned match looks like:
//
//     { route, params, uri }
//
// I know, I should use TypeScript not comments for these types.


var pick = function pick(routes, uri) {
  var match = void 0;
  var default_ = void 0;

  var _uri$split = uri.split("?"),
      uriPathname = _uri$split[0];

  var uriSegments = segmentize(uriPathname);
  var isRootUri = uriSegments[0] === "";
  var ranked = rankRoutes(routes);

  for (var i = 0, l = ranked.length; i < l; i++) {
    var missed = false;
    var route = ranked[i].route;

    if (route.default) {
      default_ = {
        route: route,
        params: {},
        uri: uri
      };
      continue;
    }

    var routeSegments = segmentize(route.path);
    var params = {};
    var max = Math.max(uriSegments.length, routeSegments.length);
    var index = 0;

    for (; index < max; index++) {
      var routeSegment = routeSegments[index];
      var uriSegment = uriSegments[index];

      if (isSplat(routeSegment)) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/*
        var param = routeSegment.slice(1) || "*";
        params[param] = uriSegments.slice(index).map(decodeURIComponent).join("/");
        break;
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true;
        break;
      }

      var dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        var matchIsNotReserved = reservedNames.indexOf(dynamicMatch[1]) === -1;
        !matchIsNotReserved ?  false ? 0 : browser_default()(false) : void 0;
        var value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        route: route,
        params: params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }

  return match || default_ || null;
}; ////////////////////////////////////////////////////////////////////////////////
// match(path, uri) - Matches just one path to a uri, also lol


var match = function match(path, uri) {
  return pick([{
    path: path
  }], uri);
}; ////////////////////////////////////////////////////////////////////////////////
// resolve(to, basepath)
//
// Resolves URIs as though every path is a directory, no files.  Relative URIs
// in the browser can feel awkward because not only can you be "in a directory"
// you can be "at a file", too. For example
//
//     browserSpecResolve('foo', '/bar/') => /bar/foo
//     browserSpecResolve('foo', '/bar') => /foo
//
// But on the command line of a file system, it's not as complicated, you can't
// `cd` from a file, only directories.  This way, links have to know less about
// their current path. To go deeper you can do this:
//
//     <Link to="deeper"/>
//     // instead of
//     <Link to=`{${props.uri}/deeper}`/>
//
// Just like `cd`, if you want to go deeper from the command line, you do this:
//
//     cd deeper
//     # not
//     cd $(pwd)/deeper
//
// By treating every path as a directory, linking to relative paths should
// require less contextual information and (fingers crossed) be more intuitive.


var resolve = function resolve(to, base) {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to;
  }

  var _to$split = to.split("?"),
      toPathname = _to$split[0],
      toQuery = _to$split[1];

  var _base$split = base.split("?"),
      basePathname = _base$split[0];

  var toSegments = segmentize(toPathname);
  var baseSegments = segmentize(basePathname); // ?a=b, /users?b=c => /users?a=b

  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  } // profile, /users/789 => /users/789/profile


  if (!startsWith(toSegments[0], ".")) {
    var pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  } // ./         /users/123  =>  /users/123
  // ../        /users/123  =>  /users
  // ../..      /users/123  =>  /
  // ../../one  /a/b/c/d    =>  /a/b/one
  // .././one   /a/b/c/d    =>  /a/b/c/one


  var allSegments = baseSegments.concat(toSegments);
  var segments = [];

  for (var i = 0, l = allSegments.length; i < l; i++) {
    var segment = allSegments[i];
    if (segment === "..") segments.pop();else if (segment !== ".") segments.push(segment);
  }

  return addQuery("/" + segments.join("/"), toQuery);
}; ////////////////////////////////////////////////////////////////////////////////
// insertParams(path, params)


var insertParams = function insertParams(path, params) {
  var _path$split = path.split("?"),
      pathBase = _path$split[0],
      _path$split$ = _path$split[1],
      query = _path$split$ === undefined ? "" : _path$split$;

  var segments = segmentize(pathBase);
  var constructedPath = "/" + segments.map(function (segment) {
    var match = paramRe.exec(segment);
    return match ? params[match[1]] : segment;
  }).join("/");
  var _params$location = params.location;
  _params$location = _params$location === undefined ? {} : _params$location;
  var _params$location$sear = _params$location.search,
      search = _params$location$sear === undefined ? "" : _params$location$sear;
  var searchSplit = search.split("?")[1] || "";
  constructedPath = addQuery(constructedPath, query, searchSplit);
  return constructedPath;
};

var validateRedirect = function validateRedirect(from, to) {
  var filter = function filter(segment) {
    return isDynamic(segment);
  };

  var fromString = segmentize(from).filter(filter).sort().join("/");
  var toString = segmentize(to).filter(filter).sort().join("/");
  return fromString === toString;
}; ////////////////////////////////////////////////////////////////////////////////
// Junk


var paramRe = /^:(.+)/;
var SEGMENT_POINTS = 4;
var STATIC_POINTS = 3;
var DYNAMIC_POINTS = 2;
var SPLAT_PENALTY = 1;
var ROOT_POINTS = 1;

var isRootSegment = function isRootSegment(segment) {
  return segment === "";
};

var isDynamic = function isDynamic(segment) {
  return paramRe.test(segment);
};

var isSplat = function isSplat(segment) {
  return segment && segment[0] === "*";
};

var rankRoute = function rankRoute(route, index) {
  var score = route.default ? 0 : segmentize(route.path).reduce(function (score, segment) {
    score += SEGMENT_POINTS;
    if (isRootSegment(segment)) score += ROOT_POINTS;else if (isDynamic(segment)) score += DYNAMIC_POINTS;else if (isSplat(segment)) score -= SEGMENT_POINTS + SPLAT_PENALTY;else score += STATIC_POINTS;
    return score;
  }, 0);
  return {
    route: route,
    score: score,
    index: index
  };
};

var rankRoutes = function rankRoutes(routes) {
  return routes.map(rankRoute).sort(function (a, b) {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index;
  });
};

var segmentize = function segmentize(uri) {
  return uri // strip starting/ending slashes
  .replace(/(^\/+|\/+$)/g, "").split("/");
};

var addQuery = function addQuery(pathname) {
  for (var _len = arguments.length, query = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    query[_key - 1] = arguments[_key];
  }

  query = query.filter(function (q) {
    return q && q.length > 0;
  });
  return pathname + (query && query.length > 0 ? "?" + query.join("&") : "");
};

var reservedNames = ["uri", "path"];
/**
 * Shallow compares two objects.
 * @param {Object} obj1 The first object to compare.
 * @param {Object} obj2 The second object to compare.
 */

var shallowCompare = function shallowCompare(obj1, obj2) {
  var obj1Keys = Object.keys(obj1);
  return obj1Keys.length === Object.keys(obj2).length && obj1Keys.every(function (key) {
    return obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
  });
}; ////////////////////////////////////////////////////////////////////////////////



;// CONCATENATED MODULE: ./node_modules/@gatsbyjs/reach-router/es/lib/history.js
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var getLocation = function getLocation(source) {
  var _source$location = source.location,
      search = _source$location.search,
      hash = _source$location.hash,
      href = _source$location.href,
      origin = _source$location.origin,
      protocol = _source$location.protocol,
      host = _source$location.host,
      hostname = _source$location.hostname,
      port = _source$location.port;
  var pathname = source.location.pathname;

  if (!pathname && href && canUseDOM) {
    var url = new URL(href);
    pathname = url.pathname;
  }

  return {
    pathname: encodeURI(decodeURI(pathname)),
    search: search,
    hash: hash,
    href: href,
    origin: origin,
    protocol: protocol,
    host: host,
    hostname: hostname,
    port: port,
    state: source.history.state,
    key: source.history.state && source.history.state.key || "initial"
  };
};

var createHistory = function createHistory(source, options) {
  var listeners = [];
  var location = getLocation(source);
  var transitioning = false;

  var resolveTransition = function resolveTransition() {};

  return {
    get location() {
      return location;
    },

    get transitioning() {
      return transitioning;
    },

    _onTransitionComplete: function _onTransitionComplete() {
      transitioning = false;
      resolveTransition();
    },
    listen: function listen(listener) {
      listeners.push(listener);

      var popstateListener = function popstateListener() {
        location = getLocation(source);
        listener({
          location: location,
          action: "POP"
        });
      };

      source.addEventListener("popstate", popstateListener);
      return function () {
        source.removeEventListener("popstate", popstateListener);
        listeners = listeners.filter(function (fn) {
          return fn !== listener;
        });
      };
    },
    navigate: function navigate(to) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          state = _ref.state,
          _ref$replace = _ref.replace,
          replace = _ref$replace === undefined ? false : _ref$replace;

      if (typeof to === "number") {
        source.history.go(to);
      } else {
        state = _extends({}, state, {
          key: Date.now() + ""
        }); // try...catch iOS Safari limits to 100 pushState calls

        try {
          if (transitioning || replace) {
            source.history.replaceState(state, null, to);
          } else {
            source.history.pushState(state, null, to);
          }
        } catch (e) {
          source.location[replace ? "replace" : "assign"](to);
        }
      }

      location = getLocation(source);
      transitioning = true;
      var transition = new Promise(function (res) {
        return resolveTransition = res;
      });
      listeners.forEach(function (listener) {
        return listener({
          location: location,
          action: "PUSH"
        });
      });
      return transition;
    }
  };
}; ////////////////////////////////////////////////////////////////////////////////
// Stores history entries in memory for testing or other platforms like Native


var createMemorySource = function createMemorySource() {
  var initialPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";
  var searchIndex = initialPath.indexOf("?");
  var initialLocation = {
    pathname: searchIndex > -1 ? initialPath.substr(0, searchIndex) : initialPath,
    search: searchIndex > -1 ? initialPath.substr(searchIndex) : ""
  };
  var index = 0;
  var stack = [initialLocation];
  var states = [null];
  return {
    get location() {
      return stack[index];
    },

    addEventListener: function addEventListener(name, fn) {},
    removeEventListener: function removeEventListener(name, fn) {},
    history: {
      get entries() {
        return stack;
      },

      get index() {
        return index;
      },

      get state() {
        return states[index];
      },

      pushState: function pushState(state, _, uri) {
        var _uri$split = uri.split("?"),
            pathname = _uri$split[0],
            _uri$split$ = _uri$split[1],
            search = _uri$split$ === undefined ? "" : _uri$split$;

        index++;
        stack.push({
          pathname: pathname,
          search: search.length ? "?" + search : search
        });
        states.push(state);
      },
      replaceState: function replaceState(state, _, uri) {
        var _uri$split2 = uri.split("?"),
            pathname = _uri$split2[0],
            _uri$split2$ = _uri$split2[1],
            search = _uri$split2$ === undefined ? "" : _uri$split2$;

        stack[index] = {
          pathname: pathname,
          search: search
        };
        states[index] = state;
      },
      go: function go(to) {
        var newIndex = index + to;

        if (newIndex < 0 || newIndex > states.length - 1) {
          return;
        }

        index = newIndex;
      }
    }
  };
}; ////////////////////////////////////////////////////////////////////////////////
// global history - uses window.history as the source if available, otherwise a
// memory history


var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

var getSource = function getSource() {
  return canUseDOM ? window : createMemorySource();
};

var globalHistory = createHistory(getSource());
var history_navigate = globalHistory.navigate; ////////////////////////////////////////////////////////////////////////////////


;// CONCATENATED MODULE: ./node_modules/@gatsbyjs/reach-router/es/index.js
var es_extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
/* eslint-disable jsx-a11y/anchor-has-content */






 ////////////////////////////////////////////////////////////////////////////////

var createNamedContext = function createNamedContext(name, defaultValue) {
  var Ctx = (0,react.createContext)(defaultValue);
  Ctx.displayName = name;
  return Ctx;
}; ////////////////////////////////////////////////////////////////////////////////
// Location Context/Provider


var LocationContext = createNamedContext("Location"); // sets up a listener if there isn't one already so apps don't need to be
// wrapped in some top level provider

var Location = function Location(_ref) {
  var children = _ref.children;
  return react.createElement(LocationContext.Consumer, null, function (context) {
    return context ? children(context) : react.createElement(LocationProvider, null, children);
  });
};

var LocationProvider = function (_React$Component) {
  _inherits(LocationProvider, _React$Component);

  function LocationProvider() {
    var _temp, _this, _ret;

    _classCallCheck(this, LocationProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      context: _this.getContext(),
      refs: {
        unlisten: null
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  LocationProvider.prototype.getContext = function getContext() {
    var _props$history = this.props.history,
        navigate = _props$history.navigate,
        location = _props$history.location;
    return {
      navigate: navigate,
      location: location
    };
  };

  LocationProvider.prototype.componentDidCatch = function componentDidCatch(error, info) {
    if (isRedirect(error)) {
      var _navigate = this.props.history.navigate;

      _navigate(error.uri, {
        replace: true
      });
    } else {
      throw error;
    }
  };

  LocationProvider.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevState.context.location !== this.state.context.location) {
      this.props.history._onTransitionComplete();
    }
  };

  LocationProvider.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var refs = this.state.refs,
        history = this.props.history;

    history._onTransitionComplete();

    refs.unlisten = history.listen(function () {
      Promise.resolve().then(function () {
        // TODO: replace rAF with react deferred update API when it's ready https://github.com/facebook/react/issues/13306
        requestAnimationFrame(function () {
          if (!_this2.unmounted) {
            _this2.setState(function () {
              return {
                context: _this2.getContext()
              };
            });
          }
        });
      });
    });
  };

  LocationProvider.prototype.componentWillUnmount = function componentWillUnmount() {
    var refs = this.state.refs;
    this.unmounted = true;
    refs.unlisten();
  };

  LocationProvider.prototype.render = function render() {
    var context = this.state.context,
        children = this.props.children;
    return react.createElement(LocationContext.Provider, {
      value: context
    }, typeof children === "function" ? children(context) : children || null);
  };

  return LocationProvider;
}(react.Component); ////////////////////////////////////////////////////////////////////////////////


LocationProvider.defaultProps = {
  history: globalHistory
};
 false ? 0 : void 0;

var ServerLocation = function ServerLocation(_ref2) {
  var url = _ref2.url,
      children = _ref2.children;
  var searchIndex = url.indexOf("?");
  var searchExists = searchIndex > -1;
  var pathname = void 0;
  var search = "";
  var hash = "";

  if (searchExists) {
    pathname = url.substring(0, searchIndex);
    search = url.substring(searchIndex);
  } else {
    pathname = url;
  }

  return react.createElement(LocationContext.Provider, {
    value: {
      location: {
        pathname: pathname,
        search: search,
        hash: hash
      },
      navigate: function navigate() {
        throw new Error("You can't call navigate on the server.");
      }
    }
  }, children);
}; ////////////////////////////////////////////////////////////////////////////////
// Sets baseuri and basepath for nested routers and links


var BaseContext = createNamedContext("Base", {
  baseuri: "/",
  basepath: "/",
  navigate: globalHistory.navigate
}); ////////////////////////////////////////////////////////////////////////////////
// The main event, welcome to the show everybody.

var Router = function Router(props) {
  return react.createElement(BaseContext.Consumer, null, function (baseContext) {
    return react.createElement(Location, null, function (locationContext) {
      return react.createElement(RouterImpl, es_extends({}, baseContext, locationContext, props));
    });
  });
};

var RouterImpl = function (_React$PureComponent) {
  _inherits(RouterImpl, _React$PureComponent);

  function RouterImpl() {
    _classCallCheck(this, RouterImpl);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  RouterImpl.prototype.render = function render() {
    var _props = this.props,
        location = _props.location,
        _navigate2 = _props.navigate,
        basepath = _props.basepath,
        primary = _props.primary,
        children = _props.children,
        baseuri = _props.baseuri,
        _props$component = _props.component,
        component = _props$component === undefined ? "div" : _props$component,
        domProps = _objectWithoutProperties(_props, ["location", "navigate", "basepath", "primary", "children", "baseuri", "component"]);

    var routes = react.Children.toArray(children).reduce(function (array, child) {
      var routes = createRoute(basepath)(child);
      return array.concat(routes);
    }, []);
    var pathname = location.pathname;
    var match = pick(routes, pathname);

    if (match) {
      var params = match.params,
          uri = match.uri,
          route = match.route,
          element = match.route.value; // remove the /* from the end for child routes relative paths

      basepath = route.default ? basepath : route.path.replace(/\*$/, "");

      var props = es_extends({}, params, {
        uri: uri,
        location: location,
        navigate: function navigate(to, options) {
          return _navigate2(resolve(to, uri), options);
        }
      });

      var clone = react.cloneElement(element, props, element.props.children ? react.createElement(Router, {
        location: location,
        primary: primary
      }, element.props.children) : undefined); // using 'div' for < 16.3 support

      var FocusWrapper = primary ? FocusHandler : component; // don't pass any props to 'div'

      var wrapperProps = primary ? es_extends({
        uri: uri,
        location: location,
        component: component
      }, domProps) : domProps;
      return react.createElement(BaseContext.Provider, {
        value: {
          baseuri: uri,
          basepath: basepath,
          navigate: props.navigate
        }
      }, react.createElement(FocusWrapper, wrapperProps, clone));
    } else {
      // Not sure if we want this, would require index routes at every level
      // warning(
      //   false,
      //   `<Router basepath="${basepath}">\n\nNothing matched:\n\t${
      //     location.pathname
      //   }\n\nPaths checked: \n\t${routes
      //     .map(route => route.path)
      //     .join(
      //       "\n\t"
      //     )}\n\nTo get rid of this warning, add a default NotFound component as child of Router:
      //   \n\tlet NotFound = () => <div>Not Found!</div>
      //   \n\t<Router>\n\t  <NotFound default/>\n\t  {/* ... */}\n\t</Router>`
      // );
      return null;
    }
  };

  return RouterImpl;
}(react.PureComponent);

RouterImpl.defaultProps = {
  primary: true
};
var FocusContext = createNamedContext("Focus");

var FocusHandler = function FocusHandler(_ref3) {
  var uri = _ref3.uri,
      location = _ref3.location,
      component = _ref3.component,
      domProps = _objectWithoutProperties(_ref3, ["uri", "location", "component"]);

  return react.createElement(FocusContext.Consumer, null, function (requestFocus) {
    return react.createElement(FocusHandlerImpl, es_extends({}, domProps, {
      component: component,
      requestFocus: requestFocus,
      uri: uri,
      location: location
    }));
  });
}; // don't focus on initial render


var initialRender = true;
var focusHandlerCount = 0;

var FocusHandlerImpl = function (_React$Component2) {
  _inherits(FocusHandlerImpl, _React$Component2);

  function FocusHandlerImpl() {
    var _temp2, _this4, _ret2;

    _classCallCheck(this, FocusHandlerImpl);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this4), _this4.state = {}, _this4.requestFocus = function (node) {
      if (!_this4.state.shouldFocus && node) {
        node.focus();
      }
    }, _temp2), _possibleConstructorReturn(_this4, _ret2);
  }

  FocusHandlerImpl.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var initial = prevState.uri == null;

    if (initial) {
      return es_extends({
        shouldFocus: true
      }, nextProps);
    } else {
      var myURIChanged = nextProps.uri !== prevState.uri;
      var navigatedUpToMe = prevState.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === nextProps.uri;
      return es_extends({
        shouldFocus: myURIChanged || navigatedUpToMe
      }, nextProps);
    }
  };

  FocusHandlerImpl.prototype.componentDidMount = function componentDidMount() {
    focusHandlerCount++;
    this.focus();
  };

  FocusHandlerImpl.prototype.componentWillUnmount = function componentWillUnmount() {
    focusHandlerCount--;

    if (focusHandlerCount === 0) {
      initialRender = true;
    }
  };

  FocusHandlerImpl.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location && this.state.shouldFocus) {
      this.focus();
    }
  };

  FocusHandlerImpl.prototype.focus = function focus() {
    if (false) {}

    var requestFocus = this.props.requestFocus;

    if (requestFocus) {
      requestFocus(this.node);
    } else {
      if (initialRender) {
        initialRender = false;
      } else if (this.node) {
        // React polyfills [autofocus] and it fires earlier than cDM,
        // so we were stealing focus away, this line prevents that.
        if (!this.node.contains(document.activeElement)) {
          this.node.focus();
        }
      }
    }
  };

  FocusHandlerImpl.prototype.render = function render() {
    var _this5 = this;

    var _props2 = this.props,
        children = _props2.children,
        style = _props2.style,
        requestFocus = _props2.requestFocus,
        _props2$component = _props2.component,
        Comp = _props2$component === undefined ? "div" : _props2$component,
        uri = _props2.uri,
        location = _props2.location,
        domProps = _objectWithoutProperties(_props2, ["children", "style", "requestFocus", "component", "uri", "location"]);

    return react.createElement(Comp, es_extends({
      style: es_extends({
        outline: "none"
      }, style),
      tabIndex: "-1",
      ref: function ref(n) {
        return _this5.node = n;
      }
    }, domProps), react.createElement(FocusContext.Provider, {
      value: this.requestFocus
    }, this.props.children));
  };

  return FocusHandlerImpl;
}(react.Component);

(0,react_lifecycles_compat/* polyfill */.O)(FocusHandlerImpl);

var k = function k() {}; ////////////////////////////////////////////////////////////////////////////////


var forwardRef = react.forwardRef;

if (typeof forwardRef === "undefined") {
  forwardRef = function forwardRef(C) {
    return C;
  };
}

var Link = forwardRef(function (_ref4, ref) {
  var innerRef = _ref4.innerRef,
      props = _objectWithoutProperties(_ref4, ["innerRef"]);

  return react.createElement(BaseContext.Consumer, null, function (_ref5) {
    var basepath = _ref5.basepath,
        baseuri = _ref5.baseuri;
    return react.createElement(Location, null, function (_ref6) {
      var location = _ref6.location,
          navigate = _ref6.navigate;

      var to = props.to,
          state = props.state,
          replace = props.replace,
          _props$getProps = props.getProps,
          getProps = _props$getProps === undefined ? k : _props$getProps,
          anchorProps = _objectWithoutProperties(props, ["to", "state", "replace", "getProps"]);

      var href = resolve(to, baseuri);
      var encodedHref = encodeURI(href);
      var isCurrent = location.pathname === encodedHref;
      var isPartiallyCurrent = startsWith(location.pathname, encodedHref);
      return react.createElement("a", es_extends({
        ref: ref || innerRef,
        "aria-current": isCurrent ? "page" : undefined
      }, anchorProps, getProps({
        isCurrent: isCurrent,
        isPartiallyCurrent: isPartiallyCurrent,
        href: href,
        location: location
      }), {
        href: href,
        onClick: function onClick(event) {
          if (anchorProps.onClick) anchorProps.onClick(event);

          if (shouldNavigate(event)) {
            event.preventDefault();
            var shouldReplace = replace;

            if (typeof replace !== "boolean" && isCurrent) {
              var _location$state = es_extends({}, location.state),
                  key = _location$state.key,
                  restState = _objectWithoutProperties(_location$state, ["key"]);

              shouldReplace = shallowCompare(es_extends({}, state), restState);
            }

            navigate(href, {
              state: state,
              replace: shouldReplace
            });
          }
        }
      }));
    });
  });
});
Link.displayName = "Link";
 false ? 0 : void 0; ////////////////////////////////////////////////////////////////////////////////

function RedirectRequest(uri) {
  this.uri = uri;
}

var isRedirect = function isRedirect(o) {
  return o instanceof RedirectRequest;
};

var redirectTo = function redirectTo(to) {
  throw new RedirectRequest(to);
};

var RedirectImpl = function (_React$Component3) {
  _inherits(RedirectImpl, _React$Component3);

  function RedirectImpl() {
    _classCallCheck(this, RedirectImpl);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  } // Support React < 16 with this hook


  RedirectImpl.prototype.componentDidMount = function componentDidMount() {
    var _props3 = this.props,
        navigate = _props3.navigate,
        to = _props3.to,
        from = _props3.from,
        _props3$replace = _props3.replace,
        replace = _props3$replace === undefined ? true : _props3$replace,
        state = _props3.state,
        noThrow = _props3.noThrow,
        baseuri = _props3.baseuri,
        props = _objectWithoutProperties(_props3, ["navigate", "to", "from", "replace", "state", "noThrow", "baseuri"]);

    Promise.resolve().then(function () {
      var resolvedTo = resolve(to, baseuri);
      navigate(insertParams(resolvedTo, props), {
        replace: replace,
        state: state
      });
    });
  };

  RedirectImpl.prototype.render = function render() {
    var _props4 = this.props,
        navigate = _props4.navigate,
        to = _props4.to,
        from = _props4.from,
        replace = _props4.replace,
        state = _props4.state,
        noThrow = _props4.noThrow,
        baseuri = _props4.baseuri,
        props = _objectWithoutProperties(_props4, ["navigate", "to", "from", "replace", "state", "noThrow", "baseuri"]);

    var resolvedTo = resolve(to, baseuri);
    if (!noThrow) redirectTo(insertParams(resolvedTo, props));
    return null;
  };

  return RedirectImpl;
}(react.Component);

var Redirect = function Redirect(props) {
  return react.createElement(BaseContext.Consumer, null, function (_ref7) {
    var baseuri = _ref7.baseuri;
    return react.createElement(Location, null, function (locationContext) {
      return react.createElement(RedirectImpl, es_extends({}, locationContext, {
        baseuri: baseuri
      }, props));
    });
  });
};

 false ? 0 : void 0; ////////////////////////////////////////////////////////////////////////////////

var Match = function Match(_ref8) {
  var path = _ref8.path,
      children = _ref8.children;
  return react.createElement(BaseContext.Consumer, null, function (_ref9) {
    var baseuri = _ref9.baseuri;
    return react.createElement(Location, null, function (_ref10) {
      var navigate = _ref10.navigate,
          location = _ref10.location;
      var resolvedPath = resolve(path, baseuri);
      var result = match(resolvedPath, location.pathname);
      return children({
        navigate: navigate,
        location: location,
        match: result ? es_extends({}, result.params, {
          uri: result.uri,
          path: path
        }) : null
      });
    });
  });
}; ////////////////////////////////////////////////////////////////////////////////
// Hooks


var useLocation = function useLocation() {
  var context = (0,react.useContext)(LocationContext);

  if (!context) {
    throw new Error("useLocation hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  return context.location;
};

var useNavigate = function useNavigate() {
  var context = (0,react.useContext)(BaseContext);

  if (!context) {
    throw new Error("useNavigate hook was used but a BaseContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  return context.navigate;
};

var useParams = function useParams() {
  var context = (0,react.useContext)(BaseContext);

  if (!context) {
    throw new Error("useParams hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  var location = useLocation();
  var results = match(context.basepath, location.pathname);
  return results ? results.params : null;
};

var useMatch = function useMatch(path) {
  if (!path) {
    throw new Error("useMatch(path: string) requires an argument of a string to match against");
  }

  var context = (0,react.useContext)(BaseContext);

  if (!context) {
    throw new Error("useMatch hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  var location = useLocation();
  var resolvedPath = resolve(path, context.baseuri);
  var result = match(resolvedPath, location.pathname);
  return result ? es_extends({}, result.params, {
    uri: result.uri,
    path: path
  }) : null;
}; ////////////////////////////////////////////////////////////////////////////////
// Junk


var stripSlashes = function stripSlashes(str) {
  return str.replace(/(^\/+|\/+$)/g, "");
};

var createRoute = function createRoute(basepath) {
  return function (element) {
    if (!element) {
      return null;
    }

    if (element.type === react.Fragment && element.props.children) {
      return react.Children.map(element.props.children, createRoute(basepath));
    }

    !(element.props.path || element.props.default || element.type === Redirect) ?  false ? 0 : browser_default()(false) : void 0;
    !!(element.type === Redirect && (!element.props.from || !element.props.to)) ?  false ? 0 : browser_default()(false) : void 0;
    !!(element.type === Redirect && !validateRedirect(element.props.from, element.props.to)) ?  false ? 0 : browser_default()(false) : void 0;

    if (element.props.default) {
      return {
        value: element,
        default: true
      };
    }

    var elementPath = element.type === Redirect ? element.props.from : element.props.path;
    var path = elementPath === "/" ? basepath : stripSlashes(basepath) + "/" + stripSlashes(elementPath);
    return {
      value: element,
      default: element.props.default,
      path: element.props.children ? stripSlashes(path) + "/*" : path
    };
  };
};

var shouldNavigate = function shouldNavigate(event) {
  return !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}; ////////////////////////////////////////////////////////////////////////




/***/ }),

/***/ 1143:
/***/ (function(module) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {}

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ 907:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ _arrayLikeToArray; }
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),

/***/ 1721:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ _inheritsLoose; }
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

/***/ }),

/***/ 2982:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ _toConsumableArray; }
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
var arrayLikeToArray = __webpack_require__(907);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,arrayLikeToArray/* default */.Z)(arr);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__(181);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || (0,unsupportedIterableToArray/* default */.Z)(arr) || _nonIterableSpread();
}

/***/ }),

/***/ 181:
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ _unsupportedIterableToArray; }
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(907);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z)(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__/* .default */ .Z)(o, minLen);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, [774], function() { return __webpack_exec__(9917); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=app-40d97924d0af922f4d71.js.map