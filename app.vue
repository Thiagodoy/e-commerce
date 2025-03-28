<template>
  <div>
    <!-- Sticky Header -->
    <header v-if="isLogged" class="header">
      <div class="welcome-message">
        Welcome {{ userName }}
      </div>
      <button class="logout-button" @click="logout">Logout</button>
    </header>


    <div class="container">
      <NuxtPage />
    </div>
  </div>



</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const showHeader = ref(false)
const isLogged = useState('isLogged', () => false)
const userName = useState('userName', () => '')


onMounted(async () => {
  const token = localStorage.getItem('token');

  if (token) {
    showHeader.value = true
    router.push("/products");
  }

})

function logout() {
  localStorage.removeItem('token');
  isLogged.value = false
  router.push('/login');
}
</script>

<style scoped>
/* Sticky Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  display: flex;

  align-items: center;
  z-index: 1000;
}

.welcome-message {
  font-size: 18px;
}

.logout-button {
  position: fixed;
  top: 0;
  right: 0;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}

</style>