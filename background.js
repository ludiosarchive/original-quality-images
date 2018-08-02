// Match URLs like https://pbs.twimg.com/media/DQW9GvjX4AAkvDf.jpg
// and             https://pbs.twimg.com/media/DQW9GvjX4AAkvDf.jpg:large
// and             https://pbs.twimg.com/media/DQcr39WVAAEOepz?format=jpg
const twimg_re = new RegExp('^https://pbs\\.twimg\\.com/media/[-_A-Za-z0-9]{15}');

// Match URLs like https://78.media.tumblr.com/7e73ee3c3cbb0e98601f935fc35dfd41/tumblr_p6c35cIAQD1r51o9so1_540.jpg
const tumblr_re = new RegExp('^https?://\\d+\\.media\\.tumblr\\.com/[0-9a-f]{32}/tumblr_[0-9a-zA-Z]+_\\d+\\.(jpg|png|gif)$');

let debug = false;

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		debug && console.log("Got", details);
		const url   = details.url;
		let match;
		if (match = url.match(twimg_re)) {
			const newUrl = match[0] + '.jpg:orig';
			if (newUrl != url) {
				debug && console.log("Redirecting to", newUrl);
				return {redirectUrl: newUrl};
			}
		} else if (match = url.match(tumblr_re)) {
			const newUrl = match[0]
				.replace(/^https?:\/\/\d+\.media\./, "http://data.")
				.replace(/_\d+\.(jpg|png|gif)$/, "_raw.$1");
			if (newUrl != url) {
				debug && console.log("Redirecting to", newUrl);
				return {redirectUrl: newUrl};
			}
		}
	},
	{
		urls: [
			 'https://twitter.com/*'
			,'https://pbs.twimg.com/media/*'
			,'https://*.tumblr.com/*'
			,'https://*.media.tumblr.com/*'
		],
		types: ['main_frame', 'sub_frame', 'image']
	},
	['blocking']
);
