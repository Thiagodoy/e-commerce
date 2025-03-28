<template>
    <div class="container">
        <div class="edit-page">
            <h2 v-if="id > 0">Edit Product</h2>
            <h2 v-else>Create Product</h2>
            <form @submit.prevent="submit">
                <div class="input-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="product.name" />
                </div>
                <div class="input-group">
                    <label for="description">Description</label>
                    <textarea id="description" v-model="product.description"></textarea>
                </div>
                <div class="input-group">
                    <label for="price">Price</label>
                    <input type="number" id="price" v-model="product.price" step="0.01" />
                </div>
                <div class="input-group">
                    <label for="price">Qty</label>
                    <input type="number" id="quantity" v-model="product.quantity" step="1.0" />
                </div>

                <div class="input-group">
                    <template v-for="(item, index) in errors" :key="index">
                        <ul>
                            <p class="error-message">
                             {{ item }}
                        </p>
                        </ul>
                        
                    </template>
                </div>

                <button v-if="id == 0" type="submit" :disabled="loading">
                    {{ loading ? "Creating......" : "Create" }}
                </button>
                <button v-else type="submit" :disabled="loading">
                    {{ loading ? "Updating......" : "Update" }}
                </button>
                <button type="button" @click="$router.push('/products')">Cancel</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { productById, updateProduct,createProduct } from '~/service/api';
const route = useRoute()
const product = ref(new Object());
const id = ref(route.params.id);
const loading = ref(false);
const errors =  ref([]);

onMounted(async () => {
    if(id.value > 0){
        const { data } = await productById(id.value)
        product.value = data.value    
    }
})

async function submit(){
    loading.value = true;
    errors.value = [];
    if(id.value == 0){
        const { data, error } = await createProduct(product)

        if (error.value) {
            errors.value = error.value.data.validations;
        }else{
            product.value = data.value
            id.value = product.value.id;
            navigateTo( `/products`);
        }
       
    }else{
        const { data } = await updateProduct(product)
        product.value = data.value
        navigateTo( `/products`);
    }
    loading.value = false;
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
}

.edit-page {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}

.input-group {
    margin-bottom: 15px;
    text-align: left;
}

.input-group label {
    display: block;
    font-weight: bold;
}

.input-group input,
.input-group textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
}

button:hover {
    background-color: #0056b3;
}

button[type="button"] {
    background-color: #6c757d;
}

button[type="button"]:hover {
    background-color: #5a6268;
}
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
}
</style>