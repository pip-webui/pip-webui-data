/**
 * @file Tags data model
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataTag', ['pipRest' , 'pipDataModel', 'pipCacheTag']);

    thisModule.provider('pipDataTag', function() {
        
        this.readTagsResolver = function() {
            return /* @ngInject */ function($stateParams, pipRest, pipCacheTag) {
                return pipCacheTag.readTags({
                    item: { party_id: pipRest.partyId($stateParams) }
                });
            };
        };

        this.$get = function($stateParams, $state, pipRest, pipDataModel, pipCacheTag) {
            return {
                partyId: pipRest.partyId,
                
                readTags: function(params, successCallback, errorCallback) {
                    params = params || {};
                    params.item = params.item || {};
                    if(params.item.party_id == null) {
                        params.item.party_id = pipRest.partyId($stateParams);
                    }
                    return pipCacheTag.readTags(params, successCallback, errorCallback);
                }
            }
        };
    });

})();
