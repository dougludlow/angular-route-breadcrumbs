import Breadcrumb from './breadcrumb'﻿;

var sniffer;

export default class BreadcrumbBuilder {

  constructor(routeSniffer) {
    sniffer = routeSniffer;
  }

  createBreadcrumb(path) {
    var route = sniffer.getRoute(path);
    return route ? new Breadcrumb(route, path) : null;
  }

  build(path) {
    var index, breadcrumb,
      breadcrumbs = [];

    if (path[path.length - 1] === '/')
      path = path.substring(0, path.length - 1);

    do {
      breadcrumb = createBreadcrumb(path);
      if (breadcrumb)
        breadcrumbs.unshift(breadcrumb);

      index = path.lastIndexOf('/');

      if (index >= 0 && index === path.length - 1)
        index = path.lastIndexOf('/', path.length - 1);

      if (index >= 0)
        path = path.substring(0, index);

    } while (index !== -1)

    return breadcrumb;
  }

  update(breadcrumbs, names) {
    angular.forEach(breadcrumbs, function (breadcrumb) {
        if (breadcrumb) {
            breadcrumb.updateName(names);

            if (breadcrumb.name)
                breadcrumbs.push(breadcrumb);
        }
    });

    return breadcrumbs;
  }
}
