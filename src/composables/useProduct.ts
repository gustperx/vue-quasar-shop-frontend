import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

import { api } from '../boot/axios';
import {
  Product,
  ProductForm,
  ProductItem,
  ProductPostRequest,
} from '../interfaces/product.interface';

export const useProduct = () => {
  const $q = useQuasar();
  const router = useRouter();

  const products = ref<ProductItem[]>();
  const isLoading = ref<boolean>(false);

  const initialState: ProductForm = {
    name: '',
    description: '',
    price: 1,
    reference: '',
    variations: [],
  };

  const getProducts = async () => {
    try {
      isLoading.value = true;
      const { data } = await api.get<{ data: Product[] }>('/products');
      isLoading.value = false;
      products.value = data.data.map((item) => ({
        ...item,
        variations: item.variations.length,
      }));
    } catch (error) {
      isLoading.value = false;
      products.value = [];
    }
  };

  const getProduct = async (id: number) => {
    try {
      const { data } = await api.get<{ data: Product }>(`/products/${id}`);
      return data.data;
    } catch (error) {
      $q.notify({
        message: 'Product not found.',
        position: 'top-right',
        type: 'negative',
      });
    }
  };

  const handleCreate = async (values: ProductForm) => {
    try {
      await api.post<ProductPostRequest>('/products', values);

      $q.notify({
        message: 'Product created',
        position: 'top-right',
        type: 'positive',
      });

      router.push({ name: 'index' });
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleEdit = (id: number) => {
    router.push({ name: 'product-edit', params: { id } });
  };

  const handleVariants = (id: number) => {
    router.push({ name: 'product-variants', params: { id } });
  };

  const handleUpdate = async (id: number, values: ProductForm) => {
    try {
      await api.patch<ProductPostRequest>(`/products/${id}`, values);

      $q.notify({
        message: 'Product updated',
        position: 'top-right',
        type: 'positive',
      });

      router.push({ name: 'index' });
    } catch (error) {
      handleErrors(error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const resp = await api.delete(`/products/${id}`);
      if (resp.status === 200) {
        $q.notify({
          message: 'Product deleted.',
          position: 'top-right',
          type: 'positive',
        });
        getProducts();
      } else {
        $q.notify({
          message: 'Product not deleted.',
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

  const columns = [
    { name: 'id', label: 'ID', field: 'id', sortable: true },
    { name: 'name', label: 'Name', field: 'name', sortable: true },
    {
      name: 'reference',
      label: 'Reference',
      field: 'reference',
      sortable: true,
    },
    { name: 'price', label: 'Price', field: 'price', sortable: true },
    {
      name: 'variations',
      label: 'Variations',
      field: 'variations',
      sortable: true,
    },
    {
      name: 'actions',
      label: 'Actions',
      field: 'null',
    },
  ];

  return {
    // propertys
    columns,
    products,
    isLoading,
    initialState,
    // methods
    getProduct,
    getProducts,
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleVariants,
  };
};
