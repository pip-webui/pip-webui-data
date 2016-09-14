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
