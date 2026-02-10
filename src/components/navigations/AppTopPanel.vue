<template>
    <section class="nav">
        <div 
            v-for="(item, index) in nav"
            :key="index"
            class="item"
        >
            <span>{{ item }}</span>
            <span v-if="!(index == nav.length - 1)">/</span>
        </div>
    </section>
</template> 

<script>
    export default {
        props: {
            nav: Array
        }
    };
</script>

<style scoped>
    .nav {
        display: flex;
        column-gap: 5px;
        align-items: center;
    }

    .item {
        display: flex;
        align-items: center;
        column-gap: 5px;
    }

    .item span {
        font-size: 16px;
        color: white;
        font-family: 'OpenSans';
    }
</style>