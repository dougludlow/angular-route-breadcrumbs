(function(angular) {
  'use strict';

  import BreadcrumbService from './breadcrumbService'﻿;

  angular
    .module('angular-route-breadcrumbs', [])
    .factory('breadcrumbs', BreadcrumbsService);
})(window.angular);
