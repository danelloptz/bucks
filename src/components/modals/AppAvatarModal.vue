<template>
    <section class="modal_wrapper">
        <div class="modal">
            <img src="@/assets/images/close.png" class="close" @click="$emit('close')" />
            <div class="row">
                <img :src="avatar" class="avatar" />
                <div class="col">
                    <h2 class="name">{{ name }}</h2>
                    <div class="bage" :style="{
                            background: bageColor
                        }">
                        <img v-if="tariff == 'Platinum'" src="@/assets/images/diamond.png" class="diamond" />
                        <span class="bage_name" :style="{ color: tariff == 'Platinum' ? 'white' : '#282928' }">{{ tariff }}</span>
                    </div>
                </div>
            </div>
            <div class="sm_row">
                <span class="id">ID: {{ id }}</span>

                <img
                    v-if="copied !== 'id'"
                    src="@/assets/images/copy.png"
                    class="copy"
                    @click="copyToClipboard(id, 'id')"
                />

                <img
                    v-else
                    src="@/assets/images/check.png"
                    class="copy success"
                />
            </div>

            <div class="row2">
                <div class="sm_row">
                    <span class="ref_text">
                        Реферальная ссылка:<br>
                        {{ `${baseUrl}?=${id}` }}
                    </span>

                    <img
                        v-if="copied !== 'ref'"
                        src="@/assets/images/copy.png"
                        class="copy"
                        @click="copyToClipboard(`${baseUrl}?=${id}`, 'ref')"
                    />

                    <img
                        v-else
                        src="@/assets/images/check.png"
                        class="copy success"
                    />
                </div>

                <AppButton class="btn">Выйти</AppButton>
            </div>

        </div>
    </section>
</template> 

<script>
    import AppButton from '@/components/buttons/AppButton.vue';

    export default {
        props: {
            avatar: String,
            name: String,
            tariff: String,
            id: String
        },
        components: { AppButton },
        data() {
            return {
                baseUrl: null,
                copied: null
            };
        },
        computed: {
            bageColor() {
                switch (this.tariff) {
                    case 'Platinum':
                        return 'linear-gradient(to right, #7D1F8C, #AF3BC2)';
                    case 'Gold':
                        return '#E8CE0F';
                    case 'Silver':
                        return '#EEEAEA';
                    default:
                        return 'white';
                }
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
        },
        created() {
            this.baseUrl = import.meta.env.VITE_API_BASE_URL;
        }
    };

</script>

<style scoped>
    .bage_name {
        font-size: 10.98px;
        font-weight: 700;
        font-family: 'OpenSans';
    }

    .modal_wrapper {
        position: absolute;
        top: 56px;
        right: 140px;
        width: 438px;
        z-index: 999;
    }

    .modal {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 20px 23px 30px 23px;
        background: linear-gradient(136.36deg, #000F75 0%, #030923 101.1%);
        border-radius: 10px;
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 15px;
        height: 15px;
        cursor: pointer;
    }

    .row {
        display: flex;
        align-items: center;
        column-gap: 32px;
    }

    .avatar {
        width: 84px;
        height: 84px;
        border-radius: 50%;
    }

    .col {
        display: flex;
        flex-direction: column;
        row-gap: 9px;
    }

    .name {
        font-size: 20px;
        font-family: 'OpenSans';
        color: white;
        font-weight: 700;
    }

    .sm_row {
        display: flex;
        column-gap: 11px;
        align-items: center;
        margin-top: 15px;
    }

    .id, .ref_text {
        font-size: 18px;
        font-family: 'OpenSans';
        color: white;
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


    .row2 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: end;
    }

    .btn {
        width: 110px;
        height: 40px;
        font-size: 16px;
    }

    .bage {
        padding: 1px 6px;
        border-radius: 9px;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 2px;
        width: fit-content;
    }

    .diamond {
        width: 10px;
        height: 10px;
    }

    .bage_name {
        font-size: 10.98px;
        font-weight: 700;
        font-family: 'OpenSans';
    }
</style>
