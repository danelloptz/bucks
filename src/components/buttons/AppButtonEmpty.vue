<template>
    <button class="btn" :type="type">
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: "button",
        },
    },
};
</script>

<style scoped>
    .btn {
        width: 100%;
        /* padding: 24px 18px; */
        height: 60px;
        border-radius: 10px;
        border: none;
        background: none;
        color: white;
        font-weight: 600;
        cursor: pointer;
        font-family: 'OpenSans';
        font-size: 18px;
        transition: .2s ease-in;
        border: 1px solid #FFFFFF80
    }

    .btn:hover {
        background: #ffffff2a;
    }
</style>
