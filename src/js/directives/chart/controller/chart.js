app.directive('chart', function () {
    return {
        templateUrl: '/src/js/directives/chart/templates/chart.html',
        restrict: 'E',
        scope: {
            frames: '=',
            algorithm: '='
        },
        controller: function ($scope, $element, $attrs, $interval, $rootScope, $filter, randomStringService) {
            const FRAME_SKIP = 10;
            const HASH_LENGTH = 10;

            var handler = null;

            $scope.id = randomStringService(HASH_LENGTH);
            $scope.frame = 0;

            var stop = function () {
                $interval.cancel(handler);
                handler = null;
                $rootScope.$broadcast('chart-stopped', { id: $scope.id });
            };

            $scope.$on('play', function () {
                $rootScope.$broadcast('chart-playing', { id: $scope.id });

                handler = $interval(function () {
                    $scope.frame++;

                    if ($scope.frames.length <= $scope.frame) {
                        $scope.frame = $scope.frames.length;
                        stop();
                    }

                    displayFrame();
                }, 20);
            });

            $scope.$on('pause', function () {
                stop();
            });

            $scope.$on('forward', function () {
                $scope.frame = ($scope.frame + FRAME_SKIP > $scope.frames.length)
                    ? $scope.frames.length - 1
                    : $scope.frame + FRAME_SKIP;

                if (null === handler) {
                    displayFrame();
                }
            });

            $scope.$on('fastForward', function () {
                $scope.frame = $scope.frames.length - 1;
                displayFrame();
            });

            $scope.$on('backward', function () {
                $scope.frame = ($scope.frame - FRAME_SKIP < 0)
                    ? 0
                    : $scope.frame - FRAME_SKIP;

                if (null === handler) {
                    displayFrame();
                }
            });

            $scope.$on('fastBackward', function () {
                $scope.frame = 0;
                displayFrame();
            });

            $scope.$on('reset', function () {
                $scope.frame = 0;
                displayFrame();
            });

            $scope.$watch('frame', function(newValue, oldValue) {
                if (newValue == $scope.frames.length - 1) {
                    $rootScope.$broadcast('chart-finished', { id: $scope.id });
                }
            });

            var displayFrame = function () {
                $scope.src = $scope.frames[$scope.frame];
            };

            displayFrame();

            var myChart =
                Highcharts.chart($element[0], {
                    minPadding: 0,
                    maxPadding: 0,
                    chart: {
                        type: 'column'
                    },
                    plotOptions: {
                        series: {
                            pointPadding: 0,
                            groupPadding: 0,
                            borderWidth: 0
                        }
                    },
                    title: {
                        text: $filter('humanize')($scope.algorithm)
                    },
                    series: [{
                        showInLegend: false,
                        data: $scope.frames[$scope.frame]
                    }],
                    xAxis: {
                        labels:
                        {
                            enabled: false
                        }
                    },
                    yAxis: {
                        title: {
                            text: null
                        },
                        labels:
                        {
                            enabled: false
                        }
                    }
                });
            $rootScope.$broadcast('chart-register', { id: $scope.id });
        }
    }
});