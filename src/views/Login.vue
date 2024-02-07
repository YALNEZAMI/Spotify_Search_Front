<template>
  <div class="h-full min-h-screen w-screen bg-black">
    <header class="">
      <!--logo div-->
      <div class="text-center p-3 flex justify-center mb-6">
        <img class="w-4/5" src="/Spotify_Logo_CMYK_Green.png" alt="" />
      </div>
      <!--phrase d'intro-->
      <div class="flex justify-center">
        <h1 class="text-center w-2/4 font-bold text-xl text-white mb-2">
          Connectez-vous à votre compte Spotify et profitez d'une expérience de
          recherche dynamique et spéciale !
        </h1>
      </div>
    </header>
    <main class="relative">
      <!--ail gauche du bouton login-->
      <div
        @click="redirectToAuthCodeFlow"
        id="left"
        class="bg-green-500 cursor-pointer"
      ></div>
      <!--ail droit du bouton login-->
      <div
        @click="redirectToAuthCodeFlow"
        id="right"
        class="bg-green-500 cursor-pointer"
      ></div>
      <!--bouton login-->
      <button
        @click="redirectToAuthCodeFlow"
        class="w-3/4 p-3 rounded bg-green-500 flex flex-row justify-center"
      >
        <!--login word-->
        <div>Login</div>
        <!-- spotify logo div -->
        <div class="mt-1 mx-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-spotify"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"
            />
          </svg>
        </div>
      </button>
    </main>
    <div class="flex justify-center">
      <button
        @click="loginWithoutAccount"
        class="mt-4 bg-green-600 hover:bg-green-500 p-2 rounded cursor-pointer"
      >
        <span v-if="!connectingWithoutAccount">
          I do not have a Spotify account</span
        >
        <div v-else class="flex">
          <span>Waiting the server running</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-hourglass-split mx-2"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>
<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}
/*aim gauche du bouton login*/
#left {
  border-top-left-radius: 30%;
  position: absolute;
  bottom: 10px;
  left: 12.5%;
  width: 50px;
  height: 100px;
}
/*aim droit du bouton login*/
#right {
  border-top-right-radius: 30%;
  position: absolute;
  bottom: 10px;
  right: 12.5%;
  width: 50px;
  height: 100px;
}
</style>
<script setup>
//import section
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
//initialisation section
const router = useRouter();
const store = useStore();
const route = useRoute();
const connectingWithoutAccount = ref(false);
let clientId = ""; // local
if (store.state.ENV === "production") {
  clientId = "e2e8ff7af3a5438384f5cc8d3b871aae"; // prod
} else {
  clientId = "a73f77626fd246c9933091187ddfd428"; // local}
}
const code = route.query.code;
//fonction executé au montage
onMounted(async () => {
  //si pas de code, on reste sur la page login
  if (!code) {
    console.log("no code");
    return;
  } else {
    console.log("code", code);
    //sinon on récupère le token, qui est stocké dans le store et dans le local storage
    const accessToken = await store.dispatch("getAccessToken", {
      clientId,
      code,
    });
    console.log("accessToken", accessToken);

    //on récupère le profile, qui est stocké dans le store et dans le local storage
    await store.dispatch("getProfile");
    if (accessToken) {
      //si le token est valide, on redirige vers la page home
      router.push("/admin/home");
    }
  }
});
//fontion de redirection pour se connecter à spotify
async function redirectToAuthCodeFlow() {
  let redirect_uri = "";
  if (store.state.ENV === "production") {
    redirect_uri = "https://spotify-searcher.onrender.com";
  } else {
    redirect_uri = "http://localhost:4200";
  }
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);
  localStorage.setItem("verifier", verifier);
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", redirect_uri);
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);
  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}
//fonction auxiliaire à l'authentification
function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
//fonction auxiliaire à l'authentification
async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
async function loginWithoutAccount() {
  store.commit("setHasAccount", false);

  connectingWithoutAccount.value = true;
  const token = await store.dispatch("getAccessTokenWithoutAccount");
  if (token) {
    router.push("/admin/home");
  } else {
    connectingWithoutAccount.value = false;
  }
}
</script>
