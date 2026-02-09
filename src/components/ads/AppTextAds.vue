<template>
    <div class="left_text_ads">
        <div 
            v-for="(item, index) in ads"
            :key="index"
            class="left_text_ads_item"
        >
            <h3>{{ item.title }}</h3>
            <span>{{ item.description }}</span>
            <a :href="item.link" target="_blank">
                {{ item.link }}
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            ads: {
                type: Array,
                required: true
            }
        }
    };
</script>

<style scoped>
    .left_text_ads {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        row-gap: 30px;
    }

    .left_text_ads_item {
        display: flex;
        flex-direction: column;
    }

    .left_text_ads_item h3 {
        font-family: 'OpenSans';
        font-size: 14.23px;
        font-weight: 400;
        color: #9DBFFF;
        text-decoration: underline;
    }

    .left_text_ads_item span {
        font-family: 'OpenSans';
        font-size: 12.45px;
        font-weight: 400;
        color: white;
        max-width: 200px;
        margin-top: 7.68px;
        margin-bottom: 3.68px;
    }

    .left_text_ads_item a {
        font-family: 'OpenSans';
        font-size: 12.45px;
        font-weight: 400;
        color: #9DBFFF;
        text-decoration: underline;
    }
</style>
