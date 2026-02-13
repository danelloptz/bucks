<template>
    <section class="main">
        <AppAvatarModal 
            v-if="avatarModal"
            :avatar="userData.avatar"
            :name="userData.name || 'Без имени'"
            :tariff="userData.tariff"
            :id="userData.referrer_code"
            @close="avatarModal = $event"
        />
        <div class="left">
            <span class="logo">Лого</span>
            <AppNavigation
                @set_item="setActiveComponent"
                class="nav"
            />
            <div class="line"></div>
            <AppLangDropdown :mini="true" class="dropdown_lang" />

            <AppImageLeftAds :ads="left_ads" />
            <AppTextAds :ads="text_ads" />

            <AppButton class="left_ads_button">Добавить рекламу</AppButton>
        </div>
        <div class="content">
            <div class="header">
                <AppUserWallet
                    :label="'Основной счет'"
                    :cash="hideSensitive ? '******' : mainWallet"
                    :icon="AppMainWallet"
                    :color="'#0059FF'"
                    :hideSensitive="hideSensitive"
                />
                <AppUserWallet
                    :label="'Реферальный счет'"
                    :cash="hideSensitive ? '******' : referalWallet"
                    :icon="AppReferalWallet"
                    :color="'#003BE1'"
                    :hideSensitive="hideSensitive"
                />
                <AppUserWallet
                    :label="'Рекламный счет'"
                    :cash="hideSensitive ? '******' : addsWallet"
                    :icon="AppAddWallet"
                    :color="'#001DC3'"
                    :hideSensitive="hideSensitive"
                />
                <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7F-gNQ26Wdle9t9FLbhGwyytfSqbdvYT2lw&s" 
                    class="header_avatar" 
                    @click="openAvatar"
                />
            </div>
            <div class="top_panel_row">
                <AppTopPanel :nav="stack" />
                <div 
                    class="eye_wrapper"
                    :class="{ closed: hideSensitive }"
                    @click="toggleSensitive"
                >
                    <img :src="eyeOpen" class="eye_icon" />
                </div>
            </div>
            <AppTeam 
                v-if="currentComponent == 2" 
                :userData="userData" 
                :hideSensitive="hideSensitive"
            />
        </div>
    </section>
</template>

<script>
    import AppNavigation from '@/components/navigations/AppNavigation.vue';
    import AppLangDropdown from '@/components/dropdowns/AppLangDropdown.vue';
    import AppButton from '@/components/buttons/AppButton.vue';
    import AppImageLeftAds from '@/components/ads/AppImageLeftAds.vue';
    import AppTextAds from '@/components/ads/AppTextAds.vue';
    import AppUserWallet from '@/components/cards/AppUserWallet.vue';
    import AppAvatarModal from '@/components/modals/AppAvatarModal.vue';
    import AppTopPanel from '@/components/navigations/AppTopPanel.vue';

    import AppTeam from '@/views/lk/team/AppTeam.vue';

    import AppMainWallet from '@/assets/images/main_wallet.png'
    import AppReferalWallet from '@/assets/images/referal_wallet.png'
    import AppAddWallet from '@/assets/images/add_wallet.png'
    import eyeOpen from '@/assets/images/eye.png'

    import { getUserInfo } from '@/services/users';

    export default {
        components: { AppNavigation, AppLangDropdown, AppButton, AppImageLeftAds, AppTextAds, AppUserWallet, AppAvatarModal, AppTopPanel, AppTeam },
        data() {
            return {
                currentComponent: 0,
                userData: null,
                stack: [],
                left_ads: [
                    {
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39FTbsc8poGH9X56qew1X5l8hxeVCrWgOjQ&s',
                        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR39FTbsc8poGH9X56qew1X5l8hxeVCrWgOjQ&s'
                    },
                    {
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7F-gNQ26Wdle9t9FLbhGwyytfSqbdvYT2lw&s',
                        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7F-gNQ26Wdle9t9FLbhGwyytfSqbdvYT2lw&s'
                    },
                ],
                text_ads: [
                    {
                        title: 'Дешевый трафик, клики, робот',
                        description: 'Сервис для накрутки кликов, голосований, переходов, реги!',
                        link: 'https://go-ip.ru'
                    },
                    {
                        title: 'Быстрый заработок онлайн',
                        description: 'Сервис, позволяющий зарабатывать деньги, выполняя простые задачи с компьютера или телефона',
                        link: 'https://socpublic.com'
                    },
                    {
                        title: 'Начни зарабатывать уже сегодня',
                        description: 'Быстрый заработок на выполнении простых заданий онлайн, не отходя от компьютера',
                        link: 'https://socpublic.com'
                    }
                ],
                hideSensitive: false,
                avatarModal: false,
                AppMainWallet,
                AppReferalWallet,
                AppAddWallet,
                eyeOpen
            }
        },
        async created() {
            await this.updateUserInfo();
        },
        computed: {
            mainWallet() {
                if (!this.userData) return "";

                const main = this.userData.wallets.find(item => item.type == 'main');
                return main.balance;
            },
            referalWallet() {
                if (!this.userData) return "";

                const main = this.userData.wallets.find(item => item.type == 'referral');
                return main.balance;
            },
            addsWallet() {
                if (!this.userData) return "";

                const main = this.userData.wallets.find(item => item.type == 'ads');
                return main.balance;
            },
        },
        methods: {
            toggleSensitive() {
                this.hideSensitive = !this.hideSensitive
            },
            async updateUserInfo() {
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
            },
            addItemStack(item) {
                this.stack.push(item);
            },
            resetStack(name) {
                this.stack = [];
                this.stack.push(name);
                console.log(name);
            },
            setActiveComponent(data) {
                console.log(data);
                this.currentComponent = data.index;
                this.resetStack(data.name);
            },
            openAvatar() {
                this.avatarModal = true;
            },
            openLink(link) {
                window.location.href = link;
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
        background: linear-gradient(135.94deg, #01216E 0%, #040825 98.41%);
        padding: 94px 10px;
        min-height: 100vh;
    }

    .logo {
        font-size: 42.54px;
        font-weight: 600;
        font-family: 'Mont';
        color: white;
    }

    .line {
        margin-top: 28px;
        width: 100%;
        height: 1px;
        background: white;
        opacity: .5;
    }

    .dropdown_lang {
        margin-top: 25px;
    }

    .left_ads {
        width: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        margin-top: 50px;
    }

    .left_ads_image {
        width: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
        object-fit: cover;
        object-position: center;
        cursor: pointer;
    }

    .left_text_ads {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        row-gap: 30px;
    }

    .left_text_ads_item {
        display: flex;
        flex-direction: column;
    }

    .left_text_ads_item h3 {
        font-family: 'OpenSans';
        font-size: 14.23px;
        font-weight: 400;
        color: #9DBFFF;
        text-decoration: underline;
    }

    .left_text_ads_item span {
        font-family: 'OpenSans';
        font-size: 12.45px;
        font-weight: 400;
        color: white;
        max-width: 200px;
        margin-top: 7.68px;
        margin-bottom: 3.68px;
    }

    .left_text_ads_item a {
        font-family: 'OpenSans';
        font-size: 12.45px;
        font-weight: 400;
        color: #9DBFFF;
        text-decoration: underline;
    }

    .left_ads_button {
        height: 40px;
        font-size: 16px;
        width: 100%;
        margin-top: 31px;
    }

    .content {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 57px;
    }

    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .header_avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
    }

    .top_panel_row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 35px;
    }

    .eye_wrapper {
        width: 30px;
        height: 30px;
        position: relative;
        cursor: pointer;
    }

    .eye_icon {
        width: 100%;
        height: 100%;
    }

    .eye_wrapper.closed {
        opacity: 0.7;
    }

    .eye_wrapper.closed::before {
        content: "";
        position: absolute;
        width: 42px;
        height: 2px;
        background: white;
        top: 50%;
        left: -6px;
        transform: rotate(-45deg);
    }

</style>