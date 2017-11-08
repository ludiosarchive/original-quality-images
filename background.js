const twimg_re = new RegExp('^https://pbs\\.twimg\\.com/media/', 'g');

chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		const url = details.url;
		if (twimg_re.test(url)) {
			const orig = url.replace(/:[a-z]{1,10}$/, '') + ':orig';
			if (orig != url) {
				return {redirectUrl: orig};
			}
		}
	},
	{
		urls:  ['https://twitter.com/*', 'https://pbs.twimg.com/media/*'],
		types: ['main_frame', 'sub_frame', 'image']
	}, ['blocking']
);
