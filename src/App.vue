<template>
  <h1>Papermap Tool</h1>

  <div class="formSection">
    <v-card class="formCard rounded-card" variant="tonal">
      <v-form>
        <v-row>
          <v-col cols="12" md="6">
            <!-- Map Name -->
            <v-text-field v-model="mapTitle" label="Map Name"></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <!-- Size -->
            <v-text-field v-model="size" label="Units"></v-text-field>
          </v-col>
        </v-row>

        <!-- Description -->
        <v-textarea rows="3" v-model="description" label="Description"></v-textarea>

        <!-- Gameplay -->
        <v-textarea rows="3" v-model="gameplay" label="Gameplay Hooks"></v-textarea>

        <!-- POI -->
        <v-text class="text-h5">Points of interest</v-text>
        <br>

        <!-- Create POI -->
        <v-dialog v-model="POI_dialog" width="auto">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props" prepend-icon="mdi-plus">
              Create POI
            </v-btn>
          </template>

          <v-card width="900">
            <v-form class="pa-8">
              <v-row>
                <v-col cols="6">

                  <!-- POI Name -->
                  <v-text-field v-model="POITitle" label="POI Name"></v-text-field>

                  <!-- Letter -->
                  <v-select item-title="state" item-value="abbr" v-model="letterSelected" chips label="Select" :items="['A', 'B', 'C', 'D', 'E', 'F']"></v-select>

                  <!-- Image upload -->
                  <v-file-input label="File input" variant="filled" prepend-icon="mdi-camera"></v-file-input>

                  <v-btn color="primary" @click="generateNewPOI" prepend-icon="mdi-plus">
                    Generate New POI
                  </v-btn>

                </v-col>
              </v-row>
            </v-form>
            <v-card-actions>
              <v-btn color="primary" block @click="POI_dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-form>
    </v-card>
  </div>

  <div class="contentSection" ref="printMe">
    <v-card width="100%" color="grey-darken-4" class="rounded-card elevation-0">
      <v-card-text>
        <v-row no-gutters>

          <v-col cols="12">
            <v-sheet class="pa-2 text-white" color="grey-darken-4">
              <!-- Map Name -->
              <p class="content_mapName" v-if="mapTitle == ''">Map Name</p>
              <p class="content_mapName" v-else>{{ mapTitle }}</p>
            </v-sheet>
          </v-col>

          <v-col cols="6">
            <v-sheet class="pa-2 text-white" color="grey-darken-4">
              <!-- Main Capsule -->
              <v-img class="content_mainCapsule" src="./assets/defaultimg.png" />

              <!-- Size -->
              <p class="content_subtitle" style="margin-top: 0.3vw;">Size</p>
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
            </v-sheet>
          </v-col>

          <v-col cols="6">
            <v-sheet class="text-white" color="grey-darken-4">
              <v-row no-gutters>
                <div id="divToAttach"></div>
              </v-row>
            </v-sheet>
          </v-col>

        </v-row>
      </v-card-text>
    </v-card>
  </div>


  <div>
    <v-btn class="printButton" @click="printElement" prepend-icon="mdi-download" color="primary">
      Print Div
    </v-btn>
  </div>

  <!-- <v-text class="text-overline">@Gabriel Bissonnette 2023</v-text> -->
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

      POI_dialog: false,
      POITitle: '',
      letterSelected: '',

      POI_A: '',
      POI_B: '',
      POI_C: '',
      POI_D: '',
      POI_E: '',
      POI_F: '',
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
    generateNewPOI() {
      // create a new div element
      const newDiv = document.createElement("div");

      // and give it some content
      const newContent = document.createTextNode("PERMANENT " + this.letterSelected);

      // add the text node to the newly created div
      newDiv.appendChild(newContent);

      // Add image
      const img = document.createElement("img");
      img.src = "./assets/defaultimg.png";
      img.style = "width: 5vw; display: block;";
      newDiv.appendChild(img);

      // add the newly created element and its content into the DOM
      var currentDiv = document.getElementById("divToAttach");
      currentDiv.parentNode.insertBefore(newDiv, currentDiv);
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
  margin-top: 20px;
  margin-left: 25%;
  margin-right: 25%;
}

.contentSection {
  text-align: left;
  margin-top: 20px;
  margin-left: 25%;
  margin-right: 25%;
}

.formCard {
  padding: 25px;
  padding-bottom: 5px;
}

.parentMainSection1 {
  /* whatever width you want */
  display: inline-block;
  position: relative;
}

.parentMainSection11:after {
  /* 16:9 ratio */
  display: block;
  content: '';
}

.mainSection {
  position: absolute;
  margin: 0;
  padding: 5px;
  /* padding-top: 0px; */
  text-align: left;
  letter-spacing: 1.5px;
}

.flexbox-centering1 {
  height: 100%;
  display: flex;
  /*justify-content: center;
  align-items: center;*/
}

.viewport-sizing1 {
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
  font-size: 1vw;
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


.item11 {
  grid-area: header;
  height: 2vw;
  width: 100%;
}

.item2 {
  grid-area: menu;
  height: 24vw;
  width: 24vw;
}

.item3 {
  grid-area: left;
  height: 24vw;
  width: 11vw;
}

.item4 {
  grid-area: right;
  height: 24vw;
  width: 11vw;
}

.grid-container {
  display: grid;
  grid-template-areas:
    'header header header header header header header header header header'
    'menu menu menu menu menu menu left left right right';
  gap: 0.9vw;
  /*background-color: #f3218e;*/
  padding: 0.5vw;
  height: 100%;
}

.grid-container>div {
  /*background-color: rgba(255, 255, 255, 0.8);*/
  padding: 0;
}


.poi_group {
  margin-bottom: 0.67vw;
}

.poi_text {
  font-size: 0.4vw;
}

.rounded-card {
  border-radius: 0px;
}
</style>
