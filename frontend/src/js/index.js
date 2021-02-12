/* eslint-disable no-undef */
import './third-party/mathquill-0.10.1/mathquill.css';
import '../styles/style.scss';
import './rasm/index.js';

{
    var device;
    var disableNativeKeypad;
    window.navigator.userAgent.replace(/(android|iphone|ipad)/i, match => {
      device = match.toLowerCase();
    });
    // eslint-disable-next-line no-unused-vars
    disableNativeKeypad = !!device;
}

// require is used here to makesure that mathquill is after jquery
window.$ = window.jQuery = require('jquery');
// I want to use mathquill after importing jQuery
// so use require to make sure we are importing in the right order
require('./third-party/mathquill-0.10.1/mathquill.js');

$('#loading-layer').fadeOut(1000);

