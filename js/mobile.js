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
