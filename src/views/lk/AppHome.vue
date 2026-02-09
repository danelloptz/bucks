<template>
    <section class="main">
        <div class="left">
            <span class="logo">Лого</span>
            <AppNavigation
                @set_item="currentComponent = $event"
                class="nav"
            />
            <div class="line"></div>
            <AppLangDropdown :mini="true" class="dropdown_lang" />

            <div class="left_ads">
                <img 
                    v-for="(item, index) in left_ads"
                    :index="index"
                    :src="item.image" 
                    class="left_ads_image"
                    @click="openLink(item.link)"
                />
            </div>

            <div class="left_text_ads">
                <div 
                    v-for="(item, index) in text_ads"
                    :key="index"
                    class="left_text_ads_item"
                >
                    <h3>{{ item.title }}</h3>
                    <span>{{ item.description }}</span>
                    <a :href="item.link">{{ item.link }}</a>
                </div>
            </div>
            <AppButton class="left_ads_button">Добавить рекламу</AppButton>
        </div>
        <div class="content">

        </div>
    </section>
</template>

<script>
    import AppNavigation from '@/components/navigations/AppNavigation.vue';
    import AppLangDropdown from '@/components/dropdowns/AppLangDropdown.vue';
    import AppButton from '@/components/buttons/AppButton.vue';

    import { getUserInfo } from '@/services/users';

    export default {
        components: { AppNavigation, AppLangDropdown, AppButton },
        data() {
            return {
                currentComponent: 0,
                userData: null,
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
                ]
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
        },
        methods: {
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
        background: linear-gradient(135deg, #01216E, #040825);
        padding: 94px 10px;
        min-height: 100vh;
    }

    .logo {
        font-size: 42.54px;
        font-weight: 600;
        font-family: 'Mont';
        color: white;
    }

    .nav {
        margin-top: 35px;
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
</style>