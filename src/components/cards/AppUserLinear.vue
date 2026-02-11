<template>
    <div class="component">
        <!-- Карточка -->
        <section 
            class="card"
            :style="{ marginLeft: depth * 40 + 'px' }"
        >
            <div class="toogle_wrapper" @click="toggle">
                <span class="toogle">
                    {{ isOpen ? '−' : '+' }}
                </span>
            </div>

            <img :src="user.avatar" class="avatar" />

            <div class="col">
                <span class="name">{{ user.name }}</span>
                <div class="row">
                    <div 
                        class="bage"
                        :style="{ background: bageColor }"
                    >
                        <img
                            v-if="user.tariff === 'Platinum'"
                            src="@/assets/images/diamond.png"
                            class="diamond"
                        />
                        <span
                            class="bage_name"
                            :style="{ color: user.tariff === 'Platinum' ? 'white' : '#282928' }"
                        >
                            {{ user.tariff }}
                        </span>
                    </div>
                    <span class="id">ID: {{ user.id }}</span>
                </div>
            </div>

            <div class="col m1">
                <span class="col_text">{{ user.level }}</span>
            </div>

            <div class="col m2">
                <span class="col_text">{{ user.first_line }}</span>
            </div>

            <div class="col m3">
                <span class="col_text">{{ user.team }}</span>
            </div>
        </section>

        <!-- ДЕТИ -->
        <div v-if="isOpen">

            <!-- loader -->
            <div 
                v-if="loading"
                :style="{ marginLeft: (depth + 1) * 40 + 'px' }"
            >
                Загрузка...
            </div>

            <!-- список -->
            <template v-else>
                <AppUserLinear
                    v-for="child in children"
                    :key="child.id"
                    :user="child"
                    :depth="depth + 1"
                />

                <!-- пагинация -->
                <AppPagination
                    v-if="totalPages > 1"
                    :currentPage="page"
                    :totalPages="totalPages"
                    @update:page="changePage"
                    :style="{ marginLeft: (depth + 1) * 40 + 'px' }"
                />


                
            </template>

        </div>
    </div>
</template>


<script>
    import AppPagination from '@/components/paginations/AppPagination.vue';
export default {
    name: 'AppUserLinear',
    components: { AppPagination },

    props: {
        user: {
            type: Object,
            required: true
        },
        depth: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            isOpen: false,
            children: [],
            loaded: false,
            loading: false,

            page: 1,
            perPage: 5,
            totalPages: 1
        }
    },

    computed: {
        visiblePages() {
            const pages = []
            const maxVisible = 3

            if (this.totalPages <= 5) {
                for (let i = 1; i <= this.totalPages; i++) {
                    pages.push(i)
                }
            } else {
                if (this.page <= maxVisible) {
                    pages.push(1, 2, 3, '...', this.totalPages)
                } 
                else if (this.page >= this.totalPages - 2) {
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
                        this.page,
                        this.page + 1,
                        '...',
                        this.totalPages
                    )
                }
            }

            return pages
        },
        bageColor() {
            switch (this.user.tariff) {
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

        async toggle() {
            this.isOpen = !this.isOpen

            if (this.isOpen && !this.loaded) {
                await this.loadChildren()
            }
        },

        async loadChildren() {
            try {
                this.loading = true

                // 🔥 Здесь будет реальный API:
                // const response = await fetch(`/api/users/${this.user.id}/referrals?page=${this.page}&limit=${this.perPage}`)
                // const result = await response.json()

                // MOCK
                const result = {
                    data: Array.from({ length: this.perPage }, (_, i) => ({
                        id: this.user.id * 100 + i + this.page,
                        avatar: this.user.avatar,
                        name: `Реферал ${i + 1} (стр. ${this.page})`,
                        tariff: ['Silver', 'Gold', 'Platinum'][i % 3],
                        level: this.depth + 1,
                        first_line: 10,
                        team: 100
                    })),
                    totalPages: 6
                }

                this.children = result.data
                this.totalPages = result.totalPages
                this.loaded = true

            } catch (e) {
                console.error(e)
            } finally {
                this.loading = false
            }
        },

        async changePage(newPage) {
            if (newPage < 1 || newPage > this.totalPages) return

            this.page = newPage
            await this.loadChildren()
        }
    }
}
</script>


<style scoped>
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

    .card {
        width: 100%;
        display: flex;
        align-items: center;
        background: #011851;
        border-radius: 15px;
        padding: 8px 10px;
        position: relative;
    }

    .card::before {
        content: '';
        position: absolute;
        left: -20px;
        top: 0;
        bottom: 0;
        width: 1px;
        background: #3b5b9a;
    }

    .toogle_wrapper {
        padding: 3px 5px;
        background: #0059FF;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .toogle {
        font-size: 11.92px;
        color: white;
        line-height: 1;
    }

    .avatar {
        width: 63.82px;
        height: 63.82px;
        border-radius: 50%;
        margin-left: 10px;
        object-fit: cover;
        object-position: center;
        margin-right: 8px;
    }

    .col {
        display: flex;
        flex-direction: column;
    }

    .name {
        font-size: 16.82px;
        color: white;
        font-family: 'OpenSans';
        font-weight: 600;
    }

    .row {
        display: flex;
        align-items: center;
        column-gap: 6px;
    }

    .id {
        font-size: 10.98px;
        color: white;
        font-family: 'OpenSans';
    }

    .row_icon {
        width: 11px;
        height: 11px;
    }

    .row_text {
        font-size: 10px;
        font-family: 'OpenSans';
        color: white;
    }

    .col_text {
        font-size: 34.84px;
        font-family: 'OpenSans';
        color: white;
    }

    .m1 {
        margin-left: 44px;
    }

    .m2 {
        margin-left: 54px;
    }

    .m3 {
        margin-left: 85px;
    }

    .component {
        margin-top: 10px;
    }

    .pagination {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 15px;
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

