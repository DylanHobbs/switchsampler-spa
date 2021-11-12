<template>
  <div>
    <b-navbar type="is-primary">
        <template slot="brand">
            <b-navbar-item class="is-hidden-tablet" tag="a" href="/">
                <img src="./assets/logo_v2_text.png" alt="Logo" width="300" />
            </b-navbar-item>
            <b-navbar-item class="is-hidden-mobile" tag="a" href="/">
                <img src="./assets/logo_v2_text.png" alt="Logo" height="100" />
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item v-for="(item, key) of items" :key="key" tag="router-link" exact-active-class="is-active" :to="item.to">
                <span style="margin-right:8px"><b-icon :icon="item.icon"/></span>{{ item.title }}
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                   <router-link to="Form">
                    <div class="button is-primary is-primary is-inverted has-text-weight-bold">
                      I got one!
                    </div>
                  </router-link>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>

    <section class="main-content columns">
      <div class="container column is-10">
        <router-view />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'keyboard',
          to: '/',
        },
        {
          title: 'About',
          icon: 'information',
          to: 'About',
        },
        {
          title: 'Contact',
          icon: 'account-box',
          to: 'Contact',
        },
      ],
    }
  },
}
</script>
<style lang="scss">
 .navbar-item {
   outline-width: 0;
 }
</style>
