/**
 * @file Guides data cache
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipCacheGuide', ['pipDataGuide', 'pipCacheTag']);

    thisModule.service('pipCacheGuide',
        function (pipEnums, pipDataCache, pipCacheTag) {

            return {
                readGuides: readGuides,
                onGuideCreate: onGuideCreate,
                onGuideUpdate: onGuideUpdate,
                onGuideDelete: onGuideDelete                
            };

            function readGuides(params, successCallback, errorCallback) {
                params = params || {};
                params.resource = 'guides';
                params.item = params.item || {};

                return pipDataCache.retrieveOrLoad(params, successCallback, errorCallback);
            };
            
            function onGuideCreate(params, successCallback) {
                return pipDataCache.addDecorator(
                    'guides', params,
                    pipCacheTag.tagsUpdateDecorator(params, successCallback)
                );
            };

            function onGuideUpdate(params, successCallback) {
                return pipDataCache.updateDecorator(
                    'guides', params,
                    pipCacheTag.tagsUpdateDecorator(params, successCallback)
                );
            };

            function onGuideDelete(params, successCallback) {
                return pipDataCache.removeDecorator('guides', params, successCallback);
            };
                        
        }
    );

})();

