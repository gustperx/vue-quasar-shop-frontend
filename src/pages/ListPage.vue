<template>
  <q-page class="q-ma-md">
    <span class="text-h3 q-pt-xl">Products</span>
    <q-separator spaced />

    <div class="q-pa-md" v-if="products">
      <q-table
        title="Products"
        :rows="products"
        :columns="columns"
        :loading="isLoading"
        row-key="name"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.name }}
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
                  @click="handleEdit(props.row.id)"
                />
                <q-btn
                  color="primary"
                  label="Vatiants"
                  @click="handleVariants(props.row.id)"
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
import { onMounted } from 'vue';
import { useProduct } from '../composables/useProduct';

const {
  columns,
  products,
  isLoading,
  getProducts,
  handleEdit,
  handleDelete,
  handleVariants,
} = useProduct();

onMounted(() => {
  getProducts();
});
</script>
