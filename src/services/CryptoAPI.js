import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const hostname = process.env.REACT_APP_CRYPTO_RAPID_API_HOST;

const cryptoApiHeaders = {
	"x-rapidapi-host": hostname,
	"x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
};

const baseUrl = `https://${hostname}`;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
	reducerPath: "cryptoApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query({ query: (count) => createRequest(`/coins?limit=${count}`) }),
		getCryptoDetails: builder.query({ query: (coinId) => createRequest(`/coin/${coinId}`) }),
	}),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;
