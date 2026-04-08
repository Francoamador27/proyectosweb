import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Plus, Trash2, Edit, GripVertical } from 'lucide-react';
import useSWR, { mutate } from 'swr';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clienteAxios from '../config/axios';

function SortablePortafolioItem({ proyecto, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: proyecto.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:')) {
      return path;
    }

    const cleanPath = String(path).replace(/^\/+/, '');

    if (cleanPath.startsWith('storage/')) {
      return `${import.meta.env.VITE_API_URL}/${cleanPath}`;
    }

    if (cleanPath.startsWith('portafolio/') || cleanPath.startsWith('portafolio-galeria/')) {
      return `${import.meta.env.VITE_API_URL}/storage/uploads/${cleanPath}`;
    }

    return `${import.meta.env.VITE_API_URL}/${cleanPath}`;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="p-2 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-5 h-5" />
      </button>

      {/* Imagen */}
      {proyecto.imagen && (
        <img
          src={getImageUrl(proyecto.imagen)}
          alt={proyecto.titulo}
          className="w-16 h-16 object-cover rounded-lg"
        />
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-slate-900 truncate">{proyecto.titulo}</h3>
        <p className="text-sm text-slate-500 line-clamp-1">{proyecto.descripcion}</p>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2">
        <Link
          to={`/admin-dash/portafolio/${proyecto.id}`}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Editar"
        >
          <Edit className="w-5 h-5" />
        </Link>
        <button
          onClick={() => onDelete(proyecto.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Eliminar"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function AdminPortafolioList() {
  const [portafolios, setPortafolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('proyectos');
  const token = localStorage.getItem('AUTH_TOKEN');

  // Estado para categorías
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [parentId, setParentId] = useState('');
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetcher = (url) => clienteAxios(url).then((res) => res.data);
  const { data, error: loadError, isLoading } = useSWR(
    '/api/portafolio-categorias',
    fetcher,
    { revalidateOnFocus: false }
  );

  const categorias = useMemo(() => {
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data)) return data;
    return [];
  }, [data]);

  const flattenedCategories = useMemo(() => {
    const flatten = (cats, level = 0) => {
      let result = [];
      cats.forEach(cat => {
        result.push({ ...cat, level });
        if (cat.children && cat.children.length > 0) {
          result = [...result, ...flatten(cat.children, level + 1)];
        }
      });
      return result;
    };
    return flatten(categorias);
  }, [categorias]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    fetchPortafolios();
  }, []);

  const fetchPortafolios = async () => {
    try {
      setLoading(true);
      const { data } = await clienteAxios.get('/api/portafolios');
      setPortafolios(data.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (proyectoId) => {
    if (!confirm('¿Está seguro de que desea eliminar este proyecto?')) return;

    try {
      await clienteAxios.delete(`/api/portafolios/${proyectoId}`);
      setPortafolios(portafolios.filter((p) => p.id !== proyectoId));
      alert('Proyecto eliminado');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el proyecto');
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = portafolios.findIndex((p) => p.id === active.id);
      const newIndex = portafolios.findIndex((p) => p.id === over.id);

      const newOrder = arrayMove(portafolios, oldIndex, newIndex);
      setPortafolios(newOrder);

      // Guardar orden en backend
      setSaving(true);
      try {
        await clienteAxios.post('/api/portafolios/reorder', {
          items: newOrder.map((p, idx) => ({ id: p.id, position: idx + 1 })),
        });
      } catch (error) {
        console.error('Error al guardar orden:', error);
      } finally {
        setSaving(false);
      }
    }
  };

  // Funciones para categorías
  useEffect(() => {
    if (!editingId) return;
    const cat = flattenedCategories.find((c) => c.id === editingId);
    if (!cat) return;
    setNombre(cat.nombre || '');
    setDescripcion(cat.descripcion || '');
    setParentId(cat.parent_id || '');
    setImagen(null);
    setImagenPreview(cat.imagen || null);
  }, [editingId, flattenedCategories]);

  const resetForm = () => {
    setNombre('');
    setDescripcion('');
    setImagen(null);
    setImagenPreview(null);
    setParentId('');
    setEditingId(null);
  };

  const MAX_MB = 5;
  const MAX_BYTES = MAX_MB * 1024 * 1024;

  const validarArchivo = (file) => {
    const okType = /image\/(jpeg|png|webp)/.test(file.type);
    if (!okType) return 'Formato invalido. Solo JPG, PNG o WEBP.';
    if (file.size > MAX_BYTES) return `Maximo ${MAX_MB}MB por imagen.`;
    return null;
  };

  const onImagenChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validarArchivo(file);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setImagen(file);
    setImagenPreview(URL.createObjectURL(file));
  };

  const handleSubmitCategoria = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    if (!nombre.trim()) {
      setError('El nombre de la categoria es obligatorio.');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', nombre.trim());
    formData.append('descripcion', descripcion.trim());
    if (parentId) formData.append('parent_id', parentId);
    if (imagen) formData.append('imagen', imagen);

    try {
      setCargando(true);
      if (editingId) {
        await clienteAxios.post(
          `/api/portafolio-categorias/${editingId}?_method=PUT`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setMensaje('Categoria actualizada correctamente.');
      } else {
        await clienteAxios.post('/api/portafolio-categorias', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setMensaje('Categoria creada correctamente.');
      }

      resetForm();
      mutate('/api/portafolio-categorias');
    } catch (err) {
      console.error(err);
      setError('No se pudo guardar la categoria.');
    } finally {
      setCargando(false);
    }
  };

  const handleDeleteCategoria = async (id) => {
    if (!window.confirm('Seguro que queres eliminar esta categoria?')) return;

    try {
      await clienteAxios.delete(`/api/portafolio-categorias/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      mutate('/api/portafolio-categorias');
    } catch (err) {
      console.error(err);
      setError('No se pudo eliminar la categoria.');
    }
  };

  const renderCategory = (cat, level = 0) => (
    <div key={cat.id} className={`${level > 0 ? 'ml-8 mt-2' : ''}`}>
      <div className="border rounded-lg p-4 flex gap-4 bg-white">
        {cat.imagen ? (
          <img
            src={cat.imagen}
            alt={cat.nombre}
            className="w-20 h-20 object-cover rounded-lg border"
          />
        ) : (
          <div className="w-20 h-20 bg-slate-100 rounded-lg border" />
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{cat.nombre}</h4>
            {level > 0 && (
              <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded">
                Subcategoría
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600">
            {cat.descripcion || 'Sin descripcion'}
          </p>
          {cat.children && cat.children.length > 0 && (
            <p className="text-xs text-slate-500 mt-1">
              {cat.children.length} subcategoría{cat.children.length !== 1 ? 's' : ''}
            </p>
          )}
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => setEditingId(cat.id)}
              className="text-xs bg-cyan-600 text-white px-3 py-1 rounded"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => handleDeleteCategoria(cat.id)}
              className="text-xs bg-red-600 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      {cat.children && cat.children.length > 0 && (
        <div className="space-y-2">
          {cat.children.map(child => renderCategory(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Pestañas */}
      <div className="flex gap-4 mb-8 border-b border-slate-200">
        <button
          onClick={() => {
            setActiveTab('proyectos');
            resetForm();
            setError(null);
            setMensaje(null);
          }}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'proyectos'
              ? 'border-[#0891b2] text-[#0891b2]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Proyectos
        </button>
        <button
          onClick={() => {
            setActiveTab('categorias');
            resetForm();
            setError(null);
            setMensaje(null);
          }}
          className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
            activeTab === 'categorias'
              ? 'border-[#0891b2] text-[#0891b2]'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          Categorías
        </button>
      </div>

      {/* Contenido de Proyectos */}
      {activeTab === 'proyectos' && (
        <>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-black text-slate-900">Proyectos</h1>
            <Link
              to="/admin-dash/portafolio/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891b2] hover:bg-[#0e7490] text-white font-bold rounded-lg shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Nuevo Proyecto
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader className="w-12 h-12 text-[#0891b2] animate-spin" />
            </div>
          ) : portafolios.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
              <p className="text-xl text-slate-500 mb-4">No hay proyectos aún</p>
              <Link
                to="/admin-dash/portafolio/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891b2] hover:bg-[#0e7490] text-white font-bold rounded-lg"
              >
                <Plus className="w-5 h-5" />
                Crear Primer Proyecto
              </Link>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={portafolios.map((p) => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {portafolios.map((proyecto) => (
                    <SortablePortafolioItem
                      key={proyecto.id}
                      proyecto={proyecto}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}

          {saving && (
            <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 flex items-center gap-2">
              <Loader className="w-5 h-5 text-[#0891b2] animate-spin" />
              <span className="text-sm font-medium text-slate-700">Guardando orden...</span>
            </div>
          )}
        </>
      )}

      {/* Contenido de Categorías */}
      {activeTab === 'categorias' && (
        <div className="space-y-8">
          <div className="bg-white border rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">
              {editingId ? 'Editar categoria' : 'Nueva categoria'}
            </h2>

            <form onSubmit={handleSubmitCategoria} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full border p-3 rounded-lg"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Web Design, Mobile Apps, Branding"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Categoría Padre (opcional)
                </label>
                <select
                  className="w-full border p-3 rounded-lg"
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                >
                  <option value="">-- Sin categoría padre (Principal) --</option>
                  {flattenedCategories
                    .filter(cat => cat.id !== editingId)
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {'\u00A0'.repeat(cat.level * 4)}{cat.nombre}
                      </option>
                    ))}
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  Deja vacío para crear una categoría principal, o selecciona una para crear una subcategoría
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Descripcion
                </label>
                <textarea
                  className="w-full border p-3 rounded-lg"
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Breve descripcion de la categoria"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">
                  Imagen (opcional)
                </label>
                {imagenPreview && (
                  <img
                    src={imagenPreview}
                    alt="Vista previa"
                    className="w-full h-48 object-cover rounded-lg border mb-3"
                  />
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={onImagenChange}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
                  {error}
                </div>
              )}

              {mensaje && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg">
                  {mensaje}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={cargando}
                  className="bg-cyan-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                >
                  {cargando
                    ? 'Guardando...'
                    : editingId
                    ? 'Actualizar'
                    : 'Crear'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-slate-100 text-slate-700 px-5 py-2 rounded-lg"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="p-4 space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">Categorías Existentes</h3>
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader className="w-12 h-12 text-[#0891b2] animate-spin" />
              </div>
            ) : categorias.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-slate-500">No hay categorías aún</p>
              </div>
            ) : (
              <div className="space-y-3">
                {categorias.map(cat => renderCategory(cat))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
