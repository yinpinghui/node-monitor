var exec = require('child_process').exec,
	fs = require('fs'),
    child;

/**
 * 在dist文件夹里，新建与className相同的文件夹
 * **/
var newDir = function (className, cb){
	child = exec('rm -rf ./dist/' + className + ' && mkdir ./dist/' + className,
		function (error, stdout, stderr) {
		    if (error !== null) {
		      console.log('exec error: ' + error);
	    	}else{
	    		if(!!cb)cb();
	    	}
	    });	
}

/**
 * 将template中的所有文件复制到./dist/className文件夹中
 * **/
var cpFiles = function(className, cb){
	child = exec('cp -a ./template/java ./dist/' + className,
		function (error, stdout, stderr) {
		    if (error !== null) {
		      console.log('exec error: ' + error);
	    	}
	    });
	child = exec('cp -a ./template/webapp ./dist/' + className,
		function (error, stdout, stderr) {
		    if (error !== null) {
		      console.log('exec error: ' + error);
		    }else{
	    		if(!!cb)cb();
	    	}
		});	
}

/**
 * 循环./dist/className文件夹，修改文件名
 * **/
var changeFileName = function(className, ClassName){
	walkfiles('./dist/' + className, className, ClassName);
}

var walkfiles = function(distpath,className,ClassName){
	var _dirList = fs.readdirSync(distpath);
	_dirList.forEach(function(item){
		var oripath = distpath + '/' + item;
		
		if(item.indexOf("Xxx") > -1){
			var newpath = oripath.replace("Xxx", ClassName);
			fs.renameSync(oripath, newpath);
			
			if(fs.statSync(newpath).isDirectory()){
				walkfiles(newpath, className, ClassName);
			}
			
		}else if(item.indexOf("xxx") > -1){
			var newpath = oripath.replace("xxx", ClassName);
			fs.renameSync(oripath, newpath);
			
			if(fs.statSync(newpath).isDirectory()){
				walkfiles(newpath, className, ClassName);
			}
			
		}else{
			
			if(fs.statSync(oripath).isDirectory()){
				walkfiles(oripath, className, ClassName);
			}
			
		}
	});
}

/**
 * 修改模板文件的内容，填充各属性
 * **/
var changeFileCode = function(className, ClassName){
	console.log("change file code...");
	
}

function generating(model,cb){
	var className = model.className; //xxx
	var ClassName = className.substring(0,1).toUpperCase() + className.substring(1); // Xxx
	console.log("we will generate class: " + model.className);
	newDir(className, function(){
		cpFiles(className, function(){
			changeFileName(className, ClassName);
		})
	});
	// changeFileName(className, ClassName);
	// changeFileCode(className, ClassName);
	// if(!!cb)cb();
}

module.exports.generating = generating;
