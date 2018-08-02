Original Quality Images
===
Chrome extension that automatically redirects image requests to the original-quality image.

Currently supported on:

*   Twitter: appends `:orig` at the end of `https://pbs.twimg.com/media/*` URLs

    Unfortunately, in some cases there is no `:orig` image and this results in a 404.

*   Tumblr: gets `_raw` image from `http://data.tumblr.com`

## Install from source

Note that if you install an extension from outside the Chrome Web Store, you'll see a
"developer mode extensions" nag popup every time you start Chrome, unless you're
using Chrome on Linux (lucky you!).  On other platforms, you
[might be able to hexedit your Chrome binary](http://stackoverflow.com/questions/23055651/disable-developer-mode-extensions-pop-up)
to get rid of it (I have not tested this).

1.	`git clone https://github.com/ludios/original-quality-images`

2.	Open `chrome://extensions` in Chrome.

3.	Check "Developer mode" at the top-right.

4.	Click "Load unpacked extension...", then select the cloned `original-quality-images` directory.

5.	Check "Allow in incognito" if you also want to use this extension in incognito windows.
