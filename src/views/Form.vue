<template>
  <section class="section">
    <div class="box">
      <h2 class="title is-4 has-text-grey">So you got one of these boards...</h2>
      <p class="has-text-weight-semibold">
        Please enter the code you received with the board below. The sender
        should have made you aware of this code or it should be included
        somewhere in the package.
      </p>
      <p class="has-text-weight-semibold">
        If you didn't receive a code please
        <router-link to="Contact">contact me</router-link> and we'll get
        that sorted out
      </p>
      <div class="has-text-centered">
        <hr />
        <div id="code-wrapper">
          <CodeInput
            ref="otpInput"
            :input-classes="classNames"
            separator="-"
            :num-inputs="6"
            :should-auto-focus="true"
            :is-input-num="false"
            @on-change="handleOnChange"
            @on-complete="handleOnComplete"
          />
        </div>
      </div>
    </div>

    <div class="box" v-if="hasError">
      <b-message type="is-danger" aria-close-label="Close message">
        {{
          errorMessage
        }}
      </b-message>
    </div>

    <div v-if="show_form">
      <div class="box">
        <p class="has-text-weight-semibold has-text-centered">
          All information submitted here will be displayed publicly, feel free
          to make anything up that you don't want public, all fields are required but
          nonsense is accepted too
        </p>
        <hr />

        <div class="columns">
          <div class="column">
            <b-field
              label="Display Name"
              :type="display_name.error ? 'is-danger' : ''"
              :message="display_name.error ? 'This field is invalid' : ''"
            >
              <b-input v-model="display_name.value" placeholder="Your name here"></b-input>
            </b-field>
            <b-field
              label="Date Received"
              :type="date_recieved.error ? 'is-danger' : ''"
              :message="date_recieved.error ? 'This field is invalid' : ''"
            >
              <b-datepicker
                :date-formatter="dateformatter"
                v-model="date_recieved.value"
                placeholder="Click to select..."
                icon="calendar-today"
                trap-focus
              ></b-datepicker>
            </b-field>
          </div>
          <div class="column">
            <b-field
              label="Country"
              :type="country.error ? 'is-danger' : ''"
              :message="country.error ? 'This field is invalid' : ''"
            >
              <b-select expanded v-model="country.value" placeholder="Select a subject">
                <option v-for="(country, code) in countries" :value="code" :key="code">{{ country }}</option>
              </b-select>
            </b-field>
            <b-field
              label="Shipping Cost"
              expanded
              :type="shipping_cost.error || currency.error ? 'is-danger' : ''"
              :message="
            shipping_cost.error || currency.error
              ? 'This field is invalid'
              : ''"
            >
              <b-field>
                <b-select v-model="currency.value" placeholder="Currency">
                  <option selected>€</option>
                  <option>$</option>
                  <option>A$</option>
                  <option>NZ$</option>
                  <option>zł</option>
                  <option>£</option>
                  <option>JP¥</option>
                  <option>CN¥</option>
                </b-select>
                <b-numberinput
                  v-model="shipping_cost.value"
                  step="0.1"
                  min="0"
                  expanded
                  controls-position="compact"
                ></b-numberinput>
              </b-field>
            </b-field>
          </div>
        </div>
        <b-field
          label="Note"
          :type="note.error ? 'is-danger' : ''"
          :message="note.error ? 'This field is invalid' : ''"
        >
          <b-input maxlength="150" v-model="note.value" type="textarea"></b-input>
        </b-field>
        <div class="button is-primary" @click="submit">Submit</div>
      </div>
    </div>

    <!-- Display form based on result of code -->
    <!-- This won't prevent people from seeing the form, but we'll send along
      the code with the form too and will reject forms that don't match.
      We'll need to store the code outside of the 2 way binding to prevent people who
    have entered it correctly from change it-->
  </section>
</template>
<script>
import { DateTime } from 'luxon'
import counties from '../components/counties.json'
import CodeInput from '../components/CodeEntry/CodeInput.vue'
import api from '../api.js'
export default {
  components: {
    CodeInput,
  },
  data() {
    return {
      // Loading
      loading: false,
      show_form: false,

      // Form
      display_name: { value: '', error: false },
      country: { value: '', error: false },
      date_recieved: { value: new Date(), error: false },
      shipping_cost: { value: 0, error: false },
      currency: { value: '€', error: false },
      note: { value: '', error: false },

      code: null,
      countries: counties,

      // Error Handling
      hasError: false,
      errorMessage: '',
    }
  },
  methods: {
    handleOnComplete(value) {
      api
        .post('/check', { code: value })
        .then((res) => {
          if (res.status === 200) {
            this.hasError = false
            this.errorMessage = ''

            this.code = value
            this.show_form = true
          }
        })
        .catch((err) => {
          // Set loading false and show error
          this.code = value
          this.show_form = false

          this.errorMessage = err.response.data.message ?? err.response.data
          this.hasError = true
        })
    },
    handleOnChange() {
      // console.log('OTP changed: ', value);
    },
    handleClearInput() {
      this.$refs.otpInput.clearInput()
    },
    submit() {
      this.resetErrorStatus()

      api
        .post('/create', {
          display_name: this.display_name.value,
          country: this.country.value,
          date_recieved: DateTime.fromJSDate(this.date_recieved.value).toFormat(
            'yyyy-MM-dd'
          ),
          shipping_cost: this.shipping_cost.value,
          currency: this.currency.value,
          note: this.note.value,
          code: this.code,
        })
        .then(() => {
          this.resetForm()
          this.$buefy.toast.open({
            message: 'Entry submitted successfully!',
            type: 'is-success',
            duration: 5000,
            position: 'is-bottom',
          })
          this.$router.push('/')
        })
        .catch((err) => {
          console.log(err.response.data.errors)
          if (err.response.data.errors && Object.values(err.response.data.errors).length > 0) {
            for (const key in err.response.data.errors) {
              this[key].error = true
            }
          }
          this.errorMessage = 'Form is invalid, please recheck the fields'
          this.hasError = true
        })
    },
    dateformatter(date) {
      return DateTime.fromJSDate(date).toFormat('dd LLLL yyyy')
    },
    resetErrorStatus() {
      this.hasError = false
      this.errorMessage = ''
      this.display_name.error = false
      this.country.error = false
      this.date_recieved.error = false
      this.shipping_cost.error = false
      this.note.error = false
    },
    resetForm() {
      this.display_name = { value: '', error: false }
      this.country = { value: '', error: false }
      this.date_recieved = { value: new Date(), error: false }
      this.shipping_cost = { value: 0, error: false }
      this.currency = { value: '€', error: false }
      this.note = { value: '', error: false }
    },
  },
  computed: {
    classNames: function () {
      return this.hasError && !this.show_form ? 'otp-input error' : 'otp-input'
    },
  },
}
</script>

<style lang="scss">
#code-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
}
.otp-input {
  outline-width: 0;
  width: 70px;
  height: 70px;
  padding: 7px;
  margin: 0 10px;
  font-size: 30px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 10px;
  border: 3px solid rgba(0, 0, 0, 0.7);
  text-align: center;

  &.error {
    border: 1px solid red !important;
  }
}

@media (max-width: 540px) {
  body {
    height: 100%;
    margin-bottom: 0;
  }
  .otp-input {
    width: 40px;
    height: 55px;
    margin: 0 4px;
  }
}

@media (max-width: 360px) {
  body {
    height: 100%;
    margin-bottom: 0;
  }
  .otp-input {
    font-size: 25px;
    width: 35px;
    height: 50px;
    margin: 0 3px;
  }
}
</style>
