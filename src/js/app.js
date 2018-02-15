// javascript goes here

import shares from './share'

let shareFn = shares('2018 Winter Olympics frame by frame', 'https://gu.com/p/85v9h', '');

[].slice.apply(document.querySelectorAll('.interactive-share')).forEach(shareEl => {
        var network = shareEl.getAttribute('data-network');
        shareEl.addEventListener('click', () => shareFn(network));
});