let targetElement = null;
let clickInterval = null;

// Listener pop-up messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "start_selection") {
        enableSelectionMode();
    } else if (request.action === "start_clicking") {
        startAutoClick(request.interval);
    } else if (request.action === "stop_clicking") {
        stopAutoClick();
    }
});

// Function to enable selection mode
function enableSelectionMode() {
    const overlay = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target.style.outline = "2px solid #007bff";
    };

    const removeOverlay = (e) => {
        e.target.style.outline = "";
    };

    const select = (e) => {
        e.preventDefault();
        e.stopPropagation();
        targetElement = e.target;
        targetElement.style.outline = "2px dashed red";

        // Stop selection events
        document.removeEventListener('mouseover', overlay);
        document.removeEventListener('mouseout', removeOverlay);
        document.removeEventListener('click', select, true);

        alert("Element selected ! You can start the autoclick.");
    };

    document.addEventListener('mouseover', overlay);
    document.addEventListener('mouseout', removeOverlay);
    document.addEventListener('click', select, true);
}

// Function to start auto-clicking
function startAutoClick(interval) {
    if (!targetElement) return;
    stopAutoClick(); // Sécurité
    clickInterval = setInterval(() => {
        if (targetElement) {
            targetElement.click();
        }
    }, interval);
}

// Function to stop auto-clicking
function stopAutoClick() {
    if (clickInterval) {
        clearInterval(clickInterval);
        clickInterval = null;
    }
}