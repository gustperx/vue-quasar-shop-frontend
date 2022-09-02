<template>
  <q-page class="q-ma-md">
    <span class="text-h3 q-pt-xl">Product Variants</span>
    <q-separator spaced />

    <div class="q-pa-md" v-if="product">
      <p class="text-h6">Name: {{ product.name }}</p>
      <p class="text-h6">Reference: {{ product.reference }}</p>
      <p class="text-h6">Description: {{ product.description }}</p>

      <q-btn
        color="primary"
        label="Add Vatiant"
        @click="goToCreate(product!.id)"
      />
    </div>

    <div class="q-pa-md" v-if="product">
      <q-table
        title="Variants"
        :rows="product.variations"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="description" :props="props">
              {{ props.row.description }}
            </q-td>
            <q-td key="reference" :props="props">
              {{ props.row.reference }}
            </q-td>
            <q-td key="price" :props="props">
              {{ props.row.price }}
            </q-td>
            <q-td key="variations" :props="props">
              {{ props.row.variations }}
            </q-td>
            <q-td key="actions" :props="props">
              <div class="q-pa-md q-gutter-sm">
                <q-btn
                  color="primary"
                  label="Edit"
                  @click="handleEdit(product!.id, props.row.id)"
                />
                <q-btn
                  color="deep-orange"
                  label="Delete"
                  @click="handleDelete(props.row.id)"
                />
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useProduct } from '../composables/useProduct';
import { useVariant } from '../composables/useVariant';
import { Product } from '../interfaces/product.interface';

const route = useRoute();
const { getProduct } = useProduct();
const { columns, handleDelete, handleEdit, goToCreate } = useVariant();

const product = ref<Product>();

onMounted(async () => {
  const { id = '' } = route.params;
  if (id && !isNaN(Number(id))) {
    const resp = await getProduct(+id);
    if (resp) {
      product.value = resp;
    }
  }
});
</script>
