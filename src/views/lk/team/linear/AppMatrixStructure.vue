<template>
    <section class="content">
        <span class="text">Занимая место в матрице, вы зарабатываете не только на своих приглашённых, но и получаете автоматический перелив от всех вышестоящих партнёров, что приносит вам стабильный пассивный доход. Система заполняется сверху вниз, слева направо - это значит, что структура работает на вас даже без личных приглашений.</span>
        <span class="text">Занимайте несколько Бизнес-мест, чтобы получать ещё больше перелива.</span>
        <span class="text">Ваше место ждёт вас - начните зарабатывать прямо сейчас!</span>

        <AppButton class="more_btn" @click="toogleTable">Как работает матрица</AppButton>
        <AppMatrixTable v-if="isTable" />

        <div class="line"></div>

        <AppButton class="buy_btn">Купить бизнес место</AppButton>

        <div class="cards_wrapper">
            <AppCardBusinessPlace 
                v-for="(_, index) in 5"
                :key="index"
                :place="index + 1"
                :days="7"
                :forbidden="true"
            />
        </div>

        <div class="line m25"></div>

        <AppCardMatrixBusiness 
            :business_number="1"
            :all_business="56789"
            :active_business="5678"
            :hideSensitive="false"
            class="card_matrix"
        />

        <AppBinarTree :data="matrix" />
    </section>
</template>

<script>
    import AppButton from '@/components/buttons/AppButton.vue';
    import AppMatrixTable from '@/components/tables/AppMatrixTable.vue';
    import AppCardBusinessPlace from '@/components/cards/AppCardBusinessPlace.vue';
    import AppCardMatrixBusiness from '@/components/cards/AppCardMatrixBusiness.vue';
    import AppBinarTree from '@/components/tables/AppBinarTree.vue';

    import { getMatrix } from '@/services/structure';
    
    export default {
        components: { AppButton, AppMatrixTable, AppCardBusinessPlace, AppCardMatrixBusiness, AppBinarTree },
        props: {
            userData: Object,
            hideSensitive: Boolean
        },
        data() {
            return {
                isTable: false,
                matrix: null
            }
        },
        async created() {
            const matrix_response = await getMatrix(false, 5, localStorage.getItem('token'));
            if (matrix_response) {
                this.matrix = matrix_response;
            }
        },
        methods: {
            toogleTable() {
                this.isTable = !this.isTable;
            }
        }
    };
</script>

<style scoped>
    .content {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        width: 100%;
        padding-top: 30px;
    }

    .text {
        font-size: 20px;
        color: white;
        font-family: 'OpenSans';
    }

    .more_btn {
        width: 240px;
        height: 50px;
        font-size: 16px;
        margin-top: 10px;
    }

    .line {
        width: 100%;
        height: 1px;
        margin-top: 20px;
        background: white;
        opacity: .5;
    }

    .buy_btn {
        width: 300px;
        height: 50px;
        font-size: 18px;
        margin-top: 20px;
    }

    .cards_wrapper {
        display: flex;
        width: 100%;
        flex-direction: column;
        row-gap: 10px;
        margin-top: 20px;
    }

    .m25 {
        margin-top: 25px !important;
    }

    .card_matrix {
        margin-top: 22px;
    }
</style>