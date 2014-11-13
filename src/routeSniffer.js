export default class RouteSniffer {
  contructor(routes) {
    this.routes = routes;
  }

  getRoute(path) {
    var route;
    angular.forEach(this.routes, function(r) {
      if (!route && r.regexp && r.regexp.test(path))
        route = getRedirectedRoute(r);
    });
    return route;
  }

  getRedirectedRoute(route) {
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
}
