function injectScript() {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL('app.js');
    script.onload = script.remove
    document.head.appendChild(script);
}

injectScript();
