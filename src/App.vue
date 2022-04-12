<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <div class="container" style="width: 300px; margin: auto">
      <auto-complete id="autocomp" data=""></auto-complete>
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },

  created() {
      this.fetchList();
    },

    methods: {
      fetchList() {
        fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
              .then(response => response.json())
              .then(json => {
                  console.log(json);

                  var jsonRes = json.results;

                  var array = [];

                  for (var i = 0; i < jsonRes.length; i++) {
                      var obj = jsonRes[i];

                      array.push(obj.name);
                  }

                  var listOfElems = document.getElementById("autocomp");
                  console.log(array);
                  
                  listOfElems.setAttribute("data", array);
              }).catch(function(error) {
                  console.log(error);
              });
      }
    }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
