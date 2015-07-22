'use strict';

var TiltAppMuiApp = require('./TiltAppMuiApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={TiltAppMuiApp}>
    <Route name="/" handler={TiltAppMuiApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
