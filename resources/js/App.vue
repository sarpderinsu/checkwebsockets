<template>
    <div class="container">
        Websocket test
    </div>
</template>

<script>
export default {
    setup() {
        Echo.channel('something').listen('BroadcastingEvent', (e) => {
            console.log(e);
        });
    }
}
</script>
