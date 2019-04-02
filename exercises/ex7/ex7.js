function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	return ASQ(function(done){
		fakeAjax(file,done);
	});
}

// function getFile(file) {
// 	return new Promise(function(resolve){
// 		fakeAjax(file,resolve);
// 	});
// }


ASQ().runner(function *loadFiles(){
	// request all files concurrently

	let f1 = getFile('file1');
	let f2 = getFile('file2');
	let f3 = getFile('file3');

	output(yield f1);
	output(yield f2);
	output(yield f3);
	output('Complete!');
});
