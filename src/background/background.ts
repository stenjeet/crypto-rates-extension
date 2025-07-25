const API_KEY: string = 'https://api.coinlore.net/api/tickers/';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action == 'fetchData') {
		fetch(API_KEY)
			.then(res => res.json())
			.then(data => sendResponse(data))
			.catch(error => sendResponse({error: error?.message}))
		return true;
	};
});