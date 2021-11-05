<template>
  <section class="section">
    <div class="columns">
      <div class="column">
        <Card title="eMail" icon="email">
          <a :href="ad()">Send me a lovely eMail</a>
        </Card>
      </div>

      <div class="column">
        <Card title="Discord" icon="discord">
          <b class="has-text-grey">WillingAlbatross#6681</b> on Discord
        </Card>
      </div>

      <div class="column">
        <Card title="Reddit" icon="reddit">
          <a
            target="_blank"
            href="https://www.reddit.com/message/compose/?to=WillingAlbatross"
          >/u/WillingAlbatross</a>
          on Reddit
        </Card>
      </div>
    </div>
  </section>
</template>
<script>
import { Base64 } from 'js-base64';
import Card from '../components/Card'
export default {
  components: {
    Card
  },
  data() {
    return {
      d: 'shared',
      j: 'switch',
      e: 'sampler',
      m: 'QGdtYWlsLmNvbQ=='
    }
  },
  methods: {
    ad() {
      return 'mailto:' + this.d + '.' + this.j + '.' + this.e + Base64.decode(this.m);
    }
  }
}
</script>

