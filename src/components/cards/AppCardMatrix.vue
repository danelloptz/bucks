<template>
    <section class="card">
        <h2 class="title">Матрица</h2>
        <div class="row">
            <div class="col">
                <div class="sm_row">
                    <div class="icon_wrapper">
                        <img src="@/assets/images/check.png" class="icon"/>
                    </div>
                    <span class="count">{{ formattedActive }}</span>
                </div>
                <span class="mute">активных бизнес мест</span>
            </div>
            <div class="col">
                <div class="sm_row">
                    <div class="icon_wrapper">
                        <img src="@/assets/images/forbidden.png" class="icon"/>
                    </div>
                    <span class="count">{{ formattedUnactive }}</span>
                </div>
                <span class="mute">неактивных бизнес мест</span>
            </div>
            <div class="col">
                <div class="sm_row">
                    <div class="icon_wrapper">
                        <img src="@/assets/images/tree.png" class="icon"/>
                    </div>
                    <span class="count">{{ formattedStructure }}</span>
                </div>
                <span class="mute">cтруктура</span>
            </div>
        </div>
        <img src="@/assets/images/wtf.png" class="img" />
    </section>
</template> 

<script>
    export default {
        props: {
            active_business: Number,
            unactive_business: Number,
            structure: Number,
            hideSensitive: Boolean
        },
        computed: {
            formattedActive() {
                if (!this.active_business && this.active_business != 0) return "";
                return this.hideSensitive ? '******' : this.active_business
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            },
            formattedUnactive() {
                if (!this.unactive_business && this.unactive_business != 0) return "";
                return this.hideSensitive ? '******' : this.unactive_business
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            },
            formattedStructure() {
                if (!this.structure && this.structure != 0) return "";
                return this.hideSensitive ? '******' : this.structure
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
        right: -140px;
        width: 334px;
        height: 334px;
        mix-blend-mode: color-dodge;
    }

    .row {
        display: flex;
        align-items: center;
        column-gap: 65px;
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