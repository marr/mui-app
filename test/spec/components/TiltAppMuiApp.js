const React = require('react'),
      newforms = require('newforms'),
      asyncValidator = require('components/AsyncValidator');

let valid = false;
const server = sinon.fakeServer.create();
server.respondWith('/validate/', [
    200,
    { 'Content-Type': 'application/json' },
    JSON.stringify({ valid: true })
]);

describe('TiltAppMuiApp', function () {
    const TestForm = newforms.Form.extend({
        zip: newforms.CharField(),
        clean: function(cb) {
            asyncValidator.simple(this.data.zip, (err, res) => {
                console.log(res.body) // null
            });
        }
    });

    it('supports async form validation', function() {
        const form = new TestForm({ validation: 'change' });
        expect(form.isValid()).to.not.be.ok;
        expect(form.isAsync()).to.be.ok;
        expect(server.requests.length).to.equal(0);
        form.setData({ zip: 'foo' });
        server.respond();
        expect(server.requests.length).to.equal(1);
        expect(form.isValid()).to.be.ok;
    })
});
