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
            <AppButton class="search_btn" @click="searchUser(search)">Поиск</AppButton>
            <AppButtonEmpty class="search_btn" @click="loadRootChildren()">Сброс</AppButtonEmpty>
        </div>

        <span class="text error" v-if="error">{{ error }}</span>

        <!-- <AppUserLinear
            :avatar="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNQoZ_eF4ZVub99aUtKo8WZSBSLWEiyr99UQ&s'"
            :name="'Петрова Марина Викторовна'"
            :tariff="'Silver'"
            :code="'583947261'"
            :level="1"
            :first_line="55"
            :team="505"
        /> -->
        <div class="main_linear">
            <AppUserLinear
                v-for="child in rootChildren"
                :key="child.id"
                :user="child"
                :depth="0"
            />
        </div>
    </section>
</template>

<script>
    import AppButton from '@/components/buttons/AppButton.vue';
    import AppSearch from '@/components/inputs/AppSearch.vue';
    import AppButtonEmpty from '@/components/buttons/AppButtonEmpty.vue';
    import AppUserLinear from '@/components/cards/AppUserLinear.vue';

    import { getLinear, findUser } from '@/services/structure';

    export default {
        components: { AppButton, AppSearch, AppButtonEmpty, AppUserLinear },
        props: {
            userData: Object,
        },
        data() {
            return {
                search: null,
                rootChildren: [],
                loading: false,
                page: 1,
                perPage: 5,
                totalPages: 1,
                error: null
            }
        },
        async created() {
            await this.loadRootChildren();
        },
        methods: {
            async searchUser(id) {
                try {
                    const search_response = await findUser(id, localStorage.getItem('token'));
                    if (!search_response) {
                        this.error = 'Такого пользователя нет в вашей структуре';
                        return;
                    }
                    await this.loadRootChildren(search_response.id);
                } catch(err) {
                    this.error = 'Такого пользователя нет в вашей структуре';
                }
                
            }, 
            async loadRootChildren(id = false) {
                try {
                    this.loading = true;

                    const token = localStorage.getItem('token');
                    const offset = (this.page - 1) * this.perPage;

                    const user_id = id ? id : this.userData.id;

                    const response = await getLinear(
                        user_id,
                        this.perPage,
                        offset,
                        token
                    )

                    this.rootChildren = response.users;
                    this.totalPages = response.level_1;
                    this.error = null;
                }
                finally {
                    this.loading = false;
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
        min-height: 300px;
    }

    .error {
        color: red !important;
    }
</style>