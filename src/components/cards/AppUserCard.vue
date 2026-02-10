<template>
    <section class="card">
        <img :src="user.avatar" class="avatar" />
        <div class="content">
            <h2>{{ user.name || 'Без имени' }}</h2>
            <div class="bage" :style="{
                    background: bageColor
                }">
                <img v-if="user.tariff == 'Platinum'" src="@/assets/images/diamond.png" class="diamond" />
                <span class="bage_name" :style="{ color: user.tariff == 'Platinum' ? 'white' : '#282928' }">{{ user.tariff }}</span>
            </div>
            <div class="row">
                <span class="bage_id">ID: {{ user.referrer_code }}</span>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        props: {
            user: Object,
        },
        computed: {
            bageColor() {
                let color;
                switch (this.user.tariff) {
                    case 'Platinum':
                        color = 'linear-gradient(to right, #7D1F8C, #AF3BC2)';
                        break;
                    case 'Gold':
                        color = '#E8CE0F';
                        break;
                    case 'Silver':
                        color = '#EEEAEA';
                        break;
                    default:
                        color = 'white';
                        break;
                }
                return color;
            }
        }
    };
</script>

<style scoped>
    .card {
        display: flex;
        column-gap: 20px;
        align-items: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        @media (max-width: 520px) {
            width: 80px;
            height: 80px;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }

    h2 {
        font-size: 20px;
        font-weight: 700;
        font-family: 'OpenSans';
        color: white;
        @media (max-width: 520px) {
            font-size: 16px;
        }
    }

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

    .row {
        display: flex;
        align-items: center;
        column-gap: 30px;
    }

    .bage_id {
        font-size: 16px;
        font-weight: normal;
        font-family: 'OpenSans';
        color: white;
    }
</style>
