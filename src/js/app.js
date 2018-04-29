/**
 * Created by nons3ns on 19.04.2018.
 */

var app = angular.module("sortingDemonstration", ['ui.bootstrap', 'ngMaterial', 'ngMessages' ]);

app.filter('humanize', function(){
    return function(text) {
        if(text) {
            text = text.split("_");

            // go through each word in the text and capitalize the first letter
            for (var i in text) {
                var word = text[i];
                word = word.toLowerCase();
                word = word.charAt(0).toUpperCase() + word.slice(1);
                text[i] = word;
            }

            return text.join(" ");
        }
    };
});