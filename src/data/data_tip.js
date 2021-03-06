/**
 * @file Tips data model
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataTip', ['pipRest', 'pipDataModel']);

    thisModule.provider('pipDataTip', function () {
        var PAGE_SIZE = 100;

        // Read all tips
        this.readTipsResolver = function () {
            return /* @ngInject */ function ($stateParams, pipRest) {
                return pipRest.tips().query().$promise;
            };
        };

        this.readTipResolver = function () {
            return /* @ngInject */ function ($stateParams, pipRest) {
                return pipRest.tips().get({
                    id: $stateParams.id
                }).$promise;
            };
        };

        // CRUD operations and other business methods
        this.$get = function (pipRest, $stateParams, pipDataModel, pipCacheTip) {

            return {
                partyId: pipRest.partyId,

// todo update after optimization rezolver
                readTips: function (params, successCallback, errorCallback) {
                    params.resource = 'tips';
                    params.item = params.item || {};
                    params.item.search = $stateParams.search;
                    params.item.tags = $stateParams.search;
                    params.item.party_id = pipRest.partyId($stateParams);
                    return pipCacheTip.readTips(params, successCallback, errorCallback);
                },

                readTip: function (params, successCallback, errorCallback) {
                    params.resource = 'tips';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    params.item.id = params.item.id || $stateParams.id;
                    return pipDataModel.readOne(params, pipCacheTip.onTipsUpdate(params, successCallback), errorCallback);
                },

                createTip: function (params, successCallback, errorCallback) {
                    params.resource = 'tips';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    pipDataModel.create(
                        params,
                        pipCacheTip.onTipCreate(params, successCallback),
                        errorCallback
                    );
                },
                
                createTipWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'tips';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        
                        params.item.party_id = pipRest.partyId($stateParams);
                        pipDataModel.create(
                            params,
                            pipCacheTip.onTipCreate(params, successCallback),
                            errorCallback
                        );
                    }, errorCallback);
                },

                updateTip: function (params, successCallback, errorCallback) {
                    params.resource = 'tips';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    pipDataModel.update(
                        params,
                        pipCacheTip.onTipUpdate(params, successCallback),
                        errorCallback
                    );
                },
                
                updateTipWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'tips';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        
                        params.item.party_id = pipRest.partyId($stateParams);
                        pipDataModel.update(
                            params,
                            pipCacheTip.onTipUpdate(params, successCallback),
                            errorCallback
                        );
                    });
                },

                deleteTip: function(params, successCallback, errorCallback) {
                    params.resource = 'tips';
                    pipDataModel.remove(params, pipCacheTip.onTipDelete(params, successCallback), errorCallback);
                }
            }
        };
    });

})();
