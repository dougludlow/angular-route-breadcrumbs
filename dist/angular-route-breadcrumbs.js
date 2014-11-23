(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, l, l.exports, e, t, n, r)
    }
    return n[o].exports
  }
  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s
})({
  1: [function(require, module, exports) {
    "use strict";

    (function(angular) {
      "use strict";

      var BreadcrumbService = require('./breadcrumbService').default;


      angular.module("angular-route-breadcrumbs", []).factory("breadcrumbs", BreadcrumbsService);
    })(window.angular);

  }, {
    "./breadcrumbService": 4
  }],
  2: [function(require, module, exports) {
    "use strict";

    var _classProps = function(child, staticProps, instanceProps) {
      if (staticProps) Object.defineProperties(child, staticProps);
      if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
    };

    var Breadcrumb = (function() {
      var Breadcrumb = function Breadcrumb(route, path) {
        this.name = route.name || null;
        this.path = path || "/";
        this.$$route = route;
      };

      _classProps(Breadcrumb, null, {
        updateName: {
          writable: true,
          value: function(names) {
            var override = getNameOverride(this, names);
            this.name = override || this.$$route.name || null;
          }
        }
      });

      return Breadcrumb;
    })();

    exports.Breadcrumb = Breadcrumb;


    function getNameOverride(breadcrumb, names) {
      var name = null;

      if (names) {
        angular.forEach(names, function(n, path) {
          if (!name && breadcrumb.$$route.regexp.test(path)) name = n;
        });
      }

      return name;
    }

  }, {}],
  3: [function(require, module, exports) {
    "use strict";

    var _classProps = function(child, staticProps, instanceProps) {
      if (staticProps) Object.defineProperties(child, staticProps);
      if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
    };

    var Breadcrumb = require('./breadcrumb').default;


    var sniffer;

    var BreadcrumbBuilder = (function() {
      var BreadcrumbBuilder = function BreadcrumbBuilder(routeSniffer) {
        sniffer = routeSniffer;
      };

      _classProps(BreadcrumbBuilder, null, {
        createBreadcrumb: {
          writable: true,
          value: function(path) {
            var route = sniffer.getRoute(path);
            return route ? new Breadcrumb(route, path) : null;
          }
        },
        build: {
          writable: true,
          value: function(path) {
            var index, breadcrumb, breadcrumbs = [];

            if (path[path.length - 1] === "/") path = path.substring(0, path.length - 1);

            do {
              breadcrumb = createBreadcrumb(path);
              if (breadcrumb) breadcrumbs.unshift(breadcrumb);

              index = path.lastIndexOf("/");

              if (index >= 0 && index === path.length - 1) index = path.lastIndexOf("/", path.length - 1);

              if (index >= 0) path = path.substring(0, index);
            } while (index !== -1);

            return breadcrumb;
          }
        },
        update: {
          writable: true,
          value: function(breadcrumbs, names) {
            angular.forEach(breadcrumbs, function(breadcrumb) {
              if (breadcrumb) {
                breadcrumb.updateName(names);

                if (breadcrumb.name) breadcrumbs.push(breadcrumb);
              }
            });

            return breadcrumbs;
          }
        }
      });

      return BreadcrumbBuilder;
    })();

    exports.default = BreadcrumbBuilder;

  }, {
    "./breadcrumb": 2
  }],
  4: [function(require, module, exports) {
    "use strict";

    var _classProps = function(child, staticProps, instanceProps) {
      if (staticProps) Object.defineProperties(child, staticProps);
      if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
    };

    var RouteSniffer = require('./routeSniffer').default;
    var BreadcrumbBuilder = require('./breadcrumbBuilder').default;


    var location, breadcrumbs, filteredBreadcrumbs, sniffer, builder;

    var BreadcrumbService = (function() {
      var BreadcrumbService = function BreadcrumbService($rootScope, $route, $location) {
        location = $location;
        sniffer = new RouteSniffer($route.routes);
        builder = new BreadcrumbBuilder(sniffer);

        $rootScope.$on("$routeChangeSuccess", function(event, current) {
          rebuild();
        });
      };

      _classProps(BreadcrumbService, null, {
        get: {
          writable: true,
          value: function() {
            if (!filteredBreadcrumbs) {
              filteredBreadcrumbs = [];
              filteredBreadcrumbs = builder.update(breadcrumbs, this.names);
            }
            return filteredBreadcrumbs;
          }
        },
        rebuild: {
          writable: true,
          value: function() {
            filteredBreadcrumbs = null;
            breadcrumbs = builder.build(location.path());
          }
        }
      });

      return BreadcrumbService;
    })();

    exports.default = BreadcrumbService;

  }, {
    "./breadcrumbBuilder": 3,
    "./routeSniffer": 5
  }],
  5: [function(require, module, exports) {
    "use strict";

    var _classProps = function(child, staticProps, instanceProps) {
      if (staticProps) Object.defineProperties(child, staticProps);
      if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
    };

    var hops;

    var RouteSniffer = (function() {
      var RouteSniffer = function RouteSniffer(routes) {
        this.routes = routes;
      };

      _classProps(RouteSniffer, null, {
        getRoute: {
          writable: true,
          value: function(path) {
            var route = null;
            angular.forEach(this.routes, function(r) {
              if (!route && r.regexp && r.regexp.test(path)) route = getRedirectedRoute(r);
            });
            return route;
          }
        },
        getRedirectedRoute: {
          writable: true,
          value: function(route) {
            if (hops > 5) {
              // for sanity
              hops = 0;
              return null;
            }

            route = route.redirectTo ? this.routes[route.redirectTo] : route;

            if (route.redirectTo) {
              hops++;
              return getRedirectedRoute(route);
            } else {
              hops = 0;
              return route;
            }
          }
        }
      });

      return RouteSniffer;
    })();

    exports.default = RouteSniffer;

  }, {}]
}, {}, [1, 2, 3, 4, 5]);
