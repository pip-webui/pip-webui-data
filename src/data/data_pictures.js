/**
 * @file PipData Pictures API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataPicture', ['pipDataConfig', 'pipDataSession', 'angularFileUpload']);

    thisModule.provider('pipDataPicture', function () {

        this.$get = function ($http, $upload, pipDataConfig, pipDataSession) {

            var fromServerFormat = function(picture) {
                    return picture;
                    // return {
                    //     id: picture.id,
                    //     name: picture.name,
                    //     content_type: picture.content_type,
                    //     length: picture.length,
                    //     party_id: picture.party_id,
                    //     creator_id: picture.creator_id,
                    //     created: picture.created,
                    //     refs: picture.refs,
                    //     url: picture.url
                    // }
            }, 
            fromServerError = function(error) {
                    // TODO: add mapping for demonstration of fields
                    return error;
            };

            return {

                getPictureUrl: getPictureUrl,
                getPicturePostUrl: getPicturePostUrl,
                getPictureContentUrl: getPictureContentUrl,
                deletePicture: deletePicture,
                createPicture: createPicture,
                createPictureByUrl: createPictureByUrl

            }

                function getPictureUrl(id) {
                    var userId = pipDataSession.userId(),
                        partyId = pipDataSession.partyId() || userId

                    return pipDataConfig.serverUrl() + '/api/parties/' + partyId + '/files/' + id;
                }

                function getPicturePostUrl(filter) {
                    var userId = pipDataSession.userId(),
                        partyId = pipDataSession.partyId() || userId

                    return pipDataConfig.serverUrl() + '/api/parties/' + partyId + '/files?name=' + filter;
                }

                function getPictureContentUrl(id) {
                    var userId = pipDataSession.userId(),
                        partyId = pipDataSession.partyId() || userId

                    return pipDataConfig.serverUrl() + '/api/parties/' + partyId + '/files/' + id + '/content';
                }

                function deletePicture(id, successCallback, errorCallback) {
                    $http({
                        method: 'DELETE',
                        url: getPictureUrl(id)
                    }).then(successCallback, function(error) {
                        errorCallback(fromServerError(error));
                    });
                }

                function createPicture(params, successCallback, errorCallback, progressCallback) {
                    return $upload.http({
                        url: getPicturePostUrl(params.name),
                        headers: { 'Content-Type': params.type },
                        data: params.data
                    }).then( 
                    function(data) {
                        if(successCallback != null) {
                            successCallback(fromServerFormat(data));
                        }
                    }, 
                    function(error) {
                        errorCallback(fromServerError(error));
                    }, progressCallback);
                }

                function createPictureByUrl(url, successCallback, errorCallback) {
                    return $http['post'](url)
                         .success(function (data) {
                            if(successCallback != null) {
                                successCallback(fromServerFormat(data));
                            }
                         })
                         .error(function (error) {
                             errorCallback(fromServerError(error));
                         });
                }

        };
    });
})();
