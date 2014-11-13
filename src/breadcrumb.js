export class Breadcrumb {

  constructor(route, path) {
    this.name = route.name || null;
    this.path = path || '/';
    this.$$route = route;
  }

  updateName(names) {
    var override = getNameOverride(this, names);
    this.name = override || this.$$route.name || null;
  }
}

function getNameOverride(breadcrumb, names) {
  var name = null;

  if (names) {
    angular.forEach(names, function(n, path) {
      if (!name && breadcrumb.$$route.regexp.test(path))
        name = n;
    });
  }

  return name;
}
