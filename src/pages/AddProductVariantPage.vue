<template>
  <q-page class="q-ma-md">
    <span class="text-h3 q-pt-xl">Add Product Variant</span>
    <q-separator spaced />

    <div class="row justify-center">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-xs col-xs-12 col-md-6 q-pt-xl"
      >
        <q-input
          filled
          v-model="variantForm.reference"
          label="Variant Reference"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'This field is required',
          ]"
        />

        <q-input
          filled
          v-model="variantForm.description"
          label="Variant Description"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'This field is required',
          ]"
        />

        <q-input
          filled
          type="number"
          v-model="variantForm.price"
          label="Variant Price"
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

import { useVariant } from '../composables/useVariant';
import { VariationForm } from '../interfaces/product.interface';

const route = useRoute();

const { initialState, handleCreate, handleUpdate, getVariant } = useVariant();

const productId = ref<number>();
const variantId = ref<null | number>();
const variantForm = ref<VariationForm>(initialState);

onMounted(async () => {
  const { product_id = '', variant_id = '' } = route.params;
  if (product_id && !isNaN(Number(product_id))) {
    productId.value = Number(product_id);
  }
  if (variant_id && !isNaN(Number(variant_id))) {
    variantId.value = Number(variant_id);
    const variant = await getVariant(variantId.value);
    if (variant) {
      variantForm.value = {
        product_id: variant.product_id,
        description: variant.description,
        price: variant.price,
        reference: variant.reference,
      };
    } else {
      variantId.value = null;
    }
  }
});

const onSubmit = async () => {
  const values: VariationForm = {
    ...variantForm.value,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    product_id: productId.value!,
  };
  if (variantId.value) {
    handleUpdate(variantId.value, values);
  } else {
    handleCreate(values);
  }
};

const onReset = () => {
  variantForm.value = initialState;
};
</script>
