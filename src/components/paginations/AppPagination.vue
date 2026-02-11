<template>
    <div class="pagination" v-if="totalPages > 1">

        <!-- Левая стрелка -->
        <button
            class="nav_btn"
            @click="change(currentPage - 1)"
            :disabled="currentPage === 1"
        >
            ‹
        </button>

        <!-- Страницы -->
        <button
            v-for="p in visiblePages"
            :key="p + '_' + uid"
            class="page_btn"
            :class="{ active: p === currentPage, dots: p === '...' }"
            @click="p !== '...' && change(p)"
            :disabled="p === '...'"
        >
            {{ p }}
        </button>

        <!-- Правая стрелка -->
        <button
            class="nav_btn"
            @click="change(currentPage + 1)"
            :disabled="currentPage === totalPages"
        >
            ›
        </button>

    </div>
</template>

<script>
export default {
    name: 'AppPagination',

    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        }
    },

    emits: ['update:page'],

    computed: {
        uid() {
            return Math.random()
        },

        visiblePages() {
            const pages = []
            const maxVisible = 3

            if (this.totalPages <= 5) {
                for (let i = 1; i <= this.totalPages; i++) {
                    pages.push(i)
                }
            } else {
                if (this.currentPage <= maxVisible) {
                    pages.push(1, 2, 3, '...', this.totalPages)
                } 
                else if (this.currentPage >= this.totalPages - 2) {
                    pages.push(
                        1,
                        '...',
                        this.totalPages - 2,
                        this.totalPages - 1,
                        this.totalPages
                    )
                } 
                else {
                    pages.push(
                        1,
                        '...',
                        this.currentPage,
                        this.currentPage + 1,
                        '...',
                        this.totalPages
                    )
                }
            }

            return pages
        }
    },

    methods: {
        change(page) {
            if (page < 1 || page > this.totalPages) return
            this.$emit('update:page', page)
        }
    }
}
</script>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    gap: 10px;
}

.page_btn,
.nav_btn {
    background: transparent;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 8px 14px;
    border-radius: 12px;
    transition: 0.2s;
}

.page_btn:hover:not(.active):not(.dots),
.nav_btn:hover:not(:disabled) {
    background: rgba(255,255,255,0.1);
}

.page_btn.active {
    background: #1E5EFF;
    color: white;
    font-weight: bold;
}

.page_btn.dots {
    cursor: default;
    opacity: 0.6;
}

button:disabled {
    opacity: 0.4;
    cursor: default;
}
</style>
