/**
 * @file PipData API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataConfig', ['pipRest']);

    thisModule.provider('pipDataConfig', function (pipRestProvider) {

        pipRestProvider.version('1.0');

        this.version = function (newVersion) {
            pipRestProvider.version(newVersion);
        };

        this.serverUrlFixed = function (value) {
            pipRestProvider.serverUrlFixed(value);
        };

        this.serverUrl = function (newServerUrl) {
            pipRestProvider.serverUrl(newServerUrl);
        };

        this.$get = function ($rootScope, $http, $resource, pipRest) {

            return {

                serverUrl: function (newServerUrl) {
                    return pipRest.serverUrl(newServerUrl);
                },

                serverUrlFixed: function () {
                    return pipRest.serverUrlFixed(serverUrlFixed);
                },
                
                about: function(successCallback, errorCallback) {
                    return pipRest.about().call({},
                    // TODO: add mapping? 
                    successCallback, 
                    errorCallback);
                },
            };
        };
    });
})();
