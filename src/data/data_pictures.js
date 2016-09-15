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

                getPictureUrl: function(id) {
                    var userId = pipDataSession.userId(),
                        partyId = pipDataSession.partyId() || userId

                    return pipDataConfig.serverUrl() + '/api/parties/' + partyId + '/files/' + id;
                },


                getPicturePostUrl: function(filter) {
                    var userId = pipDataSession.userId(),
                        partyId = pipDataSession.partyId() || userId

                    return pipDataConfig.serverUrl() + '/api/parties/' + partyId + '/files/?name=' + filter;
                },

                getPictureContentUrl: function(id) {
                    var userId = pipDataSession.userId(),
                        partyId = pipDataSession.partyId() || userId

                    return pipDataConfig.serverUrl() + '/api/parties/' + partyId + '/files/' + id + '/content';
                },

                deletePicture: function(id, successCallback, errorCallback) {
                    $http({
                        method: 'DELETE',
                        url: getPictureUrl(id)
                    }).then(successCallback, function(error) {
                        errorCallback(fromServerError(error));
                    });
                },

                createPicture: function(params, successCallback, errorCallback, progressCallback) {
                    return $upload.http({
                        url: this.getPicturePostUrl(params.name),
                        headers: { 'Content-Type': params.type },
                        data: params.data
                    }, 
                    function(data) {
                        if(successCallback != null) {
                            successCallback(fromServerFormat(data));
                        }
                    }, 
                    function(error) {
                        errorCallback(fromServerError(error));
                    }, progressCallback)
                },

                createPictureByUrl: function(url, successCallback, errorCallback) {
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
        };
    });
})();
