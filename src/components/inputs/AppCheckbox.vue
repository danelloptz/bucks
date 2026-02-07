<template>
    <label class="checkbox-container">
        <input
            type="checkbox"
            :checked="modelValue"
            @change="$emit('update:modelValue', $event.target.checked)"
        />
        <span class="checkmark"></span>
        <span class="label-text">{{ label }}</span>
    </label>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        label: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
.checkbox-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-family: 'OpenSans';
    font-size: 18px;
    color: white;
    gap: 10px;
    position: relative;
}

/* скрываем стандартный input */
.checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* квадратный чекбокс */
.checkmark {
    width: 25px;
    height: 25px;
    background: none;
    border: 1px solid white;
    border-radius: 3px; /* квадрат с чуть скругленными углами */
    transition: all 0.2s ease;
    display: inline-block;
    position: relative;
}

/* когда отмечен */
.checkbox-container input:checked + .checkmark {
    background-color: #0059FF; /* цвет выделения, можешь поменять */
    border-color: #0059FF;
}

/* добавим галочку */
.checkbox-container input:checked + .checkmark::after {
    content: "";
    position: absolute;
    left: 7.7px;
    top: 3px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

/* текст */
.label-text {
    user-select: none;
}
</style>
