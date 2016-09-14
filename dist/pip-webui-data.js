/**
 * @file Registration of WebUI data services
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    angular.module('pipData', [
        'pipDataConfig',
        'pipDataDocument',
        'pipDataUser',
        'pipDataParty',
        'pipDataSession',

        'pipUsersData',
        'pipDataSettings',

        'pipCacheTag',
        'pipDataTag',

        'pipCacheAnnouncement',
        'pipDataAnnouncement',

        'pipCacheFeedback',
        'pipDataFeedback',

        'pipCacheImageSet',
        'pipDataImageSets',

        'pipCacheGuide',
        'pipDataGuide',

        'pipCacheTip',
        'pipDataTip',

    ]);

})(window.angular);

/**
 * @file Announces data cache
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipCacheAnnouncement', ['pipDataAnnouncement']);

    thisModule.service('pipCacheAnnouncement',
        ['pipEnums', 'pipDataCache', 'pipCacheTag', function (pipEnums, pipDataCache, pipCacheTag) {

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
                        
        }]
    );

})();


/**
 * @file Feedbacks data cache
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipCacheFeedback', ['pipDataFeedback']);

    thisModule.service('pipCacheFeedback',
        ['pipEnums', 'pipDataCache', 'pipCacheTag', function (pipEnums, pipDataCache, pipCacheTag) {

            return {
                readFeedbacks: readFeedbacks,
                onFeedbackCreate: onFeedbackCreate,
                onFeedbackUpdate: onFeedbackUpdate,
                onFeedbackDelete: onFeedbackDelete                
            };

            function readFeedbacks(params, successCallback, errorCallback) {
                params = params || {};
                params.resource = 'feedbacks';
                params.item = params.item || {};

                return pipDataCache.retrieveOrLoad(params, successCallback, errorCallback);
            };
            
            function onFeedbackCreate(params, successCallback) {
                return pipDataCache.addDecorator(
                    'feedbacks', params,
                    pipCacheTag.tagsUpdateDecorator(params, successCallback)
                );
            };

            function onFeedbackUpdate(params, successCallback) {
                return pipDataCache.updateDecorator(
                    'feedbacks', params,
                    pipCacheTag.tagsUpdateDecorator(params, successCallback)
                );
            };

            function onFeedbackDelete(params, successCallback) {
                return pipDataCache.removeDecorator('feedbacks', params, successCallback);
            };
                        
        }]
    );

})();


/**
 * @file Guides data cache
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipCacheGuide', ['pipDataGuide', 'pipCacheTag']);

    thisModule.service('pipCacheGuide',
        ['pipEnums', 'pipDataCache', 'pipCacheTag', function (pipEnums, pipDataCache, pipCacheTag) {

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
                        
        }]
    );

})();


/**
 * @file ImageSets data cache
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipCacheImageSet', ['pipDataImageSets']);

    thisModule.service('pipCacheImageSet',
        ['pipEnums', 'pipDataCache', 'pipCacheTag', function (pipEnums, pipDataCache, pipCacheTag) {

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
                        
        }]
    );

})();


/**
 * @file Tags data cache
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipCacheTag', ['pipUtils', 'pipDataCache']);

    thisModule.service('pipCacheTag',
        ['pipTags', 'pipDataCache', function(pipTags, pipDataCache) {
            return {
                readTags: readTags,
                // Todo: Add updateTags method
                onTagsUpdate: onTagsUpdate,
                tagsUpdateDecorator: tagsUpdateDecorator
            };
			//------------------------------

            function tagsUpdate(params, item) {
                // Extract tag from updated entity
                var tags = item ? pipTags.extractTags(item) : [];
                if (tags.length == 0) return;

                var cacheName = 'partyTags';
                if (params && params.party_id !== null && params.party_id !== undefined)
                    cacheName = cacheName + '_' + params.party_id;
                else if (params && params.item && params.item.party_id !== null && params.item.party_id !== undefined)
                    cacheName = cacheName + '_' + params.item.party_id;

                // Todo: this is a wrong way to get party_id (contributor) from entities
                var data = pipDataCache.retrieve(cacheName);

                // If tags are stored
                if (data) {
                    _.each(tags, function(tag) {
                        // Find if tag already exists
                        var t = _.find(data.tags, function(t) {
                            return pipTags.equalTags(t.tag, tag);
                        });

                        // Otherwise add a new tag
                        if (t) {
                            t.tag = tag;
                            t.count = t.count + 1;
                            t.used = new Date();
                        } else {
                            if (!data.tags)
                                data.tags = [];
								
                            data.tags.push({
                                tag: tag,
                                count: 1,
                                used: new Date()
                            });
                        }
                    });
                    pipDataCache.store(cacheName, data);
                }
            };

            function tagsUpdateDecorator(params, successCallback) {
                return function(item) {
                    tagsUpdate(params, item);

                    if (successCallback) successCallback(item);
                };
            };

			function readTags(params, successCallback, errorCallback) {
				params.resource = 'partyTags';
				params.singleResult = true;

				return pipDataCache.retrieveOrLoad(params, successCallback, errorCallback);
			};

			// Todo: Add updateTags method

			function onTagsUpdate(params, successCallback) {
				return tagsUpdateDecorator(params, successCallback);
			};
        }]
    );

})();


/**
 * @file Tips data cache
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipCacheTip', ['pipDataTip']);

    thisModule.service('pipCacheTip',
        ['pipEnums', 'pipDataCache', 'pipCacheTag', function (pipEnums, pipDataCache, pipCacheTag) {

            return {
                readTips: readTips,
                onTipCreate: onTipCreate,
                onTipUpdate: onTipUpdate,
                onTipDelete: onTipDelete                
            };

            function readTips(params, successCallback, errorCallback) {
                params = params || {};
                params.resource = 'tips';
                params.item = params.item || {};

                return pipDataCache.retrieveOrLoad(params, successCallback, errorCallback);
            };
            
            function onTipCreate(params, successCallback) {
                return pipDataCache.addDecorator(
                    'tips', params,
                    pipCacheTag.tagsUpdateDecorator(params, successCallback)
                );
            };

            function onTipUpdate(params, successCallback) {
                return pipDataCache.updateDecorator(
                    'tips', params,
                    pipCacheTag.tagsUpdateDecorator(params, successCallback)
                );
            };

            function onTipDelete(params, successCallback) {
                return pipDataCache.removeDecorator('tips', params, successCallback);
            };
                        
        }]
    );

})();


/**
 * @file Announces data model
 * @copyright Digital Living Software Corp. 2014-2016
 */
 
 /* global angular */
 
(function () {
    'use strict';

    var thisModule = angular.module('pipDataAnnouncement', ['pipRest', 'pipDataModel', 'pipCacheAnnouncement']);

    thisModule.provider('pipDataAnnouncement', function () {

        // Read all announces
        this.readAnnouncesResolver = function () {
            return /* @ngInject */ ['$stateParams', 'pipRest', 'pipEnums', function ($stateParams, pipRest, pipEnums) {
                return pipRest.announces().query().$promise;
            }];
        };

        this.readCompletedAnnouncesResolver = function () {
            return /* @ngInject */ ['$stateParams', 'pipRest', 'pipEnums', function ($stateParams, pipRest, pipEnums) {
                return pipRest.announces().query( {
                        status: pipEnums.EXECUTION_STATUS.COMPLETED
                    }
                ).$promise;
            }];
        };

        this.readAnnounceResolver = function () {
            return /* @ngInject */ ['$stateParams', 'pipRest', function ($stateParams, pipRest) {
                return pipRest.announces().get({
                    id: $stateParams.id
                }).$promise;
            }];
        };

        // CRUD operations and other business methods
        this.$get = ['pipRest', '$stateParams', 'pipDataModel', 'pipCacheAnnouncement', function (pipRest, $stateParams, pipDataModel, pipCacheAnnouncement) {
            return {
                partyId: pipRest.partyId,
                readAnnounces: function (params, successCallback, errorCallback) {
                    params.resource = 'announces';
                    params.item = params.item || {};
                    params.item.search = $stateParams.search;
                    params.item.tags = $stateParams.search;
                    params.item.party_id = pipRest.partyId($stateParams);
                    return pipCacheAnnouncement.readAnnounces(params, successCallback, errorCallback);
                },

                updateAnnounce: function (params, successCallback, errorCallback) {
                    params.resource = 'announces';
                    params.skipTransactionBegin = true;
                    params.skipTransactionEnd = false;
                    pipDataModel.update(
                        params,
                        pipCacheAnnouncement.onAnnounceCreate(params, successCallback),
                        errorCallback
                    );
                },
                
                updateAnnounceWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'announces';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        pipDataModel.update(
                            params,
                            pipCacheAnnouncement.onAnnounceUpdate(params, successCallback),
                            errorCallback
                        );
                    });
                },

                createAnnounceWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'announces';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        pipDataModel.create(
                            params,
                            pipCacheAnnouncement.onAnnounceCreate(params, successCallback),
                            errorCallback
                        );
                    });
                },
                
                createAnnounce: function (params, successCallback, errorCallback) {
                    params.resource = 'announces';
                    params.skipTransactionBegin = true;
                    params.skipTransactionEnd = false;
                    pipDataModel.create(
                        params,
                        pipCacheAnnouncement.onAnnounceCreate(params, successCallback),
                        errorCallback
                    );
                },

                deleteAnnounce: function(params, successCallback, errorCallback) {
                    params.resource = 'announces';
                    pipDataModel.remove(params, pipCacheAnnouncement.onAnnounceDelete(params, successCallback), errorCallback);
                }
            }
        }];
    });

})();
/**
 * @file PipData API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataConfig', ['pipRest']);

    thisModule.provider('pipDataConfig', ['pipRestProvider', function (pipRestProvider) {

        pipRestProvider.version('1.0');

        this.version = function (newVersion) {
            pipRestProvider.version(newVersion);
        };

        this.serverUrlFixed = function (value) {
            pipRestProvider.serverUrlFixed(value);
        };

        this.serverUrl = function (newServerUrl) {
            pipRestProvider.serverUrl(newServerUrl);
        };

        this.$get = ['$rootScope', '$http', '$resource', 'pipRest', function ($rootScope, $http, $resource, pipRest) {

            return {

                serverUrl: function (newServerUrl) {
                    return pipRest.serverUrl(newServerUrl);
                },

                serverUrlFixed: function () {
                    return pipRest.serverUrlFixed(serverUrlFixed);
                },
                
                about: function(successCallback, errorCallback) {
                    return pipRest.about().call({},
                    // TODO: add mapping? 
                    successCallback, 
                    errorCallback);
                },
            };
        }];
    }]);
})();

/**
 * @file PipData API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataDocument', ['pipDataConfig', 'pipDataSession', 'angularFileUpload']);

    thisModule.provider('pipDataDocument', function () {

        this.$get = ['$http', '$upload', 'pipDataConfig', 'pipDataSession', function ($http, $upload, pipDataConfig, pipDataSession) {

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
        }];
    });
})();

/**
 * @file Feedbacks data model
 * @copyright Digital Living Software Corp. 2014-2016
 */
 
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataFeedback', ['pipRest', 'pipDataModel', 'pipCacheFeedback']);

    thisModule.provider('pipDataFeedback', function() {

        this.readFeedbacksResolver = function () {
            return /* @ngInject */ ['$stateParams', 'pipRest', function ($stateParams, pipRest) {
                return pipRest.feedbacks().query().$promise;
            }];
        };

        this.readFeedbackResolver = function () {
            return /* @ngInject */ ['$stateParams', 'pipRest', function ($stateParams, pipRest) {
                return pipRest.feedbacks().get({
                    id: $stateParams.id
                }).$promise;
            }];
        };

        this.$get = ['$stateParams', 'pipRest', 'pipDataModel', 'pipCacheFeedback', function($stateParams, pipRest, pipDataModel, pipCacheFeedback) {
            return {

                sendFeedback: function(params, successCallback, errorCallback) {
                    params.resource = 'feedbacks';
                    pipDataModel.create(params, successCallback, errorCallback);
                },

                readFeedbacks: function (params, successCallback, errorCallback) {
                    params.resource = 'feedbacks';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    
                    return pipCacheFeedback.readFeedbacks(params, successCallback, errorCallback);
                },


                createFeedbackWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'feedbacks';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        pipDataModel.create(params, successCallback, errorCallback);
                    });
                },

                updateFeedback: function (params, successCallback, errorCallback) {
                    params.resource = 'feedbacks';
                    params.skipTransactionBegin = true;
                    params.skipTransactionEnd = false;
                    pipDataModel.update(
                        params,
                        successCallback,
                        errorCallback
                    );
                },

                deleteFeedback: function(params, successCallback, errorCallback) {
                    params.resource = 'feedbacks';
                    pipDataModel.remove(params, successCallback, errorCallback);
                }
            };
        }];
    });

})();

/**
 * @file Guides data model
 * @copyright Digital Living Software Corp. 2014-2016
 */
 
 /* global angular */
 
(function () {
    'use strict';

    var thisModule = angular.module('pipDataGuide', ['pipRest', 'pipDataModel']);

    thisModule.provider('pipDataGuide', function () {
        var PAGE_SIZE = 5;

        // CRUD operations and other business methods
        this.$get = ['pipRest', '$stateParams', 'pipDataModel', 'pipCacheGuide', function (pipRest, $stateParams, pipDataModel, pipCacheGuide) {
            return {
                partyId: pipRest.partyId,

                readGuides: function(params, successCallback, errorCallback) {
                    params.resource = 'guides';
                    params.party_id = pipRest.partyId($stateParams);
                    return pipCacheGuide.readGuides(params, successCallback, errorCallback);
                },

                readIntroGuides: function(params, successCallback, errorCallback) {
                    params.resource = 'guides';
                    params.party_id = pipRest.partyId($stateParams);
                    params.type = 'intro';
                    params.status = 'completed';
                    return pipCacheGuide.readGuides(params, successCallback, errorCallback);
                },

                readGuide: function (params, successCallback, errorCallback) {
                    params.resource = 'guides';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    params.item.id = params.item.id || $stateParams.id;
                    return pipDataModel.readOne(params, pipCacheGuide.onGuideUpdate(params, successCallback), errorCallback);
                },

                createGuide: function (params, successCallback, errorCallback) {
                    params.resource =  'guides';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    pipDataModel.create(
                        params,
                        pipCacheGuide.onGuideCreate(params, successCallback),
                        errorCallback
                    );
                },

                createGuideWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'guides';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        pipDataModel.create(
                            params,
                            pipCacheGuide.onGuideCreate(params, successCallback),
                            errorCallback
                        );
                    });
                },

                updateGuide: function (params, successCallback, errorCallback) {
                    params.resource = 'guides';
                    params.skipTransactionBegin = true;
                    params.skipTransactionEnd = false;
                    pipDataModel.update(
                        params,
                        pipCacheGuide.onGuideUpdate(params, successCallback),
                        errorCallback
                    );
                },
                
                updateGuideWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'guides';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        pipDataModel.update(
                            params,
                            pipCacheGuide.onGuideUpdate(params, successCallback),
                            errorCallback
                        );
                    });
                },

                
                deleteGuide: function(params, successCallback, errorCallback) {
                    params.resource = 'guides';
                    pipDataModel.remove(params, pipCacheGuide.onGuideDelete(params, successCallback),  errorCallback);
                }

            }
        }];
    });

})();
/**
 * @file Image sets data model
 * @copyright Digital Living Software Corp. 2014-2016
 */
 
 /* global angular */
 
(function () {
    'use strict';
    
    var thisModule = angular.module('pipDataImageSets', ['pipRest', 'pipDataModel', 'pipCacheImageSet']);

    thisModule.provider('pipDataImageSets', function () {
        var PAGE_SIZE = 15;

        // Read all image sets
        this.readImageSetsResolver = function () {
            return /* @ngInject */ ['$stateParams', 'pipRest', function ($stateParams, pipRest) {
                return pipRest.image_sets().get({
                    paging: 1,
                    skip: 0,
                    take: PAGE_SIZE,
                    search: $stateParams.search,
                    //tags: $stateParams.search
                }).$promise;
            }];
        };

        this.readImageSetResolver = function () {
            return /* @ngInject */ ['$stateParams', 'pipRest', function ($stateParams, pipRest) {
                return pipRest.image_sets().get({
                    id: $stateParams.id
                }).$promise;
            }];
        };

        // CRUD operations and other business methods
        this.$get = ['pipRest', '$stateParams', 'pipDataModel', 'pipCacheImageSet', function (pipRest, $stateParams, pipDataModel, pipCacheImageSet) {

            return {
                partyId: pipRest.partyId,

                readImageSets: function (params, transaction, successCallback, errorCallback) {
                    params.resource = 'image_sets';

                    params.skipTransactionBegin = true;
                    params.skipTransactionEnd = false;
                    
                    params.item = params.item || {};
                    params.item.skip = params.item.skip || 0;
                    params.item.search = $stateParams.search || params.item.search;
                   // params.item.tags = $stateParams.search || params.item.search;
                    params.item.party_id = pipRest.partyId($stateParams);
                    params.item.take = PAGE_SIZE;
                    params.item.paging = 1;

                    return pipDataModel.page(
                        params,
                        successCallback,
                        errorCallback
                    );
                },

                readImageSet: function (params, successCallback, errorCallback) {
                    params.resource = 'image_sets';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    params.item.id = params.item.id || $stateParams.id;
                    return pipDataModel.readOne(params, pipCacheImageSet.onImageSetUpdate(params, successCallback), errorCallback);
                },

                updateImageSet: function (params, successCallback, errorCallback) {
                    params.resource = 'image_sets';
                    params.skipTransactionBegin = true;
                    params.skipTransactionEnd = false;
                    return pipDataModel.update(
                        params,
                        successCallback,
                        errorCallback
                    );
                },

                createImageSet: function (params, successCallback, errorCallback) {
                    params.resource = 'image_sets';
                    params.skipTransactionBegin = true;
                    params.skipTransactionEnd = false;
                    pipDataModel.create(
                        params,
                        pipCacheImageSet.onImageSetCreate(params, successCallback),
                        errorCallback
                    );
                },

                createImageSetWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'image_sets';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        pipDataModel.create(
                            params,
                            pipCacheImageSet.onImageSetCreate(params, successCallback),
                            errorCallback
                        );
                    });
                },

                updateImageSetWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'image_sets';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        pipDataModel.update(
                            params,
                            successCallback,
                            errorCallback
                        );
                    });
                },

                deleteImageSet: function(params, successCallback, errorCallback) {
                    params.resource = 'image_sets';
                    pipDataModel.remove(params, successCallback, errorCallback);
                }
            }
        }];
    });

})();

/**
 * @file PipData API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataParty', ['pipDataConfig', 'pipRest']);

    thisModule.provider('pipDataParty', function () {

        this.$get = ['pipRest', 'pipDataConfig', function (pipRest, pipDataConfig) {

           var fromServerFormat = function(party) {
                    // TODO: add mapping for demonstration of fields
                    return party;
                },

                toServerFormat = function(party) {
                    // TODO: add mapping for demonstration of fields
                    return party;
                },

                fromServerError = function(error) {
                    // TODO: add mapping for demonstration of fields
                    return error;
                };

            return {

                getParty: function(id) {
                    // TODO

                },

                createParty: function(data, successCallback, errorCallback) {
                    pipRest.parties().update(
                        toServerFormat(data),
                        function(party) {
                            successCallback(fromServerFormat(party));
                        }, errorCallback);
                },

                updateParty: function(data, successCallback, errorCallback) {
                    pipRest.parties().update(
                        toServerFormat(data),
                        function(party) {
                            successCallback(fromServerFormat(party));
                        }, function(error) {
                            errorCallback(fromServerError(error));
                        });
                },                

                partySettings: function () {
                    return pipRest.partySettings();
                }
            };
        }];
    });
})();
/**
 * @file PipData API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataSession', ['pipDataConfig', 'pipRest', 'pipRest.Session']);

    thisModule.provider('pipDataSession', function () {

        this.$get = ['pipRest', 'pipSession', 'pipDataConfig', function (pipRest, pipSession, pipDataConfig) {

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
                
                partyId: function ($stateParams) {
                    return pipRest.partyId();
                },                                                    
            };
        }];
    });
})();
/**
 * @file Settings data model
 * @copyright Digital Living Software Corp. 2014-2016
 * @todo Rewrite, use cached settings, remove unrelated methods
 */

/* global _, angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataSettings', ['pipRest', 'pipSessionData', 'pipSessionCache', 'pipDataModel']);

    thisModule.provider('pipDataSettings', ['pipSessionDataProvider', function (pipSessionDataProvider) {

        this.readSettingsResolver = pipSessionDataProvider.readSettingsResolver;

        this.$get = ['$rootScope', '$stateParams', 'pipRest', 'pipSessionCache', 'pipSession', 'pipDataModel', function ($rootScope, $stateParams, pipRest, pipSessionCache, pipSession, pipDataModel) {
            return {
                // Saving generic settings
                saveSettings: saveSettings,
                readSettings: readSettings,
                reReadSettings: reReadSettings

            };

            function readSettings(successCallback, errorCallback) {
                return pipSessionCache.readSettings(successCallback, errorCallback)
            };

            // force read settings from server and update cache
            function reReadSettings(successCallback, errorCallback) {
                return pipRest.partySettings().get(
                    {
                        party_id: pipSession.userId()
                    },
                    function (settings) {
                        settings = settings || {};
                        pipSessionCache.onSettingsUpdate(settings);
                        if (successCallback) successCallback(settings);
                    },
                    errorCallback
                ).$promise;
            };

            function saveSettings(settings, keys, successCallback, errorCallback) {
                // Extract specific keys
                settings = keys ? _.pick(settings, keys) : settings;
                settings.party_id = pipSession.userId();
                var oldSettings = _.cloneDeep($rootScope.$settings);
                pipSessionCache.onSettingsUpdate(settings);

                var params = {};
                params.resource = 'partySettings';
                params.item = settings;
                params.item.creator_id = pipSession.userId();

                pipDataModel.create(
                    params,
                    successCallback,
                    function (error) {
                        pipSessionCache.onSettingsUpdate(oldSettings);

                        if (errorCallback) errorCallback(error);
                    }
                );
            };
        }];
    }]);

})();

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
            return /* @ngInject */ ['$stateParams', 'pipRest', 'pipCacheTag', function($stateParams, pipRest, pipCacheTag) {
                return pipCacheTag.readTags({
                    item: { party_id: pipRest.partyId($stateParams) }
                });
            }];
        };

        this.$get = ['$stateParams', '$state', 'pipRest', 'pipDataModel', 'pipCacheTag', function($stateParams, $state, pipRest, pipDataModel, pipCacheTag) {
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
        }];
    });

})();

/**
 * @file Tips data model
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataTip', ['pipRest', 'pipDataModel']);

    thisModule.provider('pipDataTip', function () {
        var PAGE_SIZE = 100;

        // Read all tips
        this.readTipsResolver = function () {
            return /* @ngInject */ ['$stateParams', 'pipRest', function ($stateParams, pipRest) {
                return pipRest.tips().query().$promise;
            }];
        };

        this.readTipResolver = function () {
            return /* @ngInject */ ['$stateParams', 'pipRest', function ($stateParams, pipRest) {
                return pipRest.tips().get({
                    id: $stateParams.id
                }).$promise;
            }];
        };

        // CRUD operations and other business methods
        this.$get = ['pipRest', '$stateParams', 'pipDataModel', 'pipCacheTip', function (pipRest, $stateParams, pipDataModel, pipCacheTip) {

            return {
                partyId: pipRest.partyId,

// todo update after optimization rezolver
                readTips: function (params, successCallback, errorCallback) {
                    params.resource = 'tips';
                    params.item = params.item || {};
                    params.item.search = $stateParams.search;
                    params.item.tags = $stateParams.search;
                    params.item.party_id = pipRest.partyId($stateParams);
                    return pipCacheTip.readTips(params, successCallback, errorCallback);
                },

                readTip: function (params, successCallback, errorCallback) {
                    params.resource = 'tips';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    params.item.id = params.item.id || $stateParams.id;
                    return pipDataModel.readOne(params, pipCacheTip.onTipsUpdate(params, successCallback), errorCallback);
                },

                createTip: function (params, successCallback, errorCallback) {
                    params.resource = 'tips';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    pipDataModel.create(
                        params,
                        pipCacheTip.onTipCreate(params, successCallback),
                        errorCallback
                    );
                },
                
                createTipWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'tips';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        
                        params.item.party_id = pipRest.partyId($stateParams);
                        pipDataModel.create(
                            params,
                            pipCacheTip.onTipCreate(params, successCallback),
                            errorCallback
                        );
                    }, errorCallback);
                },

                updateTip: function (params, successCallback, errorCallback) {
                    params.resource = 'tips';
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    pipDataModel.update(
                        params,
                        pipCacheTip.onTipUpdate(params, successCallback),
                        errorCallback
                    );
                },
                
                updateTipWithFiles: function(params, successCallback, errorCallback) {
                    params.skipTransactionEnd = true;
                    params.item = params.item || {};
                    params.item.party_id = pipRest.partyId($stateParams);
                    pipDataModel.saveFiles(params, function() {
                        params.resource = 'tips';
                        params.skipTransactionBegin = true;
                        params.skipTransactionEnd = false;
                        
                        params.item.party_id = pipRest.partyId($stateParams);
                        pipDataModel.update(
                            params,
                            pipCacheTip.onTipUpdate(params, successCallback),
                            errorCallback
                        );
                    });
                },

                deleteTip: function(params, successCallback, errorCallback) {
                    params.resource = 'tips';
                    pipDataModel.remove(params, pipCacheTip.onTipDelete(params, successCallback), errorCallback);
                }
            }
        }];
    });

})();

/**
 * @file PipData API
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function () {
    'use strict';

    var thisModule = angular.module('pipDataUser', ['pipDataConfig', 'pipRest']);

    thisModule.provider('pipDataUser', function () {

        this.$get = ['pipRest', 'pipDataConfig', '$stateParams', 'pipDataModel', function (pipRest, pipDataConfig, $stateParams, pipDataModel) {

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
            return /* @ngInject */ ['$stateParams', 'pipRest', function ($stateParams, pipRest) {
                return pipRest.users().page({
                    party_id: $stateParams.id,
                    paging: $stateParams.paging || 1,
                    skip: $stateParams.skip || 0,
                    take: $stateParams.take || 15
                }).$promise;
            }];
        };

        this.readUserResolver = function () {
            return /* @ngInject */ ['$stateParams', 'pipRest', function ($stateParams, pipRest) {
                return pipRest.users().get({
                    id: $stateParams.id,
                    party_id: pipRest.partyId($stateParams)
                }).$promise;

            }];
        };

        this.readActivitiesUserResolver = /* @ngInject */
            ['$stateParams', 'pipRest', '$rootScope', function ($stateParams, pipRest, $rootScope) {
                return pipRest.partyActivities().page({
                    party_id: $rootScope.$user.id,
                    paging: 1,
                    skip: 0,
                    take: 25
                }).$promise;
            }];                


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

                changePassword: function () {
                    // TODO
                    return pipRest.changePassword();
                },

                requestEmailVerification: function () {
                    return pipRest.requestEmailVerification();
                },

                verifyEmail: function (params, successCallback, errorCallback) {
                    return pipRest.verifyEmail(params.serverUrl).call({
                        email: params.email,
                        code: params.code
                    }, successCallback,
                    function(error) {
                        errorCallback(fromServerError(error));
                    });
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
                
                updateUser: function (item, transaction, successCallback, errorCallback) {
                    pipRest.users().update(
                        item.item,
                        function (updatedItem) {
                            if (successCallback) successCallback(updatedItem);
                        },
                        function (error) {
                            errorCallback(error);
                        }
                    );
                }
            };
        }];
    });
})();

/**
 * @file Users data model
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipUsersData', ['pipRest']);

    thisModule.provider('pipUsersData', function () {



        // CRUD operations and other business methods
        this.$get = ['pipRest', '$stateParams', 'pipDataModel', function (pipRest, $stateParams, pipDataModel) {   
            return {
                partyId: pipRest.partyId,

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
                
                updateUser: function (item, transaction, successCallback, errorCallback) {
                    pipRest.users().update(
                        item.item,
                        function (updatedItem) {
                            if (successCallback) successCallback(updatedItem);
                        },
                        function (error) {
                            errorCallback(error);
                        }
                    );
                }

            }
        }];
    });

})();
//# sourceMappingURL=pip-webui-data.js.map
