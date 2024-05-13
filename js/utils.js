function removeChildByQuerySelectors(parentId, childId) {
    let parent = document.querySelector(parentId);
    let child = document.querySelector(childId);
    parent.removeChild(child);
}


/**
 * This function disables a button with a certain id.
 * @param {string} id button id
 */
function disableButton(id) {
    if(id) {
        document.getElementById(id).disabled = true;
    }
}


/**
 * This function is used to determine if the width of the window is below a certain number of pixels.
 * @param {number} x number of pixels
 * @returns {boolean} true if the width is smaller than x
 */
function isWidthSmallerThanXPixels(x) {
    return window.matchMedia(`(max-width: ${x}px)`).matches;
}