<template>
  <section class="section">
    <div class="box">
      <b-collapse :open="true" aria-id="contentIdForA11y1">
        <h1
          class="title has-text-grey"
          slot="trigger"
          slot-scope="props"
          aria-controls="contentIdForA11y1"
        >
          Shared Switch Sampler Project
          <b-icon class="is-pulled-right" :icon="!props.open ? 'menu-up' : 'menu-down'"></b-icon>
        </h1>
        <br />
        <div class="is-hidden-tablet">
          <router-link to="Form">
            <div class="buttons">
              <b-button type="mb-5 is-primary" expanded>I got one!</b-button>
            </div>
            <!-- <div class="button mb-4 is-primary">I got one!</div> -->
          </router-link>
        </div>
        <p class="has-text-weight-semibold">
          This is the project page for a shareable key switch tester started by
          /u/WillingAlbatross on Reddit.
          <br />
          <br />
          <span class="has-text-weight-bold">
            The main idea of this project is to send some Switch Testers around
            the world to people who want them. After they're done, they'd then
            send it on to someone else and so on.
          </span>
          <br />The purpose of this website is to track the progress of the switch
          testers as they travel around the world and collect some basic
          information on their passage.
        </p>
        <br />
        <p class="has-text-weight-semibold">
          Finding out what key switch you want in your first tasty custom
          keyboard can be a daunting task for the uninitiated.
          <br />For people who want to keep costs low, spending the moolah on a big
          tester could be enough to sway them from the hobby.
        </p>
        <!-- <br>
            <p class="has-text-weight-semibold">
              So instead of winging it or dropping that fresh keeb idea you have in your head; 
              I hope this project can help some people get a taste of what switches they like 
              and then send the board onto someone new
        </p>-->
        <br />
        <p class="has-text-weight-bold">
          All information is optional and there are no rules as so how you
          choose to share the board if you receive one. Hell, keep it if you
          want, but I do hope that you do decide to continue to share the love.
          Check out
          <router-link to="about">the about page</router-link> for
          more info
        </p>
      </b-collapse>
      <br />
      <p class="has-text-weight-semibold">
        If you received one of the testers please click the button below to
        register your entry.
      </p>
      <router-link to="Form">
        <div class="button is-primary">I got one!</div>
      </router-link>
    </div>
    <hr />
    <div class="box">
      <h1 class="title">Entries</h1>
      <KeebSelect></KeebSelect>
      <br />
      <EntryTable></EntryTable>
    </div>
  </section>
</template>

<script>
import EntryTable from '../components/EntryTable'
import KeebSelect from '../components/KeebSelect'
// import { groupBy } from 'lodash'
import api from '../api'

export default {
  name: 'HomePage',
  // async asyncData({ $axios }) {
  //   const { data } = await $axios.$get(`/api/api/samplers`)
  //   let keebs = groupBy(data, function (entry) {
  //     return entry.name
  //   })
  //   return { keebs: keebs }
  // },
  components: {
    EntryTable,
    KeebSelect,
  },
  data() {
    return {
      keebs: []
    }
  },
  mounted() {
    api.get('/keyboards').then((data) => {
      // this.keebs = groupBy(data.data, function (entry) {
      //   return entry.name
      // })
      this.keebs = data.data
      this.$store.commit('setKeebs', data.data)
    })
      .catch(err => {
        console.log(err)
      })
  },
}
</script>
