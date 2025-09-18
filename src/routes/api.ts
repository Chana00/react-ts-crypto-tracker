const BASE_URL = "https://api.coinpaprika.com/v1";
const OHLCV_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export async function fetchCoinTinker(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

export async function fetchCoinHistory(coinId: string) {
  return fetch(`${OHLCV_URL}/?coinId=${coinId}`).then((res) => res.json());
}
