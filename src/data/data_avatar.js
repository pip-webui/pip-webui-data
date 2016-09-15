/**
 * @file PipData Avatar API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataAvatar', ['pipDataConfig', 'pipDataSession', 'angularFileUpload']);

    thisModule.provider('pipDataAvatar', function () {

        this.$get = function ($http, $upload, pipDataConfig, pipDataSession) {

            var
                colorClasses = [
                    'pip-avatar-color-0', 'pip-avatar-color-1', 'pip-avatar-color-2', 'pip-avatar-color-3',
                    'pip-avatar-color-4', 'pip-avatar-color-5', 'pip-avatar-color-6', 'pip-avatar-color-7',
                    'pip-avatar-color-8', 'pip-avatar-color-9', 'pip-avatar-color-10', 'pip-avatar-color-11',
                    'pip-avatar-color-12', 'pip-avatar-color-13', 'pip-avatar-color-14', 'pip-avatar-color-15'
                ],

                colors = [
                    'rgba(239,83,80,1)', 'rgba(236,64,122,1)', 'rgba(171,71,188,1)',
                    'rgba(126,87,194,1)', 'rgba(92,107,192,1)', 'rgba(3,169,244,1)',
                    'rgba(0,188,212,1)', 'rgba(0,150,136,1)', 'rgba(76,175,80,1)',
                    'rgba(139,195,74,1)', 'rgba(205,220,57,1)', 'rgba(255,193,7,1)',
                    'rgba(255,152,0,1)', 'rgba(255,87,34,1)', 'rgba(121,85,72,1)',
                    'rgba(96,125,139,1)'
                ],

                entityTypes = {
                    goal: 'goals',
                    objective: 'goals',
                    dream: 'goals',
                    accomplishment: 'goals',
                    area: 'areas',
                    overall: 'visions',
                    vision: 'visions',
                    event: 'events',
                    instance: 'events'
                };

            function fromServerFormat (avatar) {
                    return avatar;
                    // return {
                    // id: avatar.id
                    // name: avatar.name,
                    // content_type: avatar.content_type,
                    // length: avatar.length,
                    // creator_id: avatar.creator_id,
                    // created: avatar.created,
                    // refs: avatar.refs,
                    // url: avatar.url                  
                    // }
            }

            function fromServerError(error) {
                    // TODO: add mapping for demonstration of fields
                    return error;
            }

            function getUrl(params) {
                var serverUrl = pipDataConfig.serverUrl(),
                    url;
                    
                    if (params.type && params.id && params.partyId && (entityTypes[params.type] == 'goals' || entityTypes[params.type] == 'areas' )) {
                        url = serverUrl + '/api/parties/' + params.partyId + '/' + entityTypes[params.type]
                                + '/' + params.id + '/avatar';
                    } else {
                        url = serverUrl + '/api/parties/' + params.partyId + '/avatar';
                    }

                    return url;
            }

            return {
                getEntityTypes: function getEntityTypes() {
                    return entityTypes;
                },

                getColorClasses: function getColorClasses() {
                    return colorClasses;
                },

                getAvatarColors: function getAvatarColors() {
                    return colors;
                },

                getAvatarUrl: function(params) {
                    var
                        timestamp = Math.floor(new Date().getTime() / 1000) * 1000,
                        colorClassIndex = pipStrings.hashCode(params.id) % colors.length,
                        chr = null,
                        url = null, 
                        default_template = '',

                        noRedirect = params.noRedirect && params.noRedirect === true ? '&no_redirect=true' : '';

                    if ((params.type && params.id && params.partyId) || (params.partyId)) {
                        if (params.type && params.id && params.partyId) {
                            if (params.type == 'category') return '';
                            if (!params.noDefault) {
                                default_template = 'default_template=' + params.type + '&bg=' + colors[colorClassIndex] + '&fg=white&';
                            }
                            if (entityTypes[params.type] == 'goals' || entityTypes[params.type] == 'areas' ) {
                                url = getUrl(params) + '?' + default_template + 'timestamp=' + timestamp
                                    + '&obj_id=' + params.id + noRedirect;
                            }
                        } else if (params.partyId && params.partyName) {
                            colorClassIndex = pipStrings.hashCode(partyId) % colors.length;
                            chr = (params.partyName[0] || '?').toUpperCase();
                            if (!params.noDefault) {
                                default_template = 'default_template=letter&bg=' + colors[colorClassIndex] + '&fg=white&chr=' + chr + '&';
                            }
                            url = getUrl(params) + '?' + default_template + 'timestamp=' + timestamp + '&obj_id=' + params.partyId + noRedirect;
                        } else if (params.partyId && (!params.type && !params.id)) {
                            url =getUrl(params) + '?timestamp=' + timestamp + '&obj_id=' + params.partyId + noRedirect;
                        }
                    }

                    return url;                    
                },

                getAvatarPostUrl: function(params, filter) {
                    var serverUrl = pipDataConfig.serverUrl(),
                        FILE_URL;  

                    if (params.entityType && params.id && params.partyId) {
                        FILE_URL = serverUrl + '/api/parties/' + params.partyId + '/'
                            + entityTypes[params.entityType] + '/' + params.id + '/avatar';
                    } else {
                        if (params.partyId && !params.entityType) {
                            if (params.entityType || params.id)
                                return '';
                            FILE_URL = serverUrl + '/api/parties/' + params.partyId
                                + '/avatar';
                        }
                    }

                    return FILE_URL + '?name=' + filter;                    
                },

                deleteAvatar: function(params, successCallback, errorCallback) {
                    $http({
                        method: 'DELETE',
                        url: getUrl(params)
                    }).then(successCallback, function(error) {
                        errorCallback(fromServerError(error));
                    });
                },

                createAvatar: function(params, successCallback, errorCallback, progressCallback) {
                    return $upload.http({
                        url: this.getAvatarPostUrl(params.params, params.name),
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
                    }, progressCallback);
                },

                createAvatarByUrl: function(url, successCallback, errorCallback) {
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
