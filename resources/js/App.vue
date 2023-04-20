<template>
    <div class="container">
        Websocket test
        <div v-for="post in posts">
            {{ post.text }}
        </div>
    </div>
</template>

<script>
import {gql} from "apollo-boost";

export default {
    setup() {
        return {
        }
    },

    mounted() {
        this.$apollo.query(this.query).then()
    },

    data() {
        return {
            query: gql`query {posts {id text}}`,
            posts: [],
        }
    },

    apollo: {
        posts: this.query,
    }
}
</script>
