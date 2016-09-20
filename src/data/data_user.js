/**
 * @file PipData API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataUser', ['pipDataConfig', 'pipRest']);

    thisModule.provider('pipDataUser', function () {

        this.$get = function (pipRest, pipDataConfig, $stateParams, pipDataModel) {

            var fromServerFormat = function(user) {
                    // TODO: add mapping for demonstration of fields
                    return user;
                },                

                toServerFormat = function(user) {
                    // TODO: add mapping for demonstration of fields
                    return {
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        language: user.language,
                        theme: user.theme
                    }
                },                    

                fromServerError = function(error) {
                    // TODO: add mapping for demonstration of fields
                    return error;
                };

        this.readUsersResolver = function () {
            return /* @ngInject */ function ($stateParams, pipRest) {
                return pipRest.users().page({
                    party_id: $stateParams.id,
                    paging: $stateParams.paging || 1,
                    skip: $stateParams.skip || 0,
                    take: $stateParams.take || 15
                }).$promise;
            };
        };

        this.readUserResolver = function () {
            return /* @ngInject */ function ($stateParams, pipRest) {
                return pipRest.users().get({
                    id: $stateParams.id,
                    party_id: pipRest.partyId($stateParams)
                }).$promise;

            };
        };

        this.readActivitiesUserResolver = /* @ngInject */
            function ($stateParams, pipRest, $rootScope) {
                return pipRest.partyActivities().page({
                    party_id: $rootScope.$user.id,
                    paging: 1,
                    skip: 0,
                    take: 25
                }).$promise;
            };                


            return {

                signup: function (params, successCallback, errorCallback) {
                    return pipRest.signup(params.serverUrl).call(toServerFormat(params), 
                    function(user) {
                        successCallback(fromServerFormat(user));
                    },
                    function(error) {
                        fromServerError(fromServerError(error));
                    });
                },

                recoverPassword: function (params, successCallback, errorCallback) {
                    return pipRest.recoverPassword(params.serverUrl).call({
                        email: params.email
                    }, successCallback,
                    function(error) {
                        errorCallback(fromServerError(error));
                    });
                },

                resetPassword: function (params, successCallback, errorCallback) {
                    return pipRest.resetPassword(params.serverUrl).call({
                        email: params.email,
                        code: params.code,
                        password: params.password
                    }, successCallback,
                    function(error) {
                        errorCallback(fromServerError(error));
                    });
                },

                changePassword: function (params, successCallback, errorCallback) {
                    // TODO
                    return pipRest.changePassword().call(
                    params,
                    successCallback,
                    function(error) {
                        errorCallback(fromServerError(error));
                    });
                },

                requestEmailVerification: function (params, successCallback, errorCallback) {
                    return pipRest.requestEmailVerification(params.serverUrl).get(
                        {
                            party_id: pipRest.partyId($stateParams),
                            email: params.email
                        },
                        successCallback, 
                        function(error) {
                            errorCallback(fromServerError(error));
                        }
                    );      
                },

                verifyEmail: function (params, successCallback, errorCallback) {
                    return pipRest.verifyEmail(params.serverUrl).call(
                        {
                            email: params.email,
                            code: params.code
                        }, 
                        successCallback,
                        function(error) {
                            errorCallback(fromServerError(error));
                        }
                    );
                },

                signupValidate: function (params, successCallback, errorCallback) {
                    return pipRest.signupValidate().call({
                        email: params.email}, successCallback, errorCallback);
                },

                currentUser: function (successCallback, errorCallback) {
                    return pipRest.currentUser().call({},
                        function(user) {
                            successCallback(fromServerFormat(user));
                        },
                        function(error) {
                            errorCallback(fromServerError(error));
                        }
                    );
                },

                readUsers: function (params, transaction, successCallback, errorCallback) {
                    return pipRest.users().page(
                        {
                            party_id: pipRest.partyId($stateParams),
                            paging: 1,
                            skip: params.start || params.item.skip || 0,
                            search: params.item.search ,
                            active: params.item.active,
                            paid: params.item.paid,
                            admin: params.item.admin,
                            take: 15
                        },
                        function (pagedUsers) {
                            if (successCallback) successCallback(pagedUsers);
                        },
                        function (error) {
                            errorCallback(error);
                        }
                    );
                },

                readUser: function (params, successCallback, errorCallback) {
                    params.resource = 'users';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    params.item.id = params.item.id || $stateParams.id;
                    return pipDataModel.readOne(params, successCallback, errorCallback);
                },
                
                updateUser: function (params, successCallback, errorCallback) {
                    pipRest.users().update(
                        params.item,
                        function(user) {
                            successCallback(fromServerFormat(user));
                        },
                        function(error) {
                            errorCallback(fromServerError(error));
                        }
                    );
                }
            };
        };
    });
})();
