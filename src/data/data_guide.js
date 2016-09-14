/**
 * @file Guides data model
 * @copyright Digital Living Software Corp. 2014-2016
 */
 
 /* global angular */
 
(function () {
    'use strict';

    var thisModule = angular.module('pipDataGuide', ['pipRest', 'pipDataModel']);

    thisModule.provider('pipDataGuide', function () {
        var PAGE_SIZE = 5;

        // CRUD operations and other business methods
        this.$get = function (pipRest, $stateParams, pipDataModel, pipCacheGuide) {
            return {
                partyId: pipRest.partyId,

                readGuides: function(params, successCallback, errorCallback) {
                    params.resource = 'guides';
                    params.party_id = pipRest.partyId($stateParams);
                    return pipCacheGuide.readGuides(params, successCallback, errorCallback);
                },

                readIntroGuides: function(params, successCallback, errorCallback) {
                    params.resource = 'guides';
                    params.party_id = pipRest.partyId($stateParams);
                    params.type = 'intro';
                    params.status = 'completed';
                    return pipCacheGuide.readGuides(params, successCallback, errorCallback);
                },

                readGuide: function (params, successCallback, errorCallback) {
                    params.resource = 'guides';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    params.item.id = params.item.id || $stateParams.id;
                    return pipDataModel.readOne(params, pipCacheGuide.onGuideUpdate(params, successCallback), errorCallback);
                },

                createGuide: function (params, successCallback, errorCallback) {
                    params.resource =  'guides';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    pipDataModel.create(
                        params,
                        pipCacheGuide.onGuideCreate(params, successCallback),
                        errorCallback
                    );
                },

                createGuideWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'guides';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        pipDataModel.create(
                            params,
                            pipCacheGuide.onGuideCreate(params, successCallback),
                            errorCallback
                        );
                    });
                },

                updateGuide: function (params, successCallback, errorCallback) {
                    params.resource = 'guides';
                    params.skipTransactionBegin = true;
                    params.skipTransactionEnd = false;
                    pipDataModel.update(
                        params,
                        pipCacheGuide.onGuideUpdate(params, successCallback),
                        errorCallback
                    );
                },
                
                updateGuideWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'guides';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        pipDataModel.update(
                            params,
                            pipCacheGuide.onGuideUpdate(params, successCallback),
                            errorCallback
                        );
                    });
                },

                
                deleteGuide: function(params, successCallback, errorCallback) {
                    params.resource = 'guides';
                    pipDataModel.remove(params, pipCacheGuide.onGuideDelete(params, successCallback),  errorCallback);
                }

            }
        };
    });

})();