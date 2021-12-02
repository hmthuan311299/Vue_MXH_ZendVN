<template>
  <nav>
    <ul class="ass1-header__menu">
      <li>
        <a href="#">Danh mục</a>
        <div class="ass1-header__nav" style="display: none">
          <div class="container">
            <ul>
              <router-link
                tag="li"
                :to="{
                  name: 'home-page',
                  query: { text: format_url(item.text), tagIndex: item.id },
                }"
                v-for="item in categories"
                :key="item.id"
              >
                <a>{{ item.text }}</a>
              </router-link>
            </ul>
          </div>
          <div class="ass1-header__menu-transition"></div>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import {removeVietnameseFromString} from '../helpers/index'
export default {
  name: "app-navigation",
  computed: {
    categories() {
      return this.$store.state.modulePost.categories;
    },
  },
  methods:{
      format_url(data){
        return removeVietnameseFromString(data)
    }
  }
};
</script>

<style scoped>
    .ass1-header__nav > .container ul {
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
    }
    .ass1-header__nav > .container ul li {
    width: 25%;
    }
    .ass1-header__nav > .container ul li:first-child {
    margin-top: 8px;
    }

</style>