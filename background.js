// Match URLs like https://pbs.twimg.com/media/DQW9GvjX4AAkvDf.jpg
// and             https://pbs.twimg.com/media/DQW9GvjX4AAkvDf.jpg:large
// and             https://pbs.twimg.com/media/DQcr39WVAAEOepz?format=jpg
const twimg_re = new RegExp('^https://pbs\\.twimg\\.com/media/[-_A-Za-z0-9]{15}');
let debug = false;

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		debug && console.log("Got", details);
		const url   = details.url;
		const match = url.match(twimg_re);
		if (match) {
			const newUrl = match[0] + '.jpg:orig';
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
