<template>
  <div class="container">
    <div class="view-page">
      <h2>Product Details</h2>
      <div v-if="product">
        <p><strong>Name:</strong> {{ product.name }}</p>
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Price:</strong> ${{ product.price }}</p>
        <p><strong>Qty:</strong> {{ product.quantity }}</p>
      </div>
      <button @click="$router.push('/products')">Back to List</button>
    </div>
  </div>
</template>

<script setup>
import { productById } from '~/service/api';
const route = useRoute()
const product = ref({});
const id = ref(route.params.id)

onMounted(async () => {
  const { data } = await productById(id.value)
  product.value = data.value
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.view-page {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

p {
  font-size: 16px;
  margin: 10px 0;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}
</style>