<template>
    <section class="container">
        <header class="header">
            <span class="logo">Лого</span>
            <AppLangDropdown />
        </header>

        <div class="main">
            <div class="content">
                <h2>Авторизация</h2>
                <AppInput 
                    :modelValue="email"
                    :type="'email'"
                    :label="'Почта'"
                    @update="email = $event"
                />
                <AppInput 
                    :modelValue="password"
                    :type="'password'"
                    :label="'Пароль'"
                    @update="password = $event"
                    class="password"
                />
                <span class="label">Забыли пароль?</span>
                <span v-if="error" class="error">{{ error }}</span>
                <AppButton class="button" @click="signin">Войти</AppButton>
                <span class="label" @click="createAccount">Нет аккаунта? Зарегистрироваться</span>
            </div>
            <img src="@/assets/images/wtf.png" class="wtf" />
        </div>

        <div class="footer"></div>
    </section>
</template>

<script>
    import AppLangDropdown from '@/components/dropdowns/AppLangDropdown.vue';
    import AppInput from '@/components/inputs/AppInput.vue';
    import AppButton from '@/components/buttons/AppButton.vue';
    import AppCheckbox from '@/components/inputs/AppCheckbox.vue';
    import AppUserCard from '@/components/cards/AppUserCard.vue';

    import { logIn } from '@/services/auth';
    export default {
        components: { AppLangDropdown, AppInput, AppButton, AppCheckbox, AppUserCard },
        data() {
            return {
                langs: ['Русский', 'Английский', 'Китайский'],
                email: "",
                password: "",
                code: null,
                isCheked: false,
                referrer: null,
                error: null
            }
        },
        mounted() {
            this.handleUrlParams();
        },
        methods: {
            handleUrlParams() {
                const params = new URLSearchParams(window.location.search);
                const ref = params.get("ref");
                if (ref) {
                    localStorage.setItem('referer', ref);
                }
            },
            createAccount() {
                this.$router.push('/signup');
            },
            async getReferer() {
                this.referrer = {
                    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw65CdYNW5DUBZzRKFNIM2dXEr0JoihVpDEw&s',
                    name: 'Ватлин Анатолий Петрович',
                    tariff: 'Silver',
                    id: 842052594
                };
            },
            async signin() {
                const signin_repsonse = await logIn(this.email, this.password);
                if (signin_repsonse.access_token) {
                    localStorage.setItem('token', signin_repsonse.access_token);
                    localStorage.setItem('refresh_token', signin_repsonse.refresh_token);
                    this.$router.push('/home');
                } else {
                    this.error = 'Неправильные данные для входа';
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 65px;
        background: #030415;
        @media (max-width: 520px) {
            padding-top: 23px;
            justify-content: space-between;
        }
    }

    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0px 140px;
        @media (max-width: 900px) {
            padding: 0px 50px;
        }
        @media (max-width: 520px) {
            padding: 0px 15px;
        }
    }

    .logo {
        font-family: 'Mont';
        font-size: 42.54px;
        font-weight: 600;
        color: white;
        @media (max-width: 520px) {
            font-size: 33.49px;
        }
    }

    .main {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding-left: 140px;
        margin-top: 77px;
        align-items: center;
        @media (max-width: 1160px) {
            display: flex;
            flex-direction: column;
        }
        @media (max-width: 900px) {
            padding-left: 50px;
        }
        @media (max-width: 520px) {
            padding: 0px 15px;
            margin-top: 42px;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
    }

    .wtf {
        width: 574px;
        height: 574px;
        mix-blend-mode: color-dodge;
        opacity: .5;
        justify-self: end;
        @media (max-width: 1160px) {
            display: none;
        }
    }

    h2 {
        font-size: 36px;
        font-family: 'Mont';
        font-weight: 700;
        color: white;
        margin-bottom: 30px;
        @media (max-width: 520px) {
            font-size: 24px;
            margin-bottom: 20px;
        }
    }
    
    .col {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        max-width: 450px;
        @media (max-width: 520px) {
            margin-top: 10px;
        }
    }

    .label {
        font-size: 16px;
        font-weight: normal;
        color: white;
        font-family: 'OpenSans';
        margin-top: 10px;
        text-decoration: underline;
    }

    .row {
        display: flex;
        column-gap: 20px;
        align-items: center;
        margin-top: 20px;
        @media (max-width: 900px) {
            flex-wrap: wrap;
            row-gap: 10px;
        }
    }

    .btn_sm {
        max-width: 150px;
        @media (max-width: 520px) {
            height: 50px;
            font-size: 16px;
        }
    }

    .main_text {
        margin-top: 30px;
        color: white;
        font-size: 18px;
        font-family: 'OpenSans';
        font-weight: 400;
         @media (max-width: 520px) {
            font-size: 16px;
         }
    }

    .row2 {
        display: flex;
        column-gap: 10px;
        align-items: center;
        margin-top: 31px;
    }

    .row2 span {
        font-size: 18px;
        color: white;
        font-family: 'OpenSans';
        font-weight: 400;
        @media (max-width: 520px) {
            font-size: 14px;
        }
    }

    .link {
        text-decoration: underline;
        color: white;
    }

    .button {
        width: 445px;
        margin-top: 20px;
        @media (max-width: 520px) {
            max-width: 330px;
            height: 50px;
            align-self: center;
        }
    }

    .user_card {
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .error {
        font-size: 18px;
        color: #FF0004;
        font-family: 'OpenSans';
        font-weight: 400;
        margin-top: 20px;
        align-self: center;
        @media (max-width: 520px) {
            font-size: 14px;
        }
    }

    .password {
        margin-top: 20px;
    }
</style>