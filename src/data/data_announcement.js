/**
 * @file Announces data model
 * @copyright Digital Living Software Corp. 2014-2016
 */
 
 /* global angular */
 
(function () {
    'use strict';

    var thisModule = angular.module('pipDataAnnouncement', ['pipRest', 'pipDataModel', 'pipCacheAnnouncement']);

    thisModule.provider('pipDataAnnouncement', function () {

        // Read all announces
        this.readAnnouncesResolver = function () {
            return /* @ngInject */ function ($stateParams, pipRest, pipEnums) {
                return pipRest.announces().query().$promise;
            };
        };

        this.readCompletedAnnouncesResolver = function () {
            return /* @ngInject */ function ($stateParams, pipRest, pipEnums) {
                return pipRest.announces().query( {
                        status: pipEnums.EXECUTION_STATUS.COMPLETED
                    }
                ).$promise;
            };
        };

        this.readAnnounceResolver = function () {
            return /* @ngInject */ function ($stateParams, pipRest) {
                return pipRest.announces().get({
                    id: $stateParams.id
                }).$promise;
            };
        };

        // CRUD operations and other business methods
        this.$get = function (pipRest, $stateParams, pipDataModel, pipCacheAnnouncement) {
            return {
                partyId: pipRest.partyId,
                readAnnounces: function (params, successCallback, errorCallback) {
                    params.resource = 'announces';
                    params.item = params.item || {};
                    params.item.search = $stateParams.search;
                    params.item.tags = $stateParams.search;
                    params.item.party_id = pipRest.partyId($stateParams);
                    return pipCacheAnnouncement.readAnnounces(params, successCallback, errorCallback);
                },

                updateAnnounce: function (params, successCallback, errorCallback) {
                    params.resource = 'announces';
                    params.skipTransactionBegin = true;
                    params.skipTransactionEnd = false;
                    pipDataModel.update(
                        params,
                        pipCacheAnnouncement.onAnnounceCreate(params, successCallback),
                        errorCallback
                    );
                },
                
                updateAnnounceWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'announces';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        pipDataModel.update(
                            params,
                            pipCacheAnnouncement.onAnnounceUpdate(params, successCallback),
                            errorCallback
                        );
                    });
                },

                createAnnounceWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'announces';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        pipDataModel.create(
                            params,
                            pipCacheAnnouncement.onAnnounceCreate(params, successCallback),
                            errorCallback
                        );
                    });
                },
                
                createAnnounce: function (params, successCallback, errorCallback) {
                    params.resource = 'announces';
                    params.skipTransactionBegin = true;
                    params.skipTransactionEnd = false;
                    pipDataModel.create(
                        params,
                        pipCacheAnnouncement.onAnnounceCreate(params, successCallback),
                        errorCallback
                    );
                },

                deleteAnnounce: function(params, successCallback, errorCallback) {
                    params.resource = 'announces';
                    pipDataModel.remove(params, pipCacheAnnouncement.onAnnounceDelete(params, successCallback), errorCallback);
                }
            }
        };
    });

})();