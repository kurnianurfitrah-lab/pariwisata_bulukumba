import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dasbor Admin</h1>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-700">Kelola Konten</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link className="btn btn-outline" to="/admin/attractions">Kelola Objek Wisata</Link>
          <Link className="btn btn-outline" to="/admin/hotels">Kelola Hotel</Link>
          <Link className="btn btn-outline" to="/admin/restorans">Kelola Restoran</Link>
          <Link className="btn btn-outline" to="/admin/categories">Kelola Kategori</Link>
          <Link className="btn btn-outline" to="/admin/events">Kelola Event</Link>
          <Link className="btn btn-outline" to="/admin/reviews">Kelola Review</Link>
          <Link className="btn btn-outline" to="/admin/lihat galery">Kelola lihat galery</Link>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-700">Pratinjau Publik</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link className="btn btn-outline" to="/events">Lihat Event Publik</Link>
          <Link className="btn btn-outline" to="/gallery">Lihat Galeri Publik</Link>
          <Link className="btn btn-outline" to="/">Kembali ke Website</Link>
        </div>
      </div>
    </div>
  );
}


