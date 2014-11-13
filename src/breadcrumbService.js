import RouteSniffer from './routeSniffer';
import BreadcrumbBuilder from './breadcrumbBuilder';

var location,
  breadcrumbs, filteredBreadcrumbs,
  sniffer, builder;

export default class BreadcrumbService {

  constructor($rootScope, $route, $location) {

    location = $location;
    sniffer = new RouteSniffer($route.routes);
    builder = new BreadcrumbBuilder(sniffer);

    $rootScope.$on('$routeChangeSuccess', function(event, current) {
      rebuild();
    });
  }

  get() {
    if (!filteredBreadcrumbs) {
      filteredBreadcrumbs = [];
      filteredBreadcrumbs = builder.update(breadcrumbs, this.names);
    }
    return filteredBreadcrumbs;
  }

  rebuild() {
    filteredBreadcrumbs = null;
    breadcrumbs = builder.build(location.path());
  }
}
