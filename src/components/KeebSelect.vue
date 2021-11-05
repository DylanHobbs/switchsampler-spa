<template>
  <section>
    <b-field label="Select a Tester">
      <b-select
        v-model="selected"
        @change.native="selectKeeb(selected)"
        placeholder="Select a keyboard"
        icon="keyboard-outline"
      >
        <optgroup label="/u/WillingAlbatross">
          <option
            v-for="(keeb) in keebs"
            :value="keeb.entries"
            :key="keeb.name"
            >{{ keeb.name }}</option
          >
        </optgroup>
      </b-select>
    </b-field>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      test: 'test'
    }
  },
  computed: {
    keebs() {
      return this.$store.state.keebs
    },
  },
  methods: {
    selectKeeb(entries) {
      this.$store.commit('setEntries', entries)
    },
  },
  created() {
    this.$nextTick(() => {})
  },
  watch: {
    // If no keebs are selected and the vuex store is updated, select the
    // first entry from the list as the default
    keebs() {
      if (!this.selected && this.$store.state.keebs) {
        let ent = this.$store.state.keebs[0]
        this.selected = ent.entries
        this.selectKeeb(ent.entries)
      }
    },
  },
}
</script>
