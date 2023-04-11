<template>
  <v-img class="battlemap_logo" src="./assets/battlemapLogo_large.png" />

  <v-card class="rounded-card elevation-0 pa-0" color="#151515" style="color: white;">
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center" style="margin-bottom: 1rem;">
      <v-tab :value="1">Tool</v-tab>
      <v-tab :value="2">Documentation</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">

        <v-row no-gutters class="text-left">
          <v-col cols="12" lg="6" md="4">
            <v-responsive :aspect-ratio="16 / 9" class="pa-4 elevation-0" content-class="bg-primary">

              <!-- Export -->
              <div ref="printMe">
                <v-card width=" 100%" color="grey-darken-4" class="squared-card elevation-0">
                  <v-card-text>
                    <v-row no-gutters>


                      <v-col cols="12">
                        <v-sheet class="pa-2 text-white" color="grey-darken-4">
                          <!-- Map Name -->
                          <p class="content_mapName font-weight-medium" v-if="mapTitle == ''">Map Name</p>
                          <p class="content_mapName" v-else>{{ mapTitle }}</p>
                        </v-sheet>
                      </v-col>

                      <v-col cols="6">
                        <v-sheet class="pa-2 text-white" color="grey-darken-4">
                          <!-- Main Capsule -->
                          <v-img class="content_mainCapsule" src="" id="mainCapsule"/>

                          <!-- Size -->
                          <p class="content_subtitle font-weight-medium" style="margin-top: 0.8rem;">Size</p>
                          <p class="content_size" v-if="size == ''">0 units x 0 units</p>
                          <p class="content_size" v-else>{{ size }}</p>

                          <!-- Description -->
                          <p class="content_subtitle font-weight-medium" style="margin-top: 2rem;">Description</p>
                          <div class="content_container">
                            <p class="content_size" v-if="description == ''" style="white-space: pre-line">This is a
                              description
                            </p>
                            <p class="content_size" v-else style="white-space: pre-line">{{ description }}</p>
                          </div>

                          <!-- Gameplay Hooks -->
                          <p class="content_subtitle font-weight-medium" style="margin-top: 2rem;">Gameplay Hooks</p>
                          <div style="height: 3.55vw;">
                            <p class="content_size" v-if="gameplay == ''" style="white-space: pre-line">This is a hook</p>
                            <p class="content_size" v-else style="white-space: pre-line">{{ gameplay }}</p>
                          </div>
                        </v-sheet>
                      </v-col>

                      <v-col cols="6">
                        <v-sheet class="text-white ml-2" color="grey-darken-4">
                          <v-row no-gutters>
                            <div id="divToAttach"></div>

                          </v-row>
                        </v-sheet>
                      </v-col>

                      <div class="" id="lettersToAttach">

                      </div>

                    </v-row>
                  </v-card-text>
                </v-card>
              </div>

            </v-responsive>
          </v-col>

          <v-col cols="12" lg="6" md="4">
            <v-responsive :aspect-ratio="16 / 9" class="pa-4 elevation-0">

              <!-- Form -->
              <div class="">
                <div class="form_Title">Map Details</div>

                <v-row>
                  <v-col cols="6">
                    <v-sheet class="pa-2" color="#151515" theme="dark">
                      <!-- Texts -->
                      <v-row>
                        <v-col cols="6">
                          <!-- Map Name -->
                          <v-text-field v-model="mapTitle" label="Map Name"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <!-- Size -->
                          <v-text-field v-model="size" label="Units"></v-text-field>
                        </v-col>
                      </v-row>
                      <!-- Description -->
                      <v-textarea v-model="description" label="Description" rows="3"></v-textarea>

                      <!-- Gameplay -->
                      <v-textarea v-model="gameplay" label="Gameplay Hooks" rows="5"></v-textarea>

                      <v-row>
                        <v-col cols="6">
                          <div class="form_Title" style="margin-top: 0.5vw;">Top-Down Layout</div>
                          <v-file-input type="file" :id="'test' + i" clearable chips label="Top-Down Layout"
                            @change="onFileChange($event, i)"></v-file-input>
                        </v-col>

                        <v-col cols="6">
                          <div class="form_Title" style="margin-top: 0.5vw;">Concept Art</div>
                          <v-file-input type="file" :id="'test' + i" clearable chips label="Concept Art"
                            @change="onFileChange($event, i)"></v-file-input>
                        </v-col>
                      </v-row>

                      <!-- Images -->




                    </v-sheet>
                  </v-col>
                </v-row>




                <!-- POI -->
                <div class="form_Title" style="margin-top: 0.5vw;">Points of interest</div>

                <!-- Create POI -->
                <v-dialog v-model="POI_dialog" width="auto">
                  <template v-slot:activator="{ props }">
                    <v-btn size="large" rounded="xl" color="primary" variant="outlined" v-bind="props"
                      prepend-icon="mdi-plus" style="margin-bottom: 0.5vw;">
                      Create POI
                    </v-btn>
                  </template>

                  <v-card width="900" class="rounded-card">
                    <v-form class="pa-8" ref="POIDialogForm">
                      <v-col cols="12">

                        <h1>POI {{ lettersGroup[poi_index] }}</h1>

                        <!-- POI Name -->
                        <v-text-field v-model="POITitle" label="Name"></v-text-field>

                        <!-- Letter
<v-select v-model="letterSelected" disabled chips label="Select"
  :items="['A', 'B', 'C', 'D', 'E', 'F']"></v-select> -->

                        <!-- Image upload -->
                        <v-file-input type="file" :id="'test' + i" clearable chips label="Image"
                          @change="onFileChange($event, i)"></v-file-input>

                        <v-btn @click="generateNewPOI" block size="large" rounded="xl" color="primary" v-bind="props"
                          prepend-icon="mdi-plus">
                          Generate New POI
                        </v-btn>

                      </v-col>
                    </v-form>
                    <v-card-actions>
                      <v-btn color="primary" block @click="POI_dialog = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>


              </div>

            </v-responsive>
          </v-col>
        </v-row>











        <div>
          <v-btn class="printButton" @click="printElement" size="large" rounded="xl" color="primary" v-bind="props"
            prepend-icon="mdi-download">
            Export
          </v-btn>
        </div>

      </v-window-item>
      <v-window-item :value="2">

        <!-- Tab 2 -->
        <h1>Documentation</h1>

      </v-window-item>
    </v-window>
  </v-card>



  <!-- <v-text class="text-overline">@Gabriel Bissonnette 2023</v-text> -->
</template>

<script>
import html2canvas from 'html2canvas';
import Moveable from "moveable";


const moveable = new Moveable(document.body, {
  target: document.querySelector(".target"),
  // If the container is null, the position is fixed. (default: parentElement(document.body))
  container: document.body,
  draggable: true,
  resizable: false,
  scalable: false,
  rotatable: false,
  warpable: false,
  // Enabling pinchable lets you use events that
  // can be used in draggable, resizable, scalable, and rotateable.
  pinchable: false, // ["resizable", "scalable", "rotatable"]
  origin: true,
  keepRatio: true,
  // Resize, Scale Events at edges.
  edge: false,
  throttleDrag: 0,
  throttleResize: 0,
  throttleScale: 0,
  throttleRotate: 0,
  className: "moveable1",
});



/* draggable */
moveable.on("dragStart", ({ target, clientX, clientY }) => { // eslint-disable-line no-unused-vars
  console.log("onDragStart", target);
}).on("drag", ({
  target, transform, // eslint-disable-line no-unused-vars
  left, top, right, bottom, // eslint-disable-line no-unused-vars
  beforeDelta, beforeDist, delta, dist, // eslint-disable-line no-unused-vars
  clientX, clientY, // eslint-disable-line no-unused-vars
}) => {
  console.log("onDrag left, top", left, top);
  target.style.left = `${left}px`;
  target.style.top = `${top}px`;
  // console.log("onDrag translate", dist);
  // target!.style.transform = transform;
}).on("dragEnd", ({ target, isDrag, clientX, clientY }) => { // eslint-disable-line no-unused-vars
  console.log("onDragEnd", target, isDrag);
});



window.addEventListener("mousedown", e => {
  if (e.target.id === "movableCardID") {
    moveable.setState({
      target: e.target,
    }, () => {
      moveable.dragStart(e);
    });
  }
  else {
    moveable.setState({
      target: null,
    })
  }
});




export default {
  name: 'App',
  data() {
    return {
      tab: null,

      mapTitle: '',
      size: '',
      description: '',
      gameplay: '',
      output: null,

      mainCapsuleImg: "./assets/defaultimg.png",

      POI_dialog: false,
      POITitle: '',

      POI_A: '',
      POI_B: '',
      POI_C: '',
      POI_D: '',
      POI_E: '',
      POI_F: '',

      image: [],
      i: '',

      poi_title: new Array(),
      poi_images: new Array(),
      poi_index: 0,
      leftSpacing: 1.5,

      lettersGroup: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
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
      // Save values
      this.poi_title.push(this.POITitle);

      // Close dialog window
      this.POI_dialog = false;

      // create a new div element
      const newDiv = document.createElement("div");

      // and give it some content
      const newContent = document.createTextNode(this.lettersGroup[this.poi_index] + ". " + this.poi_title[this.poi_index]);

      // add the text node to the newly created div
      newDiv.appendChild(newContent);

      // Add image
      const img = document.createElement("img");
      //console.log(this.poi_images[this.poi_index])
      img.src = this.poi_images[this.poi_index];
      img.style = "width: 11vw; display: block; margin-right: 1rem;";
      newDiv.appendChild(img);

      console.log(this.leftSpacing);

      // add letter
      const newLetter = document.createElement("div");
      // and give it some content
      const newContentLetter = document.createTextNode(this.lettersGroup[this.poi_index]);
      newLetter.style = "background-color: #fecb00; width:30px; height:30px; position: absolute; top: 3.5vw; left: " + this.leftSpacing + "vw;" + " text-align:center;";
      newContentLetter.style = "font-size: 0.7vw; text-align: center;";
      newLetter.id = "movableCardID";
      // add the text node to the newly created div
      newLetter.appendChild(newContentLetter);
      // add the newly created element and its content into the DOM
      var letterSection = document.getElementById("lettersToAttach");
      letterSection.parentNode.insertBefore(newLetter, letterSection);


      // add the newly created element and its content into the DOM
      var currentDiv = document.getElementById("divToAttach");
      currentDiv.parentNode.insertBefore(newDiv, currentDiv);

      // Increment index
      this.poi_index++;
      this.leftSpacing = this.leftSpacing + 1.5;



      // Reset form
      this.$refs.POIDialogForm.reset();
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;

      this.poi_images.push(URL.createObjectURL(files[0]));

      for (let i = 0; i < this.poi_images.length; i++) {
        console.log(this.poi_images[i])
      }
    },
    resetPOIDialogForm() {
      this.$refs.POIDialogForm.reset()
    },
  }

}
</script>

<style>
body {
  background-color: #151515;
  font-family: 'Montserrat', sans-serif;
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
}

.battlemap_logo {
  width: 19vw;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1vw;
}

.formSection {
  text-align: left;
  margin-top: 20px;
  /*margin-left: 20%;
  margin-right: 20%;*/
}

.contentSection {
  text-align: left;
  /*margin-top: 4vw;
  margin-left: 25%;
  margin-right: 25%;*/
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
  font-size: 1rem;
}

.printButton {
  margin: 25px;
}

.content_mainCapsule {
  width: 25.8vw;
}

.content_mapName {
  margin: 0;
  font-size: 1.5rem
}

.content_size {
  margin-top: 0px;
  margin-bottom: 0vw;
  font-size: 1rem
}

.content_subtitle {
  margin: 0vw;
  font-size: 1rem
}

.content_container {
  height: 2vw;
}

.rounded-card {
  border-radius: 50px;
  padding: 50px;
}

.squared-card {
  border-radius: 0px;
}

.form_Title {
  margin-bottom: 0.3vw;
}

.letters_legendSection {
  position: absolute;
  top: 3.5vw;
  left: 1.5vw;
  width: 20px;
  height: 20px;
}
</style>
