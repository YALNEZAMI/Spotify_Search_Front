<template>
  <div class="h-screen w-screen bg-black">
    <header class="">
      <div class="text-center p-3 flex justify-center mb-6">
        <img
          class="w-4/5"
          src="../../public/Spotify_Logo_CMYK_Green.png"
          alt=""
        />
      </div>
      <div class="flex justify-center">
        <h1 class="text-center w-2/4 font-bold text-xl text-white mb-2">
          Connectez-vous à votre compte Spotify et profitez d'une expérience de
          recherche dynamique et spéciale !
        </h1>
      </div>
    </header>
    <main class="relative">
      <div
        @click="redirectToAuthCodeFlow"
        id="left"
        class="bg-green-500 cursor-pointer"
      ></div>
      <div
        @click="redirectToAuthCodeFlow"
        id="right"
        class="bg-green-500 cursor-pointer"
      ></div>

      <button
        @click="redirectToAuthCodeFlow"
        class="w-3/4 p-3 rounded bg-green-500 flex flex-row justify-center"
      >
        <div>Login</div>
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
  </div>
</template>
<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
}
#left {
  border-top-left-radius: 30%;
  position: absolute;
  bottom: 10px;
  left: 12.5%;
  width: 50px;
  height: 100px;
}
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
//TODO refrech token
import { useStore } from "vuex";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const clientId = "a73f77626fd246c9933091187ddfd428"; // Replace with your client ID
const params = new URLSearchParams(window.location.search);
const code = params.get("code");
onMounted(async () => {
  if (!code) {
    return;
  } else {
    const accessToken = await getAccessToken(clientId, code);
    localStorage.clear();
    store.commit("setToken", accessToken);
    localStorage.setItem("accessToken", accessToken);
    if (accessToken) {
      router.push("/home");
    }
  }
});

async function redirectToAuthCodeFlow() {
  const clientId = "a73f77626fd246c9933091187ddfd428"; // Replace with your client ID
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:4200/login");
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function getAccessToken(clientId, code) {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:4200/login");
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}
function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
</script>
