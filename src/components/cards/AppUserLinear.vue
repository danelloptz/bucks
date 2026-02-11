<template>
    <section class="card">
        <div class="toogle_wrapper">
            <span class="toogle">+</span>
        </div>
        <img :src="avatar" class="avatar" />
        <div class="col">
            <span class="name">{{ name }}</span>
            <div class="row">
                <div class="bage" :style="{
                        background: bageColor
                    }">
                    <img v-if="tariff == 'Platinum'" src="@/assets/images/diamond.png" class="diamond" />
                    <span class="bage_name" :style="{ color: tariff == 'Platinum' ? 'white' : '#282928' }">{{ tariff }}</span>
                </div>
                <span class="id">ID: {{ code }}</span>
            </div>
        </div>
        <div class="col m1">
            <div class="row">
                <img src="@/assets/images/level.png" class="row_icon" />
                <span class="row_text">Уровень</span>
            </div>
            <span class="col_text">{{ level }}</span>
        </div>
        <div class="col m2">
            <div class="row">
                <img src="@/assets/images/user.png" class="row_icon" />
                <span class="row_text">Первая линия</span>
            </div>
            <span class="col_text">{{ first_line }}</span>
        </div>
        <div class="col m3">
            <div class="row">
                <img src="@/assets/images/team.png" class="row_icon" />
                <span class="row_text">Команда</span>
            </div>
            <span class="col_text">{{ team }}</span>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            avatar: String,
            name: String,
            tariff: String,
            code: Number,
            level: Number,
            first_line: Number,
            team: Number
        },
        computed: {
            bageColor() {
                switch (this.tariff) {
                    case 'Platinum':
                        return 'linear-gradient(to right, #7D1F8C, #AF3BC2)';
                    case 'Gold':
                        return '#E8CE0F';
                    case 'Silver':
                        return '#EEEAEA';
                    default:
                        return 'white';
                }
            }
        },
    };
</script>

<style scoped>
    .bage {
        padding: 1px 6px;
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 2px;
        width: fit-content;
    }

    .diamond {
        width: 10px;
        height: 10px;
    }

    .bage_name {
        font-size: 10.98px;
        font-weight: 700;
        font-family: 'OpenSans';
    }

    .card {
        width: 100%;
        display: flex;
        align-items: center;
        background: #011851;
        border-radius: 15px;
        padding: 8px 10px;
    }

    .toogle_wrapper {
        padding: 3px 5px;
        background: #0059FF;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .toogle {
        font-size: 11.92px;
        color: white;
        line-height: 1;
    }

    .avatar {
        width: 63.82px;
        height: 63.82px;
        border-radius: 50%;
        margin-left: 10px;
        object-fit: cover;
        object-position: center;
        margin-right: 8px;
    }

    .col {
        display: flex;
        flex-direction: column;
    }

    .name {
        font-size: 16.82px;
        color: white;
        font-family: 'OpenSans';
        font-weight: 600;
    }

    .row {
        display: flex;
        align-items: center;
        column-gap: 6px;
    }

    .id {
        font-size: 10.98px;
        color: white;
        font-family: 'OpenSans';
    }

    .row_icon {
        width: 11px;
        height: 11px;
    }

    .row_text {
        font-size: 10px;
        font-family: 'OpenSans';
        color: white;
    }

    .col_text {
        font-size: 34.84px;
        font-family: 'OpenSans';
        color: white;
    }

    .m1 {
        margin-left: 44px;
    }

    .m2 {
        margin-left: 54px;
    }

    .m3 {
        margin-left: 85px;
    }
</style>

