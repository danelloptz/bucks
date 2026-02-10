<template>
    <section class="nav">
        <div 
            v-for="(item, index) in items"
            :key="index"
            class="item"
            @click="setItem(index, item)"
            :class="{ active: activeIndex == index}"
        >
            <img :src="item.icon" class="icon" />
            <span class="title">{{ item.label }}</span>
        </div>
    </section>
</template>

<script>
    import homeIcon from '@/assets/images/home.png'
    import caseIcon from '@/assets/images/case.png'
    import marketingIcon from '@/assets/images/marketing.png'
    import teamIcon from '@/assets/images/team.png'
    import userIcon from '@/assets/images/user.png'
    import walletIcon from '@/assets/images/wallet.png'
    export default {
        data() {
            return {
                activeIndex: 0,
                items: [
                    {
                        icon: homeIcon,
                        label: 'Главная'
                    },
                    {
                        icon: walletIcon,
                        label: 'Баланс'
                    },
                    {
                        icon: teamIcon,
                        label: 'Команда'
                    },
                    {
                        icon: userIcon,
                        label: 'Профиль'
                    },
                    {
                        icon: marketingIcon,
                        label: 'Рекламодателю'
                    },
                    {
                        icon: caseIcon,
                        label: 'Исполнителю'
                    },
                ]
            }
        },
        methods: {
            setItem(index, item) {
                this.activeIndex = index;
                this.$emit('set_item', {
                    index: index,
                    name: item.label
                });
            }
        }
    };
</script>

<style scoped>
    .nav {
        display: flex;
        flex-direction: column;
        row-gap: 18px;
    }

    .item {
        display: flex;
        align-items: center;
        column-gap: 10px;
        padding: 6px 10px;
        border-radius: 10px;
        cursor: pointer;
        transition: .1s ease-in;
    }

    .icon {
        width: 20px;
        height: 20px;
    }

    .title {
        font-size: 20px;
        font-family: 'OpenSans';
        font-weight: 400;
        color: white;
    }

    .active {
        background: #0059FF;
    }
</style>