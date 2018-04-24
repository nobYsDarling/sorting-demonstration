/**
 * Created by nons3ns on 22.04.2018.
 */
app.controller('SortingDemonstrationController', function SortingDemonstrationController($rootScope, $scope, $filter) {
    var chartInstances = [];

    $scope.bubble_sort_frames = [];
    $scope.merge_sort_frames = [];

    var togglePlayButton = function (state) {
        var force_play = typeof state != 'undefined' && ['PLAY', 'STOP'].indexOf(state) !== false && state == 'PLAY';
        var force_stop = typeof state != 'undefined' && ['PLAY', 'STOP'].indexOf(state) !== false && state == 'STOP';

        var playButton = angular.element(document.querySelector('#button_play_pause'));
        var playing = playButton.find('span').hasClass('glyphicon-play')

        if (force_play || (playing && !force_stop)) {
            playButton
                .find('span')
                .removeClass('glyphicon-play')
                .addClass('glyphicon-pause');
        } else {
            playButton
                .find('span')
                .removeClass('glyphicon-pause')
                .addClass('glyphicon-play');
        }

        return playing;
    };

    $scope.play = function () {
        var chartsFinished = chartInstances.reduce(function (a, e) {
            return a && e.finished;
        }, true);

        if (chartsFinished) {
            $rootScope.$broadcast('reset');
        }

        if (togglePlayButton()) {
            $rootScope.$broadcast('play');
        } else {
            $rootScope.$broadcast('pause');
        }
    };

    $scope.pause = function () {
        $rootScope.$broadcast('pause');
    };

    $scope.forward = function () {
        $rootScope.$broadcast('forward');
    };

    $scope.fastForward = function () {
        $rootScope.$broadcast('fastForward');
    };

    $scope.backward = function () {
        $rootScope.$broadcast('backward');
    };

    $scope.fastBackward = function () {
        $rootScope.$broadcast('fastBackward');
    };

    $scope.$on('chart-register', function register(event, opt) {
        var id = opt.id;

        chartInstances.push({
            id: id,
            playing: false,
            finished: false
        });
    });

    $scope.$on('chart-playing', function register(event, opt) {
        var id = opt.id;
        var idx = chartInstances.map(function(x) {return x.id;}).indexOf(id);
        chartInstances[idx].playing = true;
    });

    $scope.$on('chart-finished', function register(event, opt) {
        var id = opt.id;
        var idx = chartInstances.map(function(x) {return x.id;}).indexOf(id);
        chartInstances[idx].finished = true;
    });

    $scope.$on('chart-stopped', function register(event, opt) {
        var id = opt.id;
        var idx = chartInstances.map(function(x) {return x.id;}).indexOf(id);
        chartInstances[idx].playing = false;

        var chartsPlaying = chartInstances.reduce(function (a, e) {
            return a || e.playing;
        }, false);

        if (!chartsPlaying) {
            togglePlayButton('STOP');
        }
    });
});
