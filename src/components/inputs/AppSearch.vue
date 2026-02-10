<template>
    <div class="search-input">
        <img
            class="search-icon"
            src="@/assets/images/search.png"
            alt="search"
        />

        <input
            type="text"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>

<script>
export default {
    name: 'AppSearchInput',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'Поиск'
        }
    },
    emits: ['update:modelValue']
    };
</script>

<style scoped>
    .search-input {
        position: relative;
        width: 100%;
        max-width: 400px;
    }

    .search-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        height: 18px;
        pointer-events: none;
        opacity: 0.7;
    }

    input {
        width: 100%;
        height: 42px;
        padding-left: 44px; /* место под иконку */
        padding-right: 14px;
        background: #171B30;
        border-radius: 50px;
        border: 1px solid #FFFFFF80;
        color: #FFFFFF80;
        font-size: 16px;
        font-family: 'OpenSans';
    }

    input::placeholder {
        color: #FFFFFF80;
    }

    input:focus {
        outline: none;
    }
</style>
