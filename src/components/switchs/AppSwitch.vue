<template>
    <div class="switch">
        <span
            v-for="(item, index) in items"
            :key="index"
            :class="{ active: modelValue === index }"
            @click="select(index)"
        >
            {{ item }}
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            items: {
                type: Array,
                required: true
            },
            modelValue: {
                type: Number,
                required: true
            }
        },
        emits: ['update:modelValue'],
        methods: {
            select(index) {
                this.$emit('update:modelValue', index);
            },
        }
    };
</script>

<style scoped>
    .switch {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        column-gap: 30px;
    }

    .switch span {
        width: 100%;
        height: 50px;
        color: white;
        font-size: 20px;
        font-family: 'OpenSans';
        cursor: pointer;
        text-align: center;
        align-content: center;
        transition: .1s ease-in;
        border-bottom: 1px solid white;
        opacity: .5;
        border-radius: 10px;
    }

    .active {
        background: #0059FF;
        border: none !important;
        opacity: 1 !important;
    }
</style>