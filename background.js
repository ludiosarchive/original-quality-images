const twimg_re = new RegExp('^https://pbs\\.twimg\\.com/media/');
let debug = false;

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		debug && console.log("Got", details);
		const url = details.url;
		if (twimg_re.test(url)) {
			const newUrl = url.replace(/:[a-z]{1,10}$/, '') + ':orig';
			if (newUrl != url) {
				debug && console.log("Redirecting to", newUrl);
				return {redirectUrl: newUrl};
			}
		}
	},
	{
		urls:  [
			'https://twitter.com/*',
			'https://pbs.twimg.com/media/*'
		],
		types: ['main_frame', 'sub_frame', 'image']
	},
	['blocking']
);
