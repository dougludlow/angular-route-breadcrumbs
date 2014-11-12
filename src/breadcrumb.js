export class Breadcrumb {

  constructor(route, path) {
    this.name = route.name || null;
    this.path = path || '/';
    this.$$route = route;
  }

  updateName() {
    var override = getNameOverride(this);
    this.name = override || this.$$route.name || null;
  }
}

Breadcrumb.create = function(path, routes) {
  var route = getRoute(routes, path);
  return route ? new Breadcrumb(route, path) : null;
}

function getRoute(routes, path) {
  var route;
  angular.forEach(routes, function(r) {
    if (!route && r.regexp && r.regexp.test(path))
      route = getRedirectedRoute(r);
  });
  return route;
}

function getRedirectedRoute(route) {
  if (hops > 5) { // for sanity
    hops = 0
    return null;
  }

  route = route.redirectTo ? routes[route.redirectTo] : route;

  if (route.redirectTo) {
    hops++;
    return getRedirectedRoute(route);
  } else {
    hops = 0;
    return route;
  }
}

function getNameOverride(breadcrumb) {
  var names = breadcrumbsService.names,
    name = null;

  if (names) {
    angular.forEach(names, function(n, path) {
      if (!name && breadcrumb.$$route.regexp.test(path))
        name = n;
    });
  }

  return name;
}
