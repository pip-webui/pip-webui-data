/**
 * @file ImageSets data cache
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipCacheImageSet', ['pipDataImageSets']);

    thisModule.service('pipCacheImageSet',
        function (pipEnums, pipDataCache, pipCacheTag) {

            return {
                readImageSets: readImageSets,
                onImageSetCreate: onImageSetCreate,
                onImageSetUpdate: onImageSetUpdate,
                onImageSetDelete: onImageSetDelete                
            };

            function readImageSets(params, successCallback, errorCallback) {
                params = params || {};
                params.resource = 'image_sets';
                params.item = params.item || {};

                return pipDataCache.retrieveOrLoad(params, successCallback, errorCallback);
            };
            
            function onImageSetCreate(params, successCallback) {
                return pipDataCache.addDecorator(
                    'image_sets', params,
                    pipCacheTag.tagsUpdateDecorator(params, successCallback)
                );
            };

            function onImageSetUpdate(params, successCallback) {
                return pipDataCache.updateDecorator(
                    'image_sets', params,
                    pipCacheTag.tagsUpdateDecorator(params, successCallback)
                );
            };

            function onImageSetDelete(params, successCallback) {
                return pipDataCache.removeDecorator('image_sets', params, successCallback);
            };
                        
        }
    );

})();

