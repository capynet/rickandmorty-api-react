import { createClient, fetchExchange, cacheExchange } from "urql";

export const client = createClient({
    url: import.meta.env.VITE_APP_RICK_MORTY_API,
    exchanges: [cacheExchange, fetchExchange],
});