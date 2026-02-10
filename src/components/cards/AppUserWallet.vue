<template>
    <section class="card" :style="{ background: color }">
        <div class="content">
            <span class="mute">{{ label }}</span>
            <h2 class="cash">{{ cash }}$</h2>
        </div>
        <img :src="icon" class="icon" />
    </section>
</template>

<script>
    export default {
        props: {
            label: String,
            cash: String,
            icon: String,
            color: String
        }
    };
</script>

<style scoped>
    .card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 248px;
        padding: 8px 17px 2px 24px;
        border-radius: 15px;
    }

    .content {
        display: flex;
        flex-direction: column;
        row-gap: 2px;
    }

    .mute {
        font-family: 'OpenSans';
        font-size: 14px;
        opacity: .5;
        color: white;
    }

    .cash {
        font-family: 'OpenSans';
        font-size: 18.47px;
        color: white;
    }

    .icon {
        width: 49.88px;
        height: 49.88px;
        opacity: .2;
    }
</style>