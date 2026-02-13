<template>
    <section class="card">
        <h2 class="title">Бизнес место {{ business_number }}</h2>
        <div class="row">
            <div class="col">
                <span class="count">{{ formattedAll }}</span>
                <span class="mute">всего бизнес мест</span>
            </div>
            <div class="col">
                <span class="count">/</span>
            </div>
            <div class="col">
                <span class="count">{{ formattedActive }}</span>
                <span class="mute">активных бизнес мест</span>
            </div>
        </div>
        <img src="@/assets/images/wtf.png" class="img" />
        <img src="@/assets/images/wtf.png" class="img2" />
    </section>
</template> 

<script>
    export default {
        props: {
            business_number: String,
            all_business: Number,
            active_business: Number,
            hideSensitive: Boolean
        },
        computed: {
            formattedActive() {
                if (!this.active_business && this.active_business != 0) return "";
                return this.hideSensitive ? '******' : this.active_business
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            },
            formattedAll() {
                if (!this.all_business && this.all_business != 0) return "";
                return this.hideSensitive ? '******' : this.all_business
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
        font-weight: 600;
    }

    .mute {
        font-size: 16px;
        color: white;
        font-family: 'OpenSans';
    }

    .img {
        position: absolute;
        top: -56px;
        right: -206px;
        width: 334px;
        height: 334px;
        mix-blend-mode: color-dodge;
    }

    .img2 {
        position: absolute;
        top: -58px;
        left: 503px;
        width: 334px;
        height: 334px;
        mix-blend-mode: color-dodge;
        transform: rotate(60.12deg);
    }

    .row {
        display: flex;
        column-gap: 41px;
        margin-top: 10px;
    }

    .col {
        display: flex;
        flex-direction: column;
    }

    .sm_row {
        display: flex;
        align-items: center;
        column-gap: 10px;
        margin-top: 12px;
    }

    .icon_wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
        background: #01206B;
        border-radius: 5px;
        margin-top: 5px;
    }

    .icon {
        width: 12.5px;
        height: 12.5px;
    }
</style>