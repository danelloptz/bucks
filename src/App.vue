<template>
  <div id="app">
    <router-view></router-view> 
  </div>
</template>

<style>
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  #app {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: start;
    background: #030415;
    overflow-y: scroll;
    scrollbar-width: none;
    @media (max-width: 650px) {
      padding: 7px 0px;
    }
  }
  #app::-webkit-scrollbar {
        width: 0;  
        height: 0;
    }

  #app::-webkit-scrollbar-thumb {
        background: transparent;
    }
</style>