{
    var device;
    var disableNativeKeypad;
    window.navigator.userAgent.replace(/(android|iphone|ipad)/i, match => {
    device = match.toLowerCase();
    });
    disableNativeKeypad = !!device;
}

// require is used here to makesure that mathquill is after jquery
window.$ = window.jQuery = require('jquery');
// I want to use mathquill after importing jQuery
require('./third-party/mathquill-0.10.1/mathquill.js');

import './third-party/mathquill-0.10.1/mathquill.css';

import '../styles/style.scss';
import './rasm/index.js';

$('#loading-layer').fadeOut(1000);
