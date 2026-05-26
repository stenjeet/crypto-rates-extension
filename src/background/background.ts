import type { Coin } from '../types.ts';

interface TickersResponse {
	data: Coin[];
}

interface FetchDataMessage {
	action: 'fetchData';
}

type AppMessage = FetchDataMessage;

const API_KEY = 'https://api.coinlore.net/api/tickers/';

chrome.runtime.onMessage.addListener(
	(message: AppMessage, _sender: chrome.runtime.MessageSender, sendResponse: (response: TickersResponse | { error: string }) => void) => {
		if (message.action === 'fetchData') {
			fetch(API_KEY)
				.then(res => res.json() as Promise<TickersResponse>)
				.then(data => sendResponse(data))
				.catch((error: Error) => sendResponse({ error: error?.message }));
			return true;
		}
	},
);
