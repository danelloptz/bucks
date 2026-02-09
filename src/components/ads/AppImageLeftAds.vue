<template>
    <div class="left_ads">
        <img 
            v-for="(item, index) in ads"
            :key="index"
            :src="item.image"
            class="left_ads_image"
            @click="openLink(item.link)"
        />
    </div>
</template>

<script>
    export default {
        props: {
            ads: {
                type: Array,
                required: true
            }
        },
        methods: {
            openLink(link) {
                window.location.href = link;
            }
        }
    };
</script>

<style scoped>
    .left_ads {
        width: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        margin-top: 50px;
    }

    .left_ads_image {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
        object-fit: cover;
        object-position: center;
        cursor: pointer;
    }
</style>
