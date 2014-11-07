(function () {
    'use strict';

    angular
        .module('app')
        .factory('breadcrumbs', breadcrumbs);

    breadcrumbs.$inject = ['$rootScope', '$route', '$location'];
    function breadcrumbs($rootScope, $route, $location) {

        var hops = 0,
            routes = $route.routes,
            breadcrumbs,
            allBreadcrumbs,
            names = {},
            breadcrumbsService = {
                get: get,
                names: names,
                rebuild: buildBreadbrumbs
            };

        function Breadcrumb(route, path) {
            this.name = route.name || null;
            this.path = path || '/';
            this.$$route = route;
        }

        Breadcrumb.create = function (path) {
            var route = getRoute(path);
            return route ? new Breadcrumb(route, path) : null;
        }

        Breadcrumb.prototype.updateName = function () {
            var override = getNameOverride(this);
            this.name = override || this.$$route.name || null;
        };

        activate();

        return breadcrumbsService;

        function activate() {
            $rootScope.$on('$routeChangeSuccess', function (event, current) {
                buildBreadbrumbs();
            });
        }

        function get() {
            return updateBreadcrumbs(breadcrumbs);
        }

        function updateBreadcrumbs(breadcrumbs) {
            if (!breadcrumbs) {

                breadcrumbs = [];

                angular.forEach(allBreadcrumbs, function (breadcrumb) {
                    if (breadcrumb) {
                        breadcrumb.updateName();

                        if (breadcrumb.name)
                            breadcrumbs.push(breadcrumb);
                    }
                });
            }
            return breadcrumbs;
        }

        function getRoute(path) {
            var route;
            angular.forEach(routes, function (r) {
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
            }
            else {
                hops = 0;
                return route;
            }
        }

        function getNameOverride(breadcrumb) {
            var names = breadcrumbsService.names,
                name = null;

            if (names) {
                angular.forEach(names, function (n, path) {
                    if(!name && breadcrumb.$$route.regexp.test(path))
                        name = n;
                });
            }

            return name;
        }

        function buildBreadbrumbs() {

            var index, breadcrumb,
                path = $location.path();

            allBreadcrumbs = [];
            breadcrumbs = null;

            if (path[path.length - 1] === '/')
                path = path.substring(0, path.length - 1);

            do {
                breadcrumb = Breadcrumb.create(path);
                if (breadcrumb)
                    allBreadcrumbs.unshift(breadcrumb);

                index = path.lastIndexOf('/');

                if (index >= 0 && index === path.length - 1)
                    index = path.lastIndexOf('/', path.length - 1);

                if (index >= 0)
                    path = path.substring(0, index);

            } while (index !== -1)
        }
    }

})();
