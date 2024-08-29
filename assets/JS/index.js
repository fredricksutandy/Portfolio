function createWordListAnimation(animNode, delay) {
    // Fetch the DOM elements.
    var animWindow = animNode.querySelector(".animation-window");
    var ul = animWindow.querySelector("ul");
    var lis = ul.querySelectorAll("li");

    // Copy the animation's window to create the gray list.
    var grayList = animWindow.cloneNode(true);
    var grayUl = grayList.querySelector("ul");
    grayList.classList.remove("animation-window");
    grayList.classList.add("animation-gray-list");
    animNode.insertBefore(grayList, animWindow);

    // This function updates the dimensions of the window and the gray list immediately.
    function updateDimensions(li) {
        var liRect = li.getBoundingClientRect();
        var animWindowRect = animWindow.getBoundingClientRect();

        // Immediately set the height and width of both elements
        animWindow.style.height = liRect.height + "px";
        animWindow.style.width = animWindowRect.width + "px";
        
        grayList.style.height = liRect.height + "px";
        grayList.style.width = animWindowRect.width + "px";
    }

    // This function shows the li number `liNum`.
    function goTo(liNum) {
        var li = lis[liNum];
        var liTop = li.getBoundingClientRect().top;
        var ulTop = ul.getBoundingClientRect().top;
        var liOffset = (liTop - ulTop);

        // Update dimensions before the animation starts
        updateDimensions(li);

        // Adjust positions
        ul.style.top = -liOffset + "px";
        grayUl.style.top = -liOffset + "px";
    }

    // Initial dimensions setup
    updateDimensions(lis[0]);

    // Set up an interval that changes the current li every `delay` ms.
    var current = 0;
    var ascending = true;
    return setInterval(function () {
        ascending = ascending && current + 1 < lis.length || current === 0;
        current = ascending ? current + 1 : current - 1;
        goTo(current);
    }, delay);
}

createWordListAnimation(document.querySelector(".animation"), 2400 /* (ms) */);
