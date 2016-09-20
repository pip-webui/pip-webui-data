/**
 * @file PipData API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataParty', ['pipDataConfig', 'pipRest', 'pipDataSession']);

    thisModule.provider('pipDataParty', function () {

        this.readPartiesResolver = function () {
            return /* @ngInject */ function ($rootScope, $stateParams, pipRest, pipDataSession) {
                            var userId = pipDataSession.userId();
                            var partyId = $stateParams.party_id || userId;

                            if (partyId != userId)
                                throw('ERROR_NOT_ALLOWED');
                            return pipRest.parties().get({ id: partyId }).$promise;
                        }
        }

        this.$get = function (pipRest, pipDataConfig) {

           var fromServerFormat = function(party) {
                    return party;
                    // return {
                    //     name: party.name,
                    //     email: party.email,
                    //     type: party.type,
                    //     join: party.join,
                    //     updated: party.updated,
                    //     id: party.id
                    // }
                },

                toServerFormat = function(party) {
                    return party;
                    // return {
                    //     name: party.name,
                    //     email: party.email,
                    //     type: party.type,
                    //     join: party.join,
                    //     updated: party.updated,
                    //     id: party.id
                    // }                    
                },

                fromServerError = function(error) {
                    // TODO: add mapping for demonstration of fields
                    return error;
                };

            return {
                readParty: function(id) {
                    params.resource = 'parties';
                    params.item = params.item || {};
                    params.item.id = pipRest.partyId($stateParams);
                    return pipDataModel.readOne(params, successCallback, errorCallback);
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