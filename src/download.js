var fs      = require('fs'),
    request = require('request'),
    path    = require('path'),
    mkdirp  = require('mkdirp');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
  	var headers = res.headers;
  	if(err){
  		callback(err);
  		return;
  	}
  	if(headers['content-type'].indexOf('image') === -1){
  		callback('not an image!');
  		return;
  	}
  	if(res.statusCode !== 200 || res.statusCode !== 304){
  		callback('status code not valid!');
  		return;
  	}

  	// 当给的路径不存在时创建文件路径
  	mkdirp(path.dirname(filename), function(err){
  		if(err){
  			callback(err);
  		}
  		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  	});
  });
};

module.exports = download;