<template>
  <h1>Papermap Tool</h1>

  <div class="formSection">

    <!-- Map Name -->
    <h4 style="margin-bottom: 10px;">Map Name</h4>
    <input v-model="mapTitle" placeholder="Map Name" />

    <!-- Size -->
    <h4 style="margin-bottom: 10px;">Size</h4>
    <input v-model="size" placeholder="5k units x 5k units" />

    <!-- Description -->
    <h4 style="margin-bottom: 10px;">Description</h4>
    <textarea style="width: 400px; height: 100px;" v-model="description"
      placeholder="Strike and capture a key Soviet winter patrol installation in the Ural Mountains"></textarea>

    <!-- Gameplay -->
    <h4 style="margin-bottom: 10px;">Gameplay Hooks</h4>
    <textarea style="width: 400px; height: 100px; white-space: pre-line;" v-model="gameplay" placeholder="New snow mobile vehicle
            Good use of ziplines
            Ski slopes offers fast routes
            Woods great for flanking"></textarea>
  </div>






  <div class="parentMainSection" ref="printMe">
    <div class="mainSection">

      <div class="grid-container">

        <div class="item1">
          <!-- Map Name -->
          <p class="content_mapName" v-if="mapTitle == ''">Map Name</p>
          <p class="content_mapName" v-else>{{ mapTitle }}</p>
        </div>

        <div class="item2">
          <!-- Main Capsule -->
          <img class="content_mainCapsule" src="./assets/defaultimg.png" />

          <!-- Size -->
          <p class="content_subtitle">Size</p>
          <p class="content_size" v-if="size == ''">0 units x 0 units</p>
          <p class="content_size" v-else>{{ size }}</p>

          <!-- Description -->
          <p class="content_subtitle" style="margin-top: 0.5vw;">Description</p>
          <div class="content_container">
            <p class="content_size" v-if="description == ''" style="white-space: pre-line">This is a description</p>
            <p class="content_size" v-else style="white-space: pre-line">{{ description }}</p>
          </div>

          <!-- Gameplay Hooks -->
          <p class="content_subtitle" style="margin-top: 0.5vw;">Gameplay Hooks</p>
          <div style="height: 2.5vw;">
            <p class="content_size" v-if="gameplay == ''" style="white-space: pre-line">This is a hook</p>
            <p class="content_size" v-else style="white-space: pre-line">{{ gameplay }}</p>
          </div>
        </div>

        <div class="item3">Main</div>
        <div class="item4">Right</div>
      </div>
    </div>
  </div>

  <div>
    <button class="printButton" @click="printElement">Print Div</button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas';

export default {
  name: 'App',
  data() {
    return {
      mapTitle: '',
      size: '',
      description: '',
      gameplay: '',
      output: null,
    }
  },
  methods: {
    printElement() {
      const el = this.$refs.printMe;
      // add option type to get the image version
      // if not provided the promise will return 
      // the canvas.

      //this.output = this.$html2canvas(el, options);

      html2canvas(el, { scale: 2, }).then(function (canvas) {
        canvas.style.cssText = 'width:50%; margin-top:50px;text-align:center;';
        document.body.appendChild(canvas);
      });
    },
  }
}
</script>

<style>
body {
  background-color: #151515;
}

#app {
  font-family: Montserrat, Montserrat, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}

.formSection {
  text-align: left;
  margin-top: 50px;
  margin-left: 25%;
}

.parentMainSection {
  margin-top: 100px;
  width: 50%;
  /* whatever width you want */
  display: inline-block;
  position: relative;
}

.parentMainSection:after {
  padding-top: 56.25%;
  /* 16:9 ratio */
  display: block;
  content: '';
}

.mainSection {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  /* fill parent */
  background-color: deepskyblue;
  /* let's see it! */
  color: white;
  /* padding: 25px;
  padding-top: 0px; */
  text-align: left;
  letter-spacing: 1.5px;
}

.flexbox-centering {
  height: 100%;
  display: flex;
  /*justify-content: center;
  align-items: center;*/
}

.viewport-sizing {
  font-size: 1vw;
}

.printButton {
  margin: 25px;
}

.content_mainCapsule {
  width: 25vw;
}

.content_mapName {
  margin: 0;
}

.content_size {
  margin-top: 0px;
  margin-bottom: 0vw;
  font-size: 0.5vw;
}

.content_subtitle {
  font-size: 0.8vw;
  margin: 0vw;
}

.content_container {
  height: 2vw;
}


.item1 {
  grid-area: header;
  height: 2vw;
  width: 100%;
}

.item2 {
  grid-area: menu;
  height: 23vw;
  width: 27vw;
}

.item3 {
  grid-area: main;
  height: 23vw;
  width: 10vw;
}

.item4 {
  grid-area: right;
  height: 23vw;
  width: 10vw;
}

.grid-container {
  display: grid;
  grid-template-areas:
    'header header header header header header header header header header'
    'menu menu menu menu menu menu main main right right';
  gap: 0.5vw;
  background-color: #f3218e;
  padding: 0.5vw;
  height: 100%;
}

.grid-container>div {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.5vw 0;
}</style>
