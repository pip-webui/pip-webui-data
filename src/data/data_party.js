/**
 * @file PipData API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataParty', ['pipDataConfig', 'pipRest']);

    thisModule.provider('pipDataParty', function () {

        this.$get = function (pipRest, pipDataConfig) {

           var fromServerFormat = function(party) {
                    // TODO: add mapping for demonstration of fields
                    return party;
                },

                toServerFormat = function(party) {
                    // TODO: add mapping for demonstration of fields
                    return party;
                },

                fromServerError = function(error) {
                    // TODO: add mapping for demonstration of fields
                    return error;
                };

            return {

                getParty: function(id) {
                    // TODO

                },

                createParty: function(data, successCallback, errorCallback) {
                    pipRest.parties().update(
                        toServerFormat(data),
                        function(party) {
                            successCallback(fromServerFormat(party));
                        }, errorCallback);
                },

                updateParty: function(data, successCallback, errorCallback) {
                    pipRest.parties().update(
                        toServerFormat(data),
                        function(party) {
                            successCallback(fromServerFormat(party));
                        }, function(error) {
                            errorCallback(fromServerError(error));
                        });
                },                

                partySettings: function () {
                    return pipRest.partySettings();
                }
            };
        };
    });
})();