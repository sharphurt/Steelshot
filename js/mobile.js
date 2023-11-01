initializeAccessoriesController('mobile', () => {
    initializeBottomSheet()
});


const GetWindowViewPort = () => {
    return {
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    };
}

var viewPort = GetWindowViewPort();
const zoom = viewPort.width / 420;
let root = document.documentElement;


const onClosePopup = () => {
    $('body').css("overflow", "auto");
    document.querySelector('#sheet').setAttribute("aria-hidden", 'true')
}

const playVideoReel = () => {
    const closeVideo = () => {
        console.log('close')

        $('.reel-block').removeClass('playing')
        $('.reel-block').addClass('muted')
        video.muted = true;
        video.loop = true;
        video.play();
        document.querySelector('.reel-block').removeEventListener('click', closeVideo)
    }

    $('.reel-block').addClass('playing')
    $('.reel-block').removeClass('muted')

    const video = document.querySelector('.reel-video')
    video.muted = false;
    video.loop = false;
    video.volume = 0.5;

    video.currentTime = 0;
    video.play()
    video.onended = closeVideo;
    video.onwaiting = () => {
        console.log('video loading')
        $('.loading').removeClass('hided')
    }
    video.onplaying = () => {
        document.querySelector('.reel-block').addEventListener('click', closeVideo)
        $('.loading').addClass('hided')
    }
}