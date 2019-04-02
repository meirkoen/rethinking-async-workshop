var fake_responses = {
	"file1": "The first text",
	"file2": "The middle text",
	"file3": "The last text"
};
function fakeAjax(url,cb) {
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
// The old-n-busted callback way
const callOrder = []

function getFile(file) {
	callOrder.push({res: fake_responses[file], done: false, printed: false})


	fakeAjax(file,function(text){
		let allPrintedSoFar = true;

		callOrder.forEach((co, i) => {
			if (co.res === text) {
				co.done = true;
			}

			if (allPrintedSoFar && co.done && !co.printed) {
				co.printed = true;
				output(co.res);

				if (i === callOrder.length - 1) {
					output('Complete!')
				}
			}

			allPrintedSoFar = allPrintedSoFar && co.printed;
		})

		allPrintedSoFar = true;
	});
}

// request all files concurrently
getFile("file1");
getFile("file2");
getFile("file3");
