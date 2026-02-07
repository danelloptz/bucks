<template>
    <section class="container">
        <header class="header">
            <span class="logo">Лого</span>
            <div class="lang">
                <img src="@/assets/images/globe.png" class="globe" />
                <span><!-- Тут текущий выбранный язык --></span>
                <!-- тут стрелка на которую если нажать, то появится выпадающий список
                    вынести отдельной компонентой выпадабший список  
                -->
            </div>
        </header>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                langs: ['Русский', 'Английский', 'Китайский']
            }
        }
    }
</script>

<style scoped>
</style>