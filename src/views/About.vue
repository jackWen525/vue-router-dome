<template>
  <div class="about">
    <h1 @click="$store.commit('add')">This is an about page {{$store.state.num}}</h1>
    <button @click="$store.dispatch('increment')">异步加</button>
    <p>{{$store.getters.comUnm}}</p>
    <router-link to="/about/admin">admin</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    
  },
}
</script>
