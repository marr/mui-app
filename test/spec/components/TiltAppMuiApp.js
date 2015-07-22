const React = require('react'),
      newforms = require('newforms'),
      asyncValidator = require('components/AsyncValidator');

let server;

describe('TiltAppMuiApp', function () {
    beforeEach(function() {
        server = sinon.fakeServer.create();
        server.respondWith('/validate', [
            200,
            { 'Content-Type': 'application/json' },
            JSON.stringify({ valid: true })
        ]);
    })
    afterEach(function() {
        server.restore();
    })
    const TestForm = newforms.Form.extend({
        zip: newforms.CharField(),
        clean: function(cb) {
            asyncValidator.simple(this.data.zip, (err, res) => {
                console.log('called')
                cb(err)
            });
        }
    });

    it('supports async form validation', function() {
        const form = new TestForm({ validation: 'change' });
        expect(form.isValid()).to.not.be.ok;
        expect(form.isAsync()).to.be.ok;
        expect(server.requests.length).to.equal(0);
        form.setData({ zip: 'foo' });
        expect(form.isValid()).to.not.be.ok; // this fails, as it gets set to true somehow before the server responds
        server.respond();
        expect(form.isValid()).to.be.ok;
    })
});
