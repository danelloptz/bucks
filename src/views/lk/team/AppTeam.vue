<template>
    <section class="team">
        <div class="row">
            <AppCardSignup :count="34765" />
            <AppCardLinear :first_line="135" :total="15643" />
        </div>
        <AppCardMatrix :active_business="4" :unactive_business="5" :structure="21986" class="long_card" />
    </section>
</template>

<script>
    import AppCardSignup from '@/components/cards/AppCardSignup.vue';
    import AppCardLinear from '@/components/cards/AppCardLinear.vue';
    import AppCardMatrix from '@/components/cards/AppCardMatrix.vue';
    export default {
        components: { AppCardSignup, AppCardLinear, AppCardMatrix }
    };
</script>

<style scoped>
    .team {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .row {
        display: grid;
        grid-template-columns: 353px 1fr;
        column-gap: 30px;  
        margin-top: 33px; 
    }

    .long_card {
        margin-top: 30px;
    }
</style>