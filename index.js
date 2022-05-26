function injectScript() {
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', chrome.runtime.getURL('app.js'));
    document.body.appendChild(script);
}

injectScript();
