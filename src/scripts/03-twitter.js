app.directive('ngSocialTwitter', function() {
    'use strict';

    var options = {
        counter: {
            url: 'http://urls.api.twitter.com/1/urls/count.json?url={url}&callback=JSON_CALLBACK',
            getNumber: function(data) {
                return data.count;
            }
        },
        popup: {
            url: 'http://twitter.com/intent/tweet?url={url}&text={title}',
            width: 600,
            height: 450
        },
        click: function(options) {
            // Add colon to improve readability
            if (!/[\.:\-–—]\s*$/.test(options.pageTitle)) options.pageTitle += ':';
            return true;
        },
        track: {
            'name': 'twitter',
            'action': 'tweet'
        }
    };
    return {
        restrict: 'C',
        require: '^?ngSocialButtons',
        scope: true,
        replace: true,
        transclude: true,
        template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" ng-click="ctrl.clickShare($event, options)" class="icon-button twitter"> \
                        <i class="fa fa-twitter"></i><span></span> \
                    </a> \
                   </li>',
        controller: function($scope) {
        },
        link: function(scope, element, attrs, ctrl) {
            element.addClass('ng-social-twitter');
            if (!ctrl) {
                return;
            }
            scope.options = options;
            scope.ctrl = ctrl;
            ctrl.init(scope, element, options);
        }
    }
});