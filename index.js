var download = require('./src/download.js');
var error    = require('./src/error.js');
var zhihu    = require('./zhihu.js');

download('https://pic1.zhimg.com/2727bf79a1917a6356e8cf2f91bac1e0_b.jpeg', 'test.png', error);