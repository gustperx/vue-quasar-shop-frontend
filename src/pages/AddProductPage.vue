<template>
  <q-page class="q-ma-md">
    <span class="text-h3 q-pt-xl">Handle Product</span>
    <q-separator spaced />

    <div class="row justify-center">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-xs col-xs-12 col-md-6 q-pt-xl"
      >
        <q-input
          filled
          v-model="productForm.name"
          label="Product Name"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'This field is required',
          ]"
        />

        <q-input
          filled
          v-model="productForm.reference"
          label="Product Reference"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'This field is required',
          ]"
        />

        <q-input
          filled
          v-model="productForm.description"
          label="Product Description"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'This field is required',
          ]"
        />

        <q-input
          filled
          type="number"
          v-model="productForm.price"
          label="Product Price"
          min="0"
          step="0.01"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'This field is required',
          ]"
        />

        <div class="row justify-end">
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useProduct } from '../composables/useProduct';
import { ProductForm } from '../interfaces/product.interface';

const { getProduct, handleCreate, handleUpdate, initialState } = useProduct();
const route = useRoute();

const product_id = ref<null | number>(null);
const productForm = ref<ProductForm>(initialState);

onMounted(async () => {
  const { id = '' } = route.params;
  if (id && !isNaN(Number(id))) {
    product_id.value = Number(id);
    const product = await getProduct(product_id.value);
    if (product) {
      productForm.value = {
        name: product.name,
        description: product.description,
        price: product.price,
        reference: product.reference,
        variations: product.variations,
      };
    } else {
      product_id.value = null;
    }
  }
});

const onSubmit = async () => {
  if (product_id.value) {
    handleUpdate(product_id.value, productForm.value);
  } else {
    handleCreate(productForm.value);
  }
};

const onReset = () => {
  productForm.value = initialState;
};
</script>
