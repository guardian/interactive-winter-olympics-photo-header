const twitterBaseUrl = 'https://twitter.com/intent/tweet?text=';
const facebookBaseUrl = 'https://www.facebook.com/dialog/feed?display=popup&app_id=741666719251986&redirect_uri=http://www.theguardian.com&link=';
const googleBaseUrl = 'https://plus.google.com/share?url=';


export default function share(title, shareURL, hashTag, fbImg, twImg) {
    var twImgText = twImg ? ` ${twImg.trim()} ` : '';
    var fbImgQry = fbImg ? `&picture=${encodeURIComponent(fbImg)}` : '';


    
    return function (network, extra='') {
        var twitterMessage = `${extra}${title}${twImgText}${hashTag}`;
        var shareWindow;

        if (network === 'twitter') {
            shareWindow = twitterBaseUrl + encodeURIComponent(twitterMessage + ' ') + shareURL + "?CMP=share_btn_tw";
        } else if (network === 'facebook') {
            shareWindow = facebookBaseUrl + shareURL + "?CMP=fb_gu" + fbImgQry;
        } else if (network === 'email') {
            shareWindow = 'mailto:?subject=' + encodeURIComponent(title) + '&body=' + shareURL;
        } else if (network === 'google') {
            shareWindow = googleBaseUrl + shareURL;
        }
        //console.log(shareWindow + " " + network);

        window.open(shareWindow, network + 'share', 'width=640,height=320');
    }
} 