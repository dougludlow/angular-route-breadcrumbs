import Breadcrumb from 'breadcrumb'﻿;

(function () {
    'use strict';

    angular
        .module('angular-route-breadcrumbs', [])
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
