import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const hostname = process.env.REACT_APP_NEWS_API_HOST;

const cryptoNewsApiHeaders = {
	"x-rapidapi-host": hostname,
	"x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
};

const baseUrl = `https://${hostname}`;

const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
	reducerPath: "cryptoNewsApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptoNews: builder.query({
			query: ({ newsCategory, count }) =>
				createRequest(
					`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
				),
		}),
	}),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
