/**
 * @file PipData API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataSession', ['pipDataConfig', 'pipRest', 'pipRest.Session']);

    thisModule.provider('pipDataSession', function () {


        this.readSessionsResolver = /* @ngInject */
            function ($stateParams, pipRest) {
                return pipRest.userSessions().query({
                    party_id: pipRest.partyId($stateParams)
                }).$promise;
            };                

        this.readSessionIdResolver = /* @ngInject */
            function ($stateParams, pipRest) {
                return pipRest.sessionId();
            };
                  
        this.$get = function (pipRest, pipSession, pipDataConfig, $stateParams) {

                var fromServerUserFormat = function(user) {
                    // TODO: add mapping for demonstration of fields
                    return user;
                },

                toServerUserFormat = function(user) {
                    // TODO: add mapping for demonstration of fields
                    return user;
                },

                fromServerError = function(error) {
                    // TODO: add mapping for demonstration of fields
                    return error;
                }; 
          
            return {

                signin: function (params, successCallback, errorCallback) {
                    return pipSession.signin(
                        {
                            serverUrl: params.serverUrl,
                            email: params.email,
                            password: params.password,
                            remember: params.remember,
                            adminOnly: !!params.adminOnly,                            
                        },
                        function(user) {
                            successCallback(fromServerUserFormat(user));
                        },
                        function(error) {
                            errorCallback(fromServerError(error));
                        }                        
                    );
                },

                open: function (params) {
                    return pipSession.open(params.serverUrl, params.user, params.password, params.remember);
                },                

                signout: function () {
                    return pipRest.signout();
                },
                
                userSessions: function () {
                    return pipRest.userSessions();
                },
                
                userId: function () {
                    return pipRest.userId();
                },

                sessionId: function () {
                    return pipRest.sessionId();
                },
                
                partyId: function () {
                    return pipRest.partyId($stateParams);
                },  

                // add from user_settings_data
                removeSession: function (params, successCallback, errorCallback) {
                    pipRest.userSessions().remove(
                        {
                            id: params.session.id,
                            party_id: pipRest.partyId($stateParams)
                        },
                        successCallback,
                        function(error) {
                            errorCallback(fromServerError(error));
                        } 
                    );
                },

            };
        };
    });
})();