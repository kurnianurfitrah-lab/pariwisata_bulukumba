import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api.js';
import { Form, Button, Card } from '../../components';

const emptyForm = {
  nama_kategori: '',
  deskripsi: '',
};

/**
 * ANCHOR: FormCategory
 * Renders a dedicated page to create or edit a category (no modal usage).
 */
export default function FormCategory() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(isEditing);

  // Fetch category data if editing
  useEffect(() => {
    if (isEditing) {
      async function fetchCategory() {
        try {
          const response = await api.get(`/admin/categories/${id}`);
          const category = response.data;
          setForm({
            nama_kategori: category.nama_kategori || '',
            deskripsi: category.deskripsi || '',
          });
        } catch (error) {
          console.error('Error fetching category:', error);
          toast.error('Gagal memuat data kategori');
        } finally {
          setLoadingCategory(false);
        }
      }
      fetchCategory();
    }
  }, [id, isEditing]);

  /**
   * ANCHOR: handleSubmit
   * Posts a new category or updates existing one and navigates back to listing.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    
    try {
      const payload = {
        name: form.nama_kategori,
        description: form.deskripsi,
      };

      if (isEditing) {
        await api.put(`/admin/categories/${id}`, payload);
        toast.success('Kategori berhasil diperbarui');
      } else {
        await api.post('/admin/categories', payload);
        toast.success('Kategori berhasil ditambahkan');
      }

      navigate('/admin/categories');
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(isEditing ? 'Gagal memperbarui kategori. Silakan coba lagi.' : 'Gagal menambahkan kategori. Silakan coba lagi.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loadingCategory) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {isEditing ? 'Edit Kategori' : 'Tambah Kategori'}
        </h1>
        <Link to="/admin/categories">
          <Button variant="ghost">Kembali</Button>
        </Link>
      </div>

      <Card>
        <Form onSubmit={handleSubmit} loading={submitting} submitText={isEditing ? "Update" : "Simpan"}>
          <Form.Section title="Informasi Kategori">
            <Form.Input
              label="Nama Kategori"
              placeholder="Masukkan nama kategori"
              value={form.nama_kategori}
              onChange={(e) => setForm({ ...form, nama_kategori: e.target.value })}
              required
            />
            
            <Form.Textarea
              label="Deskripsi"
              placeholder="Masukkan deskripsi kategori"
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              rows={4}
              helperText="Deskripsi singkat tentang kategori ini"
            />


          </Form.Section>
        </Form>
      </Card>
    </div>
  );
}
