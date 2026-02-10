<template>
    <section class="card">
        <h2 class="title">После вас зарегистрировано</h2>
        <span class="count">{{ formattedCount }}</span>
        <span class="mute">человек</span>
        <img src="@/assets/images/count_signup.png" class="img" />
    </section>
</template> 

<script>
    export default {
        props: {
            count: Number
        },
        computed: {
            formattedCount() {
                return this.count
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            }
        }

    };
</script>

<style scoped>
    .card {
        padding: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        background: linear-gradient(135.94deg, #01216E 0%, #040825 98.41%);
        position: relative;
        overflow: hidden;
        border-radius: 20px;
        justify-content: space-between;
    }

    .title {
        font-size: 24px;
        color: white;
        font-family: 'OpenSans';
        line-height: 28px;
        font-weight: 600;
    }

    .count {
        font-size: 46.67px;
        color: #BBCFF4;
        font-family: 'OpenSans';
        font-style: italic;
        margin-top: 12px;
        font-weight: 600;
    }

    .mute {
        font-size: 16px;
        color: white;
        font-family: 'OpenSans';
    }

    .img {
        position: absolute;
        top: 64px;
        left: 160px;
        width: 267px;
        height: 267px;
        mix-blend-mode: color-dodge;
    }
</style>