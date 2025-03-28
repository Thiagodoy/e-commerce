<template>
    <div class="container">
        <div class="product-list">
            <h2>Product List</h2>
            <div class="search-bar">
                <input type="text" v-model="querySearch.name" placeholder="Search by name" />
                <input type="text" v-model="querySearch.description" placeholder="Search by description" />
                <input type="number" v-model="querySearch.price" placeholder="Search by price" step="0.01" />
                <button @click="searchProducts">Search</button>
                <button @click="clearFilters">Clear filter</button>
                <button @click="addNewProduct">Add new product</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in paginatedProducts" :key="index">
                        <td>{{ page.page == 0 ? (index + 1) : (index + 1) + page.size }}</td>
                        <td>{{ product.id}}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.description }}</td>
                        <td>${{ product.price.toFixed(2) }}</td>
                        <td>{{ product.quantity }}</td>
                        <td>
                            <button @click="editProduct(product)">Edit</button>
                            <button @click="openModal(product)" style="background-color: #ec2a2a;">Delete</button>
                            <button @click="viewProduct(product)" style="background-color: #6c757d;">View</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="paginatedProducts.length == 0">
                <p>No elements were found!</p>    
            </div>
            <div class="pagination">
                <button @click="prevPage" :disabled="(page.page + 1 ) === 1">Previous</button>
                <span>Page {{ page.page + 1 }} of {{ page.totalPages }}</span>
                <button @click="nextPage" :disabled="(page.page + 1) === page.totalPages">Next</button>
            </div>
            <!-- Pagination Size Selector -->
      <div class="pagination-size">
        <label for="pageSize">Items per page:</label>
        <select v-model="page.size" id="pageSize">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
        </div>
         <!-- Delete Confirmation Modal -->
         <div v-if="showModal" class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <span class="warning-icon">⚠️</span>
                </div>
                <p>Are you sure you want to delete this product?</p>
                <button @click="del">Yes</button>
                <button @click="showModal = false">No</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { deleteProduct, seachP } from "~/service/api";

const paginatedProducts = ref([]);
const page = ref({totalPages:0, page:0, size:10 });
const showModal = ref(false);
const delProduct = ref({});
const querySearch = ref({});

const isLogged = useState('isLogged')

onMounted(async () => {
    searchProducts();
    isLogged.value = true;
})

function viewProduct(product) {
    navigateTo(`product/${product.id}`);
}

function editProduct(product) {
    navigateTo(`products/edit/${product.id}`);
}

function addNewProduct(){
    navigateTo(`products/edit/0`);
}

function clearFilters(){
    querySearch.value = {};
    searchProducts();
}

function openModal(product){
    
    showModal.value = true;
    delProduct.value = product;
}

async function searchProducts(){
    const { data } = await seachP(querySearch, {page: page.value.page, size: page.value.size}); 
    page.value.totalPages = data.value.page.totalPages;
    page.value.page = data.value.page.number;
    page.value.size = data.value.page.size;
    paginatedProducts.value = data.value.content;   
}

function nextPage(){
    page.value.page = page.value.page + 1;
    searchProducts();
}

function prevPage(){
    page.value.page = page.value.page - 1;
    searchProducts();
}

async function del() {
    await deleteProduct(delProduct.value);
    await searchProducts();
    showModal.value = false;
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

.product-list {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    text-align: center;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

table,
th,
td {
    border: 1px solid #ddd;
}

th,
td {
    padding: 10px;
    text-align: left;
}

th {
    background-color: #007bff;
    color: white;
}

button {
    padding: 5px 10px;
    margin: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.pagination {
    margin-top: 20px;
}

.search-bar {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
}

.search-bar input {
    padding: 8px;
    width: 25%;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.search-bar button {
    padding: 8px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.search-bar button:hover {
    background-color: #0056b3;
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

.modal {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.modal button {
  margin: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal button:first-child {
  background-color: #dc3545;
  color: white;
}

.modal button:last-child {
  background-color: #6c757d;
  color: white;
}
.modal-header {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  color: red;
  margin-bottom: 10px;
}

.pagination-size {
  margin-top: 20px;
}

.pagination-size label {
  margin-right: 10px;
}

.pagination-size select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>