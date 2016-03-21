var download = require('./download.js');
var callback = require('./error.js');

var _title,
	_answers;

function ZhihuQuestion(id){
	this.id = id;
}

ZhihuQuestion.prototype = {
	savePictures: function(filePath){
		var picId = 0;
		getTitleAndAnswers(this.id);

		// 获取到 title 和 answers 之后再进行下面的操作
		setTimeout(function(){
			_answers.forEach(function(_answer){
				_answer.picurls.forEach(function(picurl){
					var filename = path.join(filePath, _title, _answer.name, (picId++) + '.png');
					download(picurl, filename, callback);
				});
			});
		}, 0);
	}
};

function getTitleAndAnswers(questionId){
	var questionUrl = 'https://www.zhihu.com/question/' + questionId;

	// var pattern = new RegExp(/<img.+?src="?(https:\/\/pic\d\.zhimg.com\/\S+.(jpg|gif|bmp|bnp|png))"?.+?(alt="((\S|\s)+?)")?.+?>/g);

	// 获取uri的内容
	request.get(questionUrl, function(err, response, body){
		if(!err && (response.statusCode === 200 || response.statusCode === 304 )){
			// // 下载所有用户头像到指定的文件夹
			// mkdirp(dir + '/' + size + '/', function(err){
			// 	var match,num=0;
			// 	while( (match = pattern.exec(body)) != null){
			// 		var picType = match[1].split('.')[(match[1].split('.').length-1)];
			// 		var portrait = new Portrait(match[1].replace(/_\w\w?\./,'_' + size + '.'), dir + '/' + size + '/' + (match[4]?match[4]:(num++)) + '.' + picType);
			// 		download(portrait);
			// 	}
			// });

			getTitle(body);
			getAnswers(body);
		}
	});
}

function getTitle(content){
	var pattern = new RegExp(/<h2\s+class=\"zm-item-title(\s+)?[^>]*\"([^>]*)?>([^<]*?)<\/h2>/);
}

function getAnswers(content){
	answers = [];
	return answers;
}

module.exports = ZhihuQuestion;