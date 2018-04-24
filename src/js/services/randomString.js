/**
 * Created by nons3ns on 22.04.2018.
 */
app.factory('randomStringService', function () {
    return function randomString(length) {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';

        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

        return result;
    }
});

