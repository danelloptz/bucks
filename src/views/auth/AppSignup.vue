<template>
    <section class="container">
        <header class="header">
            <span class="logo">Лого</span>
            <AppLangDropdown />
        </header>

        <div class="main">
            <div class="content">
                <h2>Регистрация</h2>
                <AppInput 
                    :modelValue="email"
                    :type="'email'"
                    :label="'Почта'"
                    @update="email = $event"
                />
                <div class="col">
                    <AppInput 
                        :modelValue="password"
                        :type="'password'"
                        :label="'Пароль'"
                        @update="password = $event"
                    />
                    <span class="col_label">не менее 8 символов</span>
                </div>
                <div class="row">
                    <AppInput 
                        :modelValue="code"
                        :type="'text'"
                        :label="'Реферальный код'"
                        @update="code = $event"
                    />
                    <AppButton class="btn_sm" @click="getReferer">Проверить</AppButton>
                </div>
                <AppUserCard 
                    v-if="referrer" 
                    :user="referrer" 
                    class="user_card"
                />
                <span class="main_text">
                    Если реферальный код отсутствует, значит у вас нет реферера. <br>
                    При необходимости вставьте код в поле выше и нажмите «Проверить».
                </span>
                <div class="row2">
                    <AppCheckbox v-model="isCheked" />
                    <span>Мне исполнилось 18 лет и я принимаю <a class="link" href="#">пользовательское соглашение</a>.</span>
                </div>
                <span v-if="error" class="error">{{ error }}</span>
                <AppButton class="button" @click="signup">Зарегистрироваться</AppButton>
            </div>
            <img src="@/assets/images/wtf.png" class="wtf" />
        </div>
    </section>
</template>

<script>
    import AppLangDropdown from '@/components/dropdowns/AppLangDropdown.vue';
    import AppInput from '@/components/inputs/AppInput.vue';
    import AppButton from '@/components/buttons/AppButton.vue';
    import AppCheckbox from '@/components/inputs/AppCheckbox.vue';
    import AppUserCard from '@/components/cards/AppUserCard.vue';

    import { signUp } from '@/services/auth';
    import { getReferralInfo } from '@/services/users';

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
                error: null,
            }
        },
        mounted() {
            this.handleUrlParams();
        },
        async created() {
            if (localStorage.getItem('referer')) {
                this.code = localStorage.getItem('referer');
                await this.getReferer();
            }
        },
        methods: {
            handleUrlParams() {
                const params = new URLSearchParams(window.location.search);
                const ref = params.get("ref");
                if (ref) {
                    localStorage.setItem('referer', ref);
                    this.code = ref;
                }
            },
            async getReferer() {
                // this.referrer = {
                //     avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw65CdYNW5DUBZzRKFNIM2dXEr0JoihVpDEw&s',
                //     name: 'Ватлин Анатолий Петрович',
                //     tariff: 'Silver',
                //     id: 842052594
                // };
                
                const referer_reponse = await getReferralInfo(this.code);
                if (referer_reponse) {
                    this.referrer = referer_reponse;
                }
            },
            async signup() {
                if (this.email.length == 0) {
                    this.error = 'Введите почту!';
                    return;
                }
                if (this.password.length == 0) {
                    this.error = 'Введите пароль!';
                    return;
                }
                if (this.password.length < 8) {
                    this.error = 'Пароль должен не менее 8 символов.';
                    return;
                }
                if (!this.isCheked) {
                    this.error = 'Подтвердите, что вам больше 18 лет и вы ознакомились с пользовательским соглашением.';
                    return;
                }
                this.error = null;
                const signup_response = await signUp(this.email, this.password, this.code);
                if (signup_response.access_token) {
                    localStorage.setItem('token', signup_response.access_token);
                    localStorage.setItem('refresh_token', signup_response.refresh_token);
                    this.$router.push('/home');
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

    .col_label {
        align-self: flex-end;
        font-size: 16px;
        font-weight: 400;
        color: white;
        font-family: 'OpenSans';
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
        margin-bottom: 30px;
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
</style>