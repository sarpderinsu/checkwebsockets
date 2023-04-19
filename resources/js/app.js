import {createApp, h} from 'vue';
import App from "./App.vue";
import {provideApolloClient} from "@vue/apollo-composable";
import PusherLink from "./apollo";
import {ApolloClient, InMemoryCache} from "@apollo/client/core";
import {gql} from "apollo-boost";
import {createHttpLink} from "apollo-link-http";
import Pusher from "pusher-js";
import {ApolloLink} from "apollo-link";

const pusherLink = new PusherLink({
    pusher: new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
        httpHost: import.meta.env.VITE_PUSHER_HOST,
        httpPort: import.meta.env.VITE_PUSHER_PORT ?? 6001,
        httpsPort: import.meta.env.VITE_PUSHER_PORT ?? 6001,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
        wsHost: import.meta.env.VITE_PUSHER_HOST,
        wsPort: import.meta.env.VITE_PUSHER_PORT ?? 6001,
        wssPort: import.meta.env.VITE_PUSHER_PORT ?? 6001,
        forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
        enabledTransports: ['ws'],
        channelAuthorization: {
            endpoint: 'http://localhost/graphql/subscriptions/auth'
        }
    }),
    authEndpoint: `http://localhost/graphql/subscriptions/auth`,
    auth: {
        headers: {
            authorization: '',
        },
    },
});

const link = ApolloLink.from([
    pusherLink,
    createHttpLink({uri: `http://localhost/graphql`})
]);

const cache = new InMemoryCache()

const client = new ApolloClient({
    link,
    cache
});

client
.subscribe({
    query: gql`subscription {
        postUpdated {
            id
            text
        }
    }`,
})
.subscribe(({ data }) => {
    console.log(data);
});

const app = createApp({
    setup () {
        provideApolloClient(client)
    },
    render: () => h(App),
});

app.mount('#app');
