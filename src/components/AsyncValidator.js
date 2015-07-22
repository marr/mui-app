const request = require('superagent');
module.exports = {
    simple: function(value, callback) {
        request
            .get('/validate')
            .send()
            .end(callback);
    }
};
