<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'App',

};
</script>

<style>
*::-webkit-scrollbar {
  width: 6px;
  height: 8px;
}

*::-webkit-scrollbar-thumb {
  background-color: #6e6e6e;
  border-radius: 6px;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #ababab;
}

*::-webkit-scrollbar-track {
  background: rgba(220, 220, 220, 0);
}

</style>