<template>
    <section class="card_container" :style="{
        background: forbidden ? '#510102' : '#011851'
    }">
        <div class="col">
            <div class="sm_row">
                <div class="check_wrapper">
                    <img 
                        :src="forbidden ? AppForbidden : AppCheck" 
                        class="check" 
                    />
                </div>
                <span class="text">Бизнес место {{ place }}</span>
            </div>
            <div class="sm_row_2">
                <span class="text">Осталось дней: <strong> {{ days }} </strong></span>
                <AppButton 
                    class="more_btn" 
                    :style="{ 
                        width: forbidden ? '160px' : '130px',
                        background: forbidden ? '#022B77' : '#0059FF'
                    }"
                >{{ forbidden ? 'Активировать' : 'Продлить' }}</AppButton>
            </div>
        </div>
        <div class="row">
            <div class="sm_row">
                <span class="text">Автопродление</span>
                <AppCheckbox v-model="isAutoPay" :empty="true" />
            </div>
            <AppButton class="open_btn" :style="{ background: forbidden ? '#FF0004' : '#0059FF' }">Открыть матрицу</AppButton>
        </div>
    </section>
</template>

<script>
    import AppButton from '@/components/buttons/AppButton.vue';
    import AppCheckbox from '@/components//inputs/AppCheckbox.vue';

    import AppCheck from '@/assets/images/check.png';
    import AppForbidden from '@/assets/images/forbidden.png';

    export default {
        props: {
            place: Number,
            days: Number, 
            forbidden: Boolean
        },
        components: { AppButton, AppCheckbox },
        data() {
            return {
                isAutoPay: true,
                AppCheck,
                AppForbidden
            }
        }
    };
</script>

<style scoped>
    .card_container {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 20px;
        border-radius: 15px;
    }

    .col {
        display: flex;
        flex-direction: column;
    }

    .sm_row {
        display: flex;
        align-items: center;
        column-gap: 10px;
    }

    .check_wrapper {
        width: 21px;
        height: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #01206B;
        border-radius: 5.25px;
    }

    .check {
        width: 13.12px;
        height: 13.12px;
    }

    .text {
        font-size: 20px;
        font-family: 'OpenSans';
        color: white;
    }

    .sm_row_2 {
        display: flex;
        align-items: flex-end;
        column-gap: 20px;
    }

    .more_btn {
        width: 130px;
        height: 40px;
        font-size: 16px;
    }

    .row {
        display: flex;
        align-items: center;
        column-gap: 48px;
    }

    .check_wrapper_empty {
        width: 21px;
        height: 21px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: none;
        border-radius: 5.25px;
        border-radius: 1px solid white;
    }

    .open_btn {
        width: 190px;
        height: 40px;
        font-size: 16px;
    }
</style>