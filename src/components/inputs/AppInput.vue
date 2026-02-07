<template>
    <input
        class="input"
        :type="type"
        :value="modelValue"
        :placeholder="label"
        @input="$emit('update', $event.target.value)"
    />
</template>


<script>
    export default {
        props: {
            modelValue: String,
            label: String,
            type: {
                type: String,
                default: "text"
            }
        },
    };
</script>

<style scoped>
    /* input */
    .input {
        width: 100%;
        max-width: 450px;
        height: 60px;
        padding-left: 20px;
        border-radius: 14px;
        border: 1px solid #14152E;
        background: #14152E;
        color: white;
        font-size: 15px;
        outline: none;
        font-size: 20px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.5);
        font-family: 'OpenSans';
        @media (max-width: 520px) {
            max-width: auto;
            height: 50px;   
            font-size: 16px;
        }
    }
</style>
