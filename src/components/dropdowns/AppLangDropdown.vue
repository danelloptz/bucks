<template>
    <div
        class="lang"
        ref="lang"
    >
        <img
            src="@/assets/images/globe.png"
            class="globe"
            alt="Language"
            @click="toggle"
        />

        <span
            class="current-lang"
            @click="toggle"
        >
            {{ currentLang }}
        </span>

        <img
            src="@/assets/images/dropdown.png"
            class="arrow"
            :class="{ open: isOpen }"
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
            >
                {{ lang }}
            </li>
        </ul>
    </div>
</template>


<script>
export default {
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

    .globe {
        width: 30px;
        height: 30px;
        @media (max-width: 520px) {
            width: 19.41px;
            height: 19.41px;
        }
    }

    .arrow {
        transition: transform 0.3s ease;
        @media (max-width: 520px) {
            width: 15.04px;
            height: 8.25px;
        }
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

    .dropdown li {
        padding: 8px 12px;
        font-size: 24px;
        @media (max-width: 520px) {
            font-size: 15.52px;
        }
    }

    .dropdown li:hover {
        background: #1a1b3a;
    }

    .current-lang {
        font-size: 24px;
        @media (max-width: 520px) {
            font-size: 15.52px;
        }
    }
</style>
