// Get Elements from the DOM
const speedInput = document.getElementById('speed');
const selectBtn = document.getElementById('selectElement');
const stopBtn = document.getElementById('stopClick');

// Select Element for start auto-clicking
selectBtn.onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // 1. Enable element selection mode in content script
    chrome.tabs.sendMessage(tab.id, { action: "start_selection" });

    // 2. Transform the button to start auto-clicking
    selectBtn.textContent = "Start autoclick";
    selectBtn.onclick = () => {
        chrome.tabs.sendMessage(tab.id, {
            action: "start_clicking",
            interval: parseInt(speedInput.value)
        });
        selectBtn.disabled = true;
        stopBtn.disabled = false;
    };
};

// Stop auto-clicking
stopBtn.onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, { action: "stop_clicking" });

    selectBtn.disabled = false;
    selectBtn.textContent = "Select Element";
    stopBtn.disabled = true;
    location.reload();
};