<template>
  <main class="flex px-2 pt-1">
    <!--alert-->
    <div
      v-if="alert.bool"
      class="bg-red-600 text-white text-center fixed top-0 left-0 w-full z-10 h-max p-2"
    >
      {{ alert.message }}
    </div>
    <audio
      class="hidden fixed bottom-0 left-0 z-20 rounded-none bg-black"
      controls
      loop
      id="audioPlayer"
      :src="chanson.preview_url"
    >
      Your browser does not support the audio element.
    </audio>
    <!--current song-->
    <div class="flex text-white w-1/4">
      <img
        :class="{
          'w-12 h-12 rounded-full': true,
          circle: isPlaying,
        }"
        alt=""
        :src="chanson.album.images[0].url"
      />
      <div class="sm:flex hidden flex-col w-28 mx-2 text-white">
        <span class="truncate">{{ chanson.name }}</span>
        <small class="truncate text-gray-400">{{
          chanson.artists[0].name
        }}</small>
      </div>
      <!--loved-->
      <div class="pt-3" v-if="store.state.hasAccount && false">
        <svg
          @click="saveSong"
          :class="{
            'text-white cursor-pointer': true,
            'text-red-600': details.saved,
          }"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </div>
    </div>
    <!--player-->
    <div class="flex flex-col w-1/2 pt-1">
      <div class="flex justify-center space-x-3">
        <!--previous-->
        <div
          @click="previous"
          class="text-white border-2 rounded-full h-max"
          title="previous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7 hover:bg-white hover:text-black p-1 rounded-full cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
            />
          </svg>
        </div>
        <!--play-->
        <div class="text-white h-max border-2 rounded-full">
          <!--play btn-->
          <svg
            v-if="!isPlaying"
            @click="play"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7 hover:bg-white hover:text-black p-1 rounded-full cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
          <!--pause btn-->
          <svg
            @click="pause"
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7 hover:bg-white hover:text-black p-1 rounded-full cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        </div>
        <!--next-->
        <div @click="next" class="text-white h-max border-2 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-7 h-7 hover:bg-white hover:text-black p-1 rounded-full cursor-pointer"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
            />
          </svg>
        </div>
      </div>
      <!--progress and time config-->
      <div class="text-white pb-1 flex items-center">
        <!--time-->
        <small>{{ details.currentTime }}</small>
        <!--gray global bar-->
        <div
          id="progressBar"
          @mousemove="hoverProgress($event)"
          @click="changeProgress($event)"
          class="w-full bg-gray-400 h-1 mx-2 cursor-pointer relative"
        >
          <!--hover ball-->
          <span
            id="ball"
            class="bg-white h-2 w-2 rounded-full absolute"
            :style="{
              left: details.percentagePlayed + '%',
              top: '-1px',
            }"
          ></span>
          <!--progress bar-->
          <span
            class="bg-white h-1 absolute top-0 left-0"
            :style="{
              width: details.percentagePlayed + '%',
            }"
          ></span>
        </div>
      </div>
    </div>

    <!--spotify img-->
    <div class="flex flex-row-reverse w-1/4">
      <img
        @click="goTo"
        class="w-12 h-12 rounded-full cursor-pointer"
        src="../../public/Spotify_Icon_CMYK_Green.png"
        alt=""
      />
    </div>
  </main>
</template>
<style scoped>
#progressBar:hover #ball {
  display: block;
}
.circle {
  border-radius: 50%; /* Makes the div circular */
  position: relative;
  animation: rotateAnimation 4s infinite linear; /* Animation name, duration, iteration count, timing function */
}

@keyframes rotateAnimation {
  0% {
    transform: rotate(0deg); /* Starting rotation */
  }
  100% {
    transform: rotate(360deg); /* Ending rotation */
  }
}
</style>
<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useEventBus } from "../events/events";
const { onEvent } = useEventBus();

const store = useStore();
const alert = ref({
  bool: false,
  message: "",
});
//default song
const chanson = ref({
  name: "VVS",
  artists: [{ name: "Ninho" }],
  album: {
    images: [
      {
        url: "https://i.scdn.co/image/ab67616d0000b273df4862f641044c61c4abe602",
      },
    ],
  },
  external_urls: {
    spotify: "https://open.spotify.com/intl-fr/track/5S12Ds2RswM2ITC0u1J01f",
  },
  preview_url:
    "https://p.scdn.co/mp3-preview/f378accb359a59d9be327b4ca06234261e9f08b5?cid=a73f77626fd246c9933091187ddfd428",
});
const details = ref({
  currentTime: "0:00",
  duration: "0:00",
  percentagePlayed: 0,
  saved: false,
});
const isPlaying = ref(false);
const index = ref(0);
const chansons = [chanson.value];
const goTo = () => {
  const url = chanson.value.external_urls.spotify;
  window.open(url, "_blank");
};
const play = () => {
  let audio = document.getElementById("audioPlayer");
  audio.play();
  isPlaying.value = true;
};
const pause = () => {
  let audio = document.getElementById("audioPlayer");
  audio.pause();
  isPlaying.value = false;
};
onMounted(() => {
  onEvent("setChansonEnCours", async (obj) => {
    if (obj.song.preview_url == null) {
      alert.value.bool = true;
      alert.value.message = obj.song.name + " n'est pas disponible en preview";
      setTimeout(() => {
        alert.value.bool = false;
      }, 3000);
      return;
    }
    chanson.value = obj.song;
    //insertion de la chanson dans le tableau de chansons
    chansons.push(obj.song);
    index.value = chansons.length - 1;
    if (!obj.first) {
      play();
    }
    // const saved = await store.dispatch("isSaved", chanson.value);
    // details.value.saved = saved;
    // console.log("saved", saved);
  });
  //playing  stuff
  const audio = document.getElementById("audioPlayer");

  // Update the audio information when it's loaded
  audio.addEventListener("loadedmetadata", () => {
    // Display duration

    details.value.duration = formatTime(audio.duration);
  });

  // Update the audio information when it's playing
  audio.addEventListener("timeupdate", () => {
    // Display current time

    details.value.currentTime = formatTime(audio.currentTime);
    // Calculate percentage played
    details.value.percentagePlayed = (audio.currentTime / audio.duration) * 100;
  });
});
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
// const playSong = (c) => {
//   let audio = document.getElementById("audioPlayer");
//   let img = document.getElementById("img");
//   img.src = c.album.images[0].url;
//   audio.src = c.preview_url;
//   audio.play();
//   isPlaying.value = true;
// };
const next = () => {
  if (index.value >= chansons.length - 1) {
    const newChanson = store.state.chansons[Math.floor(Math.random() * 20)];
    chansons.push(newChanson);
  }
  index.value++;
  chanson.value = chansons[index.value];
  setTimeout(() => {
    play();
  }, 10);
};
const previous = () => {
  if (index.value > 0) {
    index.value--;
    chanson.value = chansons[index.value];
    setTimeout(() => {
      play();
    }, 10);
  }
};
const changeProgress = (e) => {
  const audio = document.getElementById("audioPlayer");
  const bar = e.target;
  const bounding = bar.getBoundingClientRect();
  const x = e.clientX - bounding.left;
  const percentage = (x / bounding.width) * 100;
  audio.currentTime = (audio.duration * percentage) / 100;
};
const saveSong = async () => {
  details.value.saved = true;
  const saving = await store.dispatch("saveSong", chanson.value);
  console.log("saving", saving);
};
const hoverProgress = (e) => {
  const bar = e.target;
  const bounding = bar.getBoundingClientRect();
  const x = e.clientX - bounding.left;
  const percentage = (x / bounding.width) * 100;
  details.value.percentagePlayed = percentage;
};
</script>
