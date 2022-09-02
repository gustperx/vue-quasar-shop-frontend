import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import {
  ProductVariantPostRequest,
  Variation,
  VariationForm,
} from 'src/interfaces/product.interface';
import { api } from '../boot/axios';

export const useVariant = () => {
  const $q = useQuasar();
  const router = useRouter();

  const initialState: VariationForm = {
    product_id: 0,
    description: '',
    price: 1,
    reference: '',
  };

  const deleteItem = async (id: number) => {
    try {
      const resp = await api.delete(`/variations/${id}`);
      if (resp.status === 200) {
        $q.notify({
          message: 'Variant deleted.',
          position: 'top-right',
          type: 'positive',
        });
      } else {
        $q.notify({
          message: 'Variant not deleted.',
          position: 'top-right',
          type: 'warning',
        });
      }
    } catch (error) {
      $q.notify({
        message: 'Error on request.',
        position: 'top-right',
        type: 'negative',
      });
    }
  };

  const getVariant = async (id: number) => {
    try {
      const { data } = await api.get<{ data: Variation }>(`/variations/${id}`);
      return data.data;
    } catch (error) {
      $q.notify({
        message: 'Variant not found.',
        position: 'top-right',
        type: 'negative',
      });
    }
  };

  const goToCreate = (product_id: number) => {
    router.push({ name: 'product-variant-add', params: { product_id } });
  };

  const handleCreate = async (values: VariationForm) => {
    try {
      const { data } = await api.post<ProductVariantPostRequest>(
        '/variations',
        values
      );
      const { data: variant } = data;

      $q.notify({
        message: 'Variant created',
        position: 'top-right',
        type: 'positive',
      });

      router.push({
        name: 'product-variants',
        params: { id: variant.product_id },
      });
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleEdit = (product_id: number, variant_id: number) => {
    router.push({
      name: 'product-variant-edit',
      params: { product_id, variant_id },
    });
  };

  const handleUpdate = async (id: number, values: VariationForm) => {
    try {
      const { data } = await api.patch<ProductVariantPostRequest>(
        `/variations/${id}`,
        values
      );
      const { data: variant } = data;

      $q.notify({
        message: 'Variant updated',
        position: 'top-right',
        type: 'positive',
      });

      router.push({
        name: 'product-variants',
        params: { id: variant.product_id },
      });
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleDelete = (id: number) => {
    $q.dialog({
      title: 'Confirm',
      message: `Are you sure you want to delete item ${id}?`,
      cancel: true,
      persistent: true,
    }).onOk(() => {
      deleteItem(id);
    });
  };

  const columns = [
    { name: 'id', label: 'ID', field: 'id', sortable: true },
    {
      name: 'description',
      label: 'Description',
      field: 'description',
      sortable: true,
    },
    {
      name: 'reference',
      label: 'Reference',
      field: 'reference',
      sortable: true,
    },
    { name: 'price', label: 'Price', field: 'price', sortable: true },
    {
      name: 'actions',
      label: 'Actions',
      field: 'null',
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleErrors = (error: any) => {
    const { data } = error.response;
    if (data.data) {
      const errors = Object.keys(data.data);
      errors.forEach((error) => {
        $q.notify({
          message: `${data.data[error]}`,
          position: 'top-right',
          type: 'negative',
        });
      });
    }
  };

  return {
    // propertys
    columns,
    initialState,
    // methods
    goToCreate,
    handleDelete,
    handleCreate,
    getVariant,
    handleUpdate,
    handleEdit,
  };
};
