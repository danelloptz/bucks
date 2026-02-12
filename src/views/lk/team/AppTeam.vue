<template>
    <section class="team">
        <div class="row">
            <AppCardSignup 
                :count="struct?.total_users_after_reg" 
            />
            <AppCardLinear 
                :first_line="struct?.linear_structure.level_1" 
                :total="struct?.linear_structure.total" 
            />
        </div>
        <AppCardMatrix 
            :active_business="struct?.matrix_structure.active_business_places" 
            :unactive_business="struct?.matrix_structure.inactive_business_places" 
            :structure="struct?.matrix_structure.total_users_in_structure" 
            class="long_card" 
        />

        <div class="line"></div>

        <div class="user_data">
            <div class="col">
                <h2 class="col_title">Ваш ID:</h2>
                <div class="sm_row">
                    <span>{{ userData.referrer_code }}</span>
                    <img
                        v-if="copied !== 'id'"
                        src="@/assets/images/copy.png"
                        class="copy"
                        @click="copyToClipboard(String(userData.referrer_code), 'id')"
                    />

                    <img
                        v-else
                        src="@/assets/images/check.png"
                        class="copy success"
                    />
                </div>
            </div>
            <div class="col">
                <span class="col_title">
                    Реферальная ссылка:
                </span>

                <div class="sm_row">
                    <span>{{ `${baseUrl}?=${userData.referrer_code}` }}</span>
                    <img
                        v-if="copied !== 'ref'"
                        src="@/assets/images/copy.png"
                        class="copy"
                        @click="copyToClipboard(`${baseUrl}?=${userData.referrer_code}`, 'ref')"
                    />

                    <img
                        v-else
                        src="@/assets/images/check.png"
                        class="copy success"
                    />
                </div>
            </div>
        </div>
        <AppSwitch
            v-model="activeIndex"
            :items="listSwtich"
            class="switch"
        />
        <AppLinearStructure v-if="activeIndex == 0" :userData="userData" />
    </section>
</template>

<script>
    import AppCardSignup from '@/components/cards/AppCardSignup.vue';
    import AppCardLinear from '@/components/cards/AppCardLinear.vue';
    import AppCardMatrix from '@/components/cards/AppCardMatrix.vue';
    import AppSwitch from '@/components/switchs/AppSwitch.vue';

    import AppLinearStructure from '@/views/lk/team/linear/AppLinearStructure.vue';

    import { getStructure } from '@/services/structure';

    export default {
        components: { AppCardSignup, AppCardLinear, AppCardMatrix, AppSwitch, AppLinearStructure },
        props: {
            userData: Object,
        },
        data() {
            return {
                baseUrl: null,
                copied: false,
                listSwtich: ['Линейная структура', 'Матрица'],
                activeIndex: 0,
                struct: null
            }
        },
        async created() {
            this.baseUrl = import.meta.env.VITE_API_BASE_URL;
            const structure_response = await getStructure(localStorage.getItem('token'));
            if (structure_response) {
                this.struct = structure_response;
            }
            {
                // "user_id": "8c75c407-d71e-4648-976c-de4e3cc6a24e",
                // "total_users_after_reg": 1,
                // "linear_structure": {
                //     "level_1": 1,
                //     "total": 1
                // },
                // "matrix_structure": {
                //     "active_business_places": 1,
                //     "inactive_business_places": 0,
                //     "total_users_in_structure": 0
                // }
            }
        },
        methods: {
            async copyToClipboard(text, type) {
                try {
                    await navigator.clipboard.writeText(text);
                    this.copied = type;

                    setTimeout(() => {
                        this.copied = null;
                    }, 2000);
                } catch (err) {
                    console.error('Ошибка копирования', err);
                }
            }
        }
    };
</script>

<style scoped>
    .team {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .row {
        display: grid;
        grid-template-columns: 353px 1fr;
        column-gap: 30px;  
        margin-top: 33px; 
    }

    .long_card {
        margin-top: 30px;
    }

    .line {
        margin-top: 40px;
        width: 100%;
        height: 1px;
        color: white;
        opacity: .5;
    }

    .col_title {
        font-size: 20px;
        font-family: 'OpenSans';
        color: white;
        font-weight: normal;
    }

    .ref_text {
        max-width: 210px;
        overflow-wrap: break-word;
    }

    .copy {
        width: 15px;
        height: 15px;
        cursor: pointer;
    }

    .copy.success {
        filter: drop-shadow(0 0 6px rgba(0, 255, 0, 0.6));
    }

    .user_data {
        display: flex;
        column-gap: 130px;
        width: 100%;
    }

    .col {
        display: flex;
        flex-direction: column;
        row-gap: 7px;
    }

    .sm_row {
        display: flex;
        column-gap: 23px;
        align-items: center;
    }

    .sm_row span {
        font-size: 25.83px;
        font-family: 'OpenSans';
        color: white;
        font-weight: 600;
    }

    .switch {
        margin-top: 56px;
    }
</style>