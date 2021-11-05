<template>
  <b-table :data="dataEntries" class="has-text-weight-semibold has-text-grey">
      <!-- <b-table-column field="id" label="#" width="40" numeric>
          {{ props.row.id }}
      </b-table-column> -->
      <b-table-column field="display_name" v-slot="props" label="Display Name">
        {{ props.row.display_name }}
      </b-table-column>
      <b-table-column field="country" v-slot="props" label="Country">
        {{ props.row.country }}
      </b-table-column>
      <b-table-column field="date_recieved" v-slot="props" label="Date Recieved">
        {{ formatDate(props.row.date_recieved) }}
      </b-table-column>
      <b-table-column field="shipping_cost" v-slot="props" label="Shipping Cost">
        {{ props.row.currency + Number(props.row.shipping_cost).toFixed(2) }}
      </b-table-column>
      <b-table-column field="note" v-slot="props" label="Note">
        {{ props.row.note }}
      </b-table-column>
    <template #empty>
      <section class="section">
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon icon="emoticon-sad" size="is-large"> </b-icon>
          </p>
          <p>No love for this keeb</p>
        </div>
      </section>
    </template>
  </b-table>
</template>

<script>
import { DateTime } from 'luxon'
// import { getEmojiFlag } from 'countries-list'
export default {
  data() {
    return {}
  },
  computed: {
    dataEntries() {
      return this.$store.state.entries ?? [] 
    }
  },
  methods: {
    formatDate(date) {
      return DateTime.fromISO(date).toFormat('dd LLLL yyyy')  
    },
    // getFlag(country) {
    //   return getEmojiFlag(country)
    // }
  },
}
</script>
