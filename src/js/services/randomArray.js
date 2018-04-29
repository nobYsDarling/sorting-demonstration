/**
 * Created by nons3ns on 22.04.2018.
 */
app.factory('randomArrayService', function () {
    return {
        shuffle: function(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        },
        getArray: function(n) {
            var a = new Array(n);

            for(var i = 0; i < n; i++){
                a[i] = i + 1;
            }

            return this.shuffle(a);
        },
        getArrayOfArrays: function(n, m) {
            var a = new Array(n);

            for(var i = 0; i < n; i++){
                a[i] = this.getArray(m);
            }

            return this.shuffle(a);
        }
    };
});