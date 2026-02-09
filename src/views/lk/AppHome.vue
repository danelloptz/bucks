<template>
    <section class="main">
        <div class="left">
            <span class="logo">Лого</span>
            <AppNavigation
                @set_item="currentComponent = $event"
            />
            <div class="line"></div>
            <AppLangDropdown />
        </div>
        <div class="content">

        </div>
    </section>
</template>

<script>
    import AppNavigation from '@/components/navigations/AppNavigation.vue';
    import AppLangDropdown from '@/components/dropdowns/AppLangDropdown.vue';

    import { getUserInfo } from '@/services/users';

    export default {
        components: { AppNavigation, AppLangDropdown },
        data() {
            return {
                currentComponent: 0,
                userData: null
            }
        },
        async created() {
            try {
                const user_info_reponse = await getUserInfo(localStorage.getItem('token'));
                if (!user_info_reponse) {
                    localStorage.clear();
                    this.$router.push('/');
                }
                this.userData = user_info_reponse;
            } catch(err) {
                console.log(err);
                localStorage.clear();
                this.$router.push('/');
            }
        }
    };
</script>

<style scoped>
    .main {
        width: 100%;
        display: flex;
        column-gap: 38px;
        @media (min-width: 1440px) {
            width: 1200px;
        }
    }

    .left {
        display: flex;
        flex-direction: column;
        background: linear-gradient(45deg, #01216E, #040825);
        padding: 94px 10px;
    }
</style>