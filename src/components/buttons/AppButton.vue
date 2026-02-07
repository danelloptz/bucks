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
        background: #0059FF;
        color: white;
        font-weight: 600;
        cursor: pointer;
        font-family: 'OpenSans';
        font-size: 18px;
        transition: .2s ease-in;
    }

    .btn:hover {
        background: #1667ff;
    }
</style>
