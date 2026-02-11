<template>
    <section class="content">
        <span class="text">Линейная структура — ваш личный денежный поток, который растёт с каждым приглашённым!</span>
        <span class="text">Здесь можно зарабатывать даже бесплатно:</span>

        <div class="text_row">
            <div class="check_wrapper">
                <img src="@/assets/images/check.png" class="check" />
            </div>
            <span class="text">10% от лично приглашенных - без вложений</span>
        </div>
        <div class="text_row">
            <div class="check_wrapper">
                <img src="@/assets/images/check.png" class="check" />
            </div>
            <span class="text">Ежедневный доход на рекламе - без приглашений</span>
        </div>
        <div class="text_row">
            <div class="check_wrapper">
                <img src="@/assets/images/check.png" class="check" />
            </div>
            <span class="text">Пассивный доход в матрице - за счёт переливов</span>
        </div>
        <div class="text_row">
            <div class="check_wrapper">
                <img src="@/assets/images/check.png" class="check" />
            </div>
            <span class="text">Качественная целевая реклама - рекламодатели сами ищут нас</span>
        </div>

        <span class="text">На платных тарифах доход умножается в разы. Чем активнее приглашаете — тем больше зарабатываете.</span>
        <span class="text">Начните строить свою структуру прямо сейчас — каждый день промедления это упущенная прибыль!</span>

        <AppButton class="linear_btn">Как работает линейный маркетинг</AppButton>

        <div class="row">
            <AppSearch v-model="search" :placeholder="'Введите ID'" class="search" />
            <AppButton class="search_btn">Поиск</AppButton>
            <AppButtonEmpty class="search_btn">Сброс</AppButtonEmpty>
        </div>

        <!-- <AppUserLinear
            :avatar="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNQoZ_eF4ZVub99aUtKo8WZSBSLWEiyr99UQ&s'"
            :name="'Петрова Марина Викторовна'"
            :tariff="'Silver'"
            :code="'583947261'"
            :level="1"
            :first_line="55"
            :team="505"
        /> -->
        <AppUserLinear
            :user="rootUser"
            :depth="0"
            class="main_linear"
        />
    </section>
</template>

<script>
    import AppButton from '@/components/buttons/AppButton.vue';
    import AppSearch from '@/components/inputs/AppSearch.vue';
    import AppButtonEmpty from '@/components/buttons/AppButtonEmpty.vue';
    import AppUserLinear from '@/components/cards/AppUserLinear.vue';

    export default {
        components: { AppButton, AppSearch, AppButtonEmpty, AppUserLinear },
        data() {
            return {
                search: null,
                rootUser: {
                    id: 583947261,
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNQoZ_eF4ZVub99aUtKo8WZSBSLWEiyr99UQ&s',
                    name: 'Петрова Марина Викторовна',
                    tariff: 'Silver',
                    level: 1,
                    first_line: 55,
                    team: 505
                }
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

    .text_row {
        display: flex;
        column-gap: 5px;
        align-items: center;
    }

    .check_wrapper {
        padding: 4px;
        background: #01206B;
        border-radius: 5.25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .check {
        width: 13.12px;
        height: 13.12px;
    }

    .linear_btn {
        width: 340px;
        height: 50px;
        font-size: 16px;
    }

    .row {
        display: flex;
        align-items: center;
        column-gap: 20px;
        margin-top: 50px;
    }

    .search {
        width: 420px;
        height: 40px;
    }

    .search_btn {
        width: 130px;
        height: 40px;
        font-size: 16px;
    }

    .main_linear {
        overflow-x: auto;
    }
</style>