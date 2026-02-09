<template>
    <div
        class="lang"
        ref="lang"
        :class="{ lang_mini: mini }"
    >
        <div class="lang_wrapper">
            <img
                src="@/assets/images/globe.png"
                class="globe"
                :class="{ mini_globe: mini }"
                alt="Language"
                @click="toggle"
            />

            <span
                class="current-lang"
                @click="toggle"
                :class="{ mini_text: mini }"
            >
                {{ currentLang }}
            </span>
        </div>
        
        <img
            src="@/assets/images/dropdown.png"
            class="arrow"
            :class="{ open: isOpen, mini_arrow: mini }"
            @click="toggle"
        />

        <ul
            v-if="isOpen"
            class="dropdown"
        >
            <li
                v-for="lang in langs"
                :key="lang"
                @click="selectLang(lang)"
                class="dropdown_item"
                :class="{ mini_text: mini }"
            >
                {{ lang }}
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    props: {
        mini: Boolean
    },
    data() {
        return {
            langs: [
                'Русский',
                'Английский',
                'Китайский'
            ],
            currentLang: 'Русский',
            isOpen: false
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen
        },
        selectLang(lang) {
            this.currentLang = lang
            this.isOpen = false
        },
        handleClickOutside(event) {
            if (!this.$refs.lang.contains(event.target)) {
                this.isOpen = false
            }
        }
    }
}
</script>

<style scoped>
    span, li {
        font-family: 'Mont';
    }

    .lang {
        display: flex;
        align-items: center;
        gap: 10px;
        position: relative;
        color: #ffffff;
        cursor: pointer;
    }

    .lang_mini {
        width: 100%;
        background: #394175;
        padding: 10px;
        justify-content: space-between;
        border-radius: 10px;
    }

    .lang_wrapper {
        display: flex;
        column-gap: 10px;
        align-items: center;
    }

    .globe {
        width: 30px;
        height: 30px;
        opacity: .6;
        @media (max-width: 520px) {
            width: 19.41px;
            height: 19.41px;
        }
    }

    .mini_globe {
        width: 20px;
        height: 20px;
    }

    .arrow {
        transition: transform 0.3s ease;
        @media (max-width: 520px) {
            width: 15.04px;
            height: 8.25px;
        }
    }

    .mini_arrow {
        width: 15.5px;
        height: 8.5px;
    }

    /* класс для переворота */
    .arrow.open {
        transform: rotate(180deg);
    }


    .dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: #0a0b1e;
        border-radius: 6px;
        margin-top: 8px;
        padding: 6px 0;
        list-style: none;
        min-width: 140px;
    }

    .dropdown_item {
        padding: 8px 12px;
        font-size: 24px;
        @media (max-width: 520px) {
            font-size: 15.52px;
        }
    }

    .dropdown_item:hover {
        background: #1a1b3a;
    }

    .current-lang {
        font-size: 24px;
        @media (max-width: 520px) {
            font-size: 15.52px;
        }
    }

    .mini_text {
        font-size: 16px;
    }
</style>
