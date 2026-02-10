<template>
    <section class="card">
        <h2 class="title">Линейная структура</h2>
        <div class="row">
            <div class="col">
                <span class="count">{{ formattedFirstLine }}</span>
                <span class="mute">первая линия</span>
            </div>
            <div class="col">
                <span class="count">{{ formattedTotal }}</span>
                <span class="mute">всего</span>
            </div>
        </div>
        <img src="@/assets/images/card_linear.png" class="img" />
    </section>
</template> 

<script>
    export default {
        props: {
            first_line: Number,
            total: Number
        },
        computed: {
            formattedFirstLine() {
                return this.first_line
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            },
            formattedTotal() {
                return this.first_line
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            },
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
        top: -94px;
        left: 333px;
        width: 323px;
        height: 323px;
        mix-blend-mode: color-dodge;
    }

    .row {
        display: flex;
        align-items: center;
        column-gap: 43px;
    }

    .col {
        display: flex;
        flex-direction: column;
    }
</style>