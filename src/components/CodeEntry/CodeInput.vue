<template>
    <div style="display: flex">
        <SingleCodeInput
            v-for="(item, i) in numInputs"
            :key="i"
            :focus="activeInput === i"
            :value="otp[i]"
            :separator="separator"
            :input-classes="inputClasses"
            :is-last-child="i === numInputs - 1"
            :should-auto-focus="shouldAutoFocus"
            :is-input-num="isInputNum"
            @on-change="handleOnChange"
            @on-keydown="handleOnKeyDown"
            @on-paste="handleOnPaste"
            @on-focus="handleOnFocus(i)"
            @on-blur="handleOnBlur"
        />
    </div>
</template>

<script>
    import SingleCodeInput from './SingleCodeInput.vue';
    // keyCode constants
    const BACKSPACE = 8;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;
    const DELETE = 46;
    export default {
        name: 'CodeInput',
        components: {
            SingleCodeInput,
        },
        props: {
            numInputs: {
                default: 4,
            },
            separator: {
                type: String,
                default: '**',
            },
            inputClasses: {
                type: String,
            },
            isInputNum: {
                type: Boolean,
            },
            shouldAutoFocus: {
                type: Boolean,
                default: false,
            },
            initialValue: {
                type: String,
                default: null,
            },
        },
        data() {
            return {
                activeInput: 0,
                otp: [],
                oldOtp: [],
            };
        },
        mounted() {
            if(this.initialValue && this.initialValue.length === this.numInputs) {
                // Valid pre-value
                this.otp = this.initialValue.split('');
            }
        },
        methods: {
            handleOnFocus(index) {
                this.activeInput = index;
            },
            handleOnBlur() {
                this.activeInput = -1;
            },
            // Helper to return OTP from input
            checkFilledAllInputs() {
                if (this.otp.join('').length === this.numInputs) {
                    return this.$emit('on-complete', this.otp.join(''));
                }
                return 'Wait until the user enters the required number of characters';
            },
            // Focus on input by index
            focusInput(input) {
                this.activeInput = Math.max(Math.min(this.numInputs - 1, input), 0);
            },
            // Focus on next input
            focusNextInput() {
                this.focusInput(this.activeInput + 1);
            },
            // Focus on previous input
            focusPrevInput() {
                this.focusInput(this.activeInput - 1);
            },
            // Change OTP value at focused input
            changeCodeAtFocus(value) {
                this.oldOtp = Object.assign([], this.otp);
                this.$set(this.otp, this.activeInput, value);
                if (this.oldOtp.join('') !== this.otp.join('')) {
                    this.$emit('on-change', this.otp.join(''));
                    this.checkFilledAllInputs();
                }
            },
            // Handle pasted OTP
            handleOnPaste(event) {
                event.preventDefault();
                const pastedData = event.clipboardData
                    .getData('text/plain')
                    .slice(0, this.numInputs - this.activeInput)
                    .split('');
                if (this.isInputNum && !pastedData.join('').match(/^\d+$/)) {
                    return 'Invalid pasted data';
                }
                // Paste data from focused input onwards
                const currentCharsInOtp = this.otp.slice(0, this.activeInput);
                const combinedWithPastedData = currentCharsInOtp.concat(pastedData);
                this.$set(this, 'otp', combinedWithPastedData.slice(0, this.numInputs));
                this.focusInput(combinedWithPastedData.slice(0, this.numInputs).length);
                return this.checkFilledAllInputs();
            },
            handleOnChange(value) {
                if(value || value !== ''){
                    this.changeCodeAtFocus(value);
                    this.focusNextInput();
                }
            },
            clearInput() {
                if(this.otp.length > 0) {
                    this.$emit('on-change', '');
                }
                this.otp = [];
                this.activeInput = 0;
            },
            // Handle cases of backspace, delete, left arrow, right arrow
            handleOnKeyDown(event) {
                switch (event.keyCode) {
                    case BACKSPACE:
                        event.preventDefault();
                        this.changeCodeAtFocus('');
                        this.focusPrevInput();
                        break;
                    case DELETE:
                        event.preventDefault();
                        this.changeCodeAtFocus('');
                        break;
                    case LEFT_ARROW:
                        event.preventDefault();
                        this.focusPrevInput();
                        break;
                    case RIGHT_ARROW:
                        event.preventDefault();
                        this.focusNextInput();
                        break;
                    default:
                        break;
                }
            },
        },
    };
</script>
