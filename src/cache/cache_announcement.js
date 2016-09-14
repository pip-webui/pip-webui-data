/**
 * @file Announces data cache
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipCacheAnnouncement', ['pipDataAnnouncement']);

    thisModule.service('pipCacheAnnouncement',
        function (pipEnums, pipDataCache, pipCacheTag) {

            return {
                readAnnounces: readAnnounces,
                onAnnounceCreate: onAnnounceCreate,
                onAnnounceUpdate: onAnnounceUpdate,
                onAnnounceDelete: onAnnounceDelete                
            };

            function readAnnounces(params, successCallback, errorCallback) {
                params = params || {};
                params.resource = 'announces';
                params.item = params.item || {};

                return pipDataCache.retrieveOrLoad(params, successCallback, errorCallback);
            }
            
            function onAnnounceCreate(params, successCallback) {
                return pipDataCache.addDecorator(
                    'announces', params,
                    pipCacheTag.tagsUpdateDecorator(params, successCallback)
                );
            }

            function onAnnounceUpdate(params, successCallback) {
                return pipDataCache.updateDecorator(
                    'announces', params,
                    pipCacheTag.tagsUpdateDecorator(params, successCallback)
                );
            }

            function onAnnounceDelete(params, successCallback) {
                return pipDataCache.removeDecorator('announces', params, successCallback);
            }
                        
        }
    );

})();

