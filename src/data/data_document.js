/**
 * @file PipData API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataDocument', ['pipDataConfig', 'pipDataSession', 'angularFileUpload']);

    thisModule.provider('pipDataDocument', function () {

        this.$get = function ($http, $upload, pipDataConfig, pipDataSession) {

            var fromServerFormat = function(document) {
                    return document;
                    // return {
                    //     id: document.id,
                    //     name: document.name,
                    //     content_type: document.content_type,
                    //     length: document.length,
                    //     party_id: document.party_id,
                    //     creator_id: document.creator_id,
                    //     created: document.created,
                    //     refs: document.refs,
                    //     url: document.url
                    // }
            }, 
            fromServerError = function(error) {
                    // TODO: add mapping for demonstration of fields
                    return error;
            };

            return {

                getDocumentUrl: function(id) {
                    var userId = pipDataSession.userId(),
                        partyId = pipDataSession.partyId() || userId

                    return pipDataConfig.serverUrl() + '/api/parties/' + partyId + '/files/' + id;
                },

                getDocumentPostUrl: function(filter) {
                    var userId = pipDataSession.userId(),
                        partyId = pipDataSession.partyId() || userId

                    return pipDataConfig.serverUrl() + '/api/parties/' + partyId + '/files/?name=' + filter;
                },

                getDocumentContentUrl: function(id) {
                    var userId = pipDataSession.userId(),
                        partyId = pipDataSession.partyId() || userId

                    return pipDataConfig.serverUrl() + '/api/parties/' + partyId + '/files/' + id + '/content';
                },

                deleteDocument: function(id, successCallback, errorCallback) {
                    $http({
                        method: 'DELETE',
                        url: getDocumentUrl(id)
                    }).then(successCallback, function(error) {
                        errorCallback(fromServerError(error));
                    });
                },

                createDocument: function(params, successCallback, errorCallback, progressCallback) {
                    return $upload.http({
                        url: this.getDocumentPostUrl(params.name),
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
                }
            };
        };
    });
})();
