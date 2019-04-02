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
	var t;
	var f;

	fakeAjax(file, function(text) {
		f ? f(text) : t = text;
	});

	return function(cb) {
		t ? cb(t) : f = cb;
	};
}

// request all files concurrently
const thunk1 = getFile("file1");
const thunk2 = getFile("file2");
const thunk3 = getFile("file3");

thunk1(t1 => {
	output(t1);

	thunk2(t2 => {
		output(t2);

		thunk3(t3 => {
			output(t3);
			output('Complete!')
		})
	})
});
