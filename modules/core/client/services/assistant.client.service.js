'use strict';

angular.module('core').factory('Links', ['$resource',
    function($resource) {

        return $resource('/api/links/:linkId',{id:'@_id'},{
            update:{
                method:'PUT'
            }
        });

    }
]);
