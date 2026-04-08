import React, { useEffect, useState } from 'react';
import clienteAxios from '../../config/axios';
import {
  DndContext,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Image as ImageIcon, Pencil, X } from 'lucide-react';

const SortableItem = ({ slide, onDelete, onEdit, isEditing }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: slide.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border rounded-xl shadow-sm flex items-center gap-4 p-4 ${
        isEditing ? 'border-blue-300 ring-2 ring-blue-100' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
        title="Arrastrar"
      >
        <GripVertical />
      </div>

      {slide.background_type === 'youtube' ? (
        <div className="w-24 h-24 rounded-lg border bg-black text-white text-[11px] flex items-center justify-center text-center px-2">
          VIDEO YOUTUBE
        </div>
      ) : (
        <img
          src={slide.image}
          alt={slide.title}
          className="w-24 h-24 object-cover rounded-lg border"
        />
      )}

      <div className="flex-1">
        <h4 className="font-semibold text-sm">{slide.title}</h4>
        <p className="text-xs text-gray-600 line-clamp-2">{slide.description}</p>
        <p className="text-[11px] text-gray-500 mt-1">
          Fondo: {slide.background_type === 'youtube' ? 'YouTube' : 'Imagen'}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit(slide);
        }}
        className="text-blue-500 hover:text-blue-700 p-2"
        title="Editar"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(slide.id);
        }}
        className="text-red-500 hover:text-red-700 p-2"
        title="Eliminar"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

const SlidersAdmin = () => {
  const token = localStorage.getItem('AUTH_TOKEN');

  const [slides, setSlides] = useState([]);
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [backgroundType, setBackgroundType] = useState('image');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const { data } = await clienteAxios.get('/api/sliders');
      setSlides(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setBackgroundType('image');
    setYoutubeUrl('');
    setImagen(null);
    setPreview(null);
    setError(null);
    setMensaje(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);

    if (!title.trim() || !description.trim()) {
      setError('Titulo y descripcion son obligatorios');
      return;
    }

    if (backgroundType === 'image') {
      const currentSlide = slides.find((s) => s.id === editingId);
      if (!imagen && !currentSlide?.image) {
        setError('La imagen es obligatoria');
        return;
      }
    }

    if (backgroundType === 'youtube' && !youtubeUrl.trim()) {
      setError('La URL de YouTube es obligatoria');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('background_type', backgroundType);

    if (backgroundType === 'image' && imagen) {
      formData.append('imagen', imagen);
    }

    if (backgroundType === 'youtube') {
      formData.append('youtube_url', youtubeUrl.trim());
    }

    try {
      setCargando(true);
      if (editingId) {
        await clienteAxios.post(`/api/sliders/${editingId}?_method=PUT`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setMensaje('Slide actualizado correctamente');
      } else {
        await clienteAxios.post('/api/sliders', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        setMensaje('Slide creado correctamente');
      }

      resetForm();
      fetchSlides();
    } catch {
      setError(editingId ? 'Error al actualizar el slide' : 'Error al crear el slide');
    } finally {
      setCargando(false);
    }
  };

  const handleEdit = (slide) => {
    setEditingId(slide.id);
    setTitle(slide.title || '');
    setDescription(slide.description || '');
    setBackgroundType(slide.background_type || 'image');
    setYoutubeUrl(slide.youtube_url || '');
    setPreview(slide.image || null);
    setImagen(null);
    setError(null);
    setMensaje(null);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDelete = async (id) => {
    if (!confirm('Eliminar este slide?')) return;

    try {
      await clienteAxios.delete(`/api/sliders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSlides();
    } catch {
      alert('Error al eliminar');
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = slides.findIndex((s) => s.id === active.id);
    const newIndex = slides.findIndex((s) => s.id === over.id);

    const newOrder = arrayMove(slides, oldIndex, newIndex);
    setSlides(newOrder);

    try {
      await clienteAxios.post(
        '/api/sliders/reorder',
        {
          order: newOrder.map((s, index) => ({
            id: s.id,
            position: index + 1,
          })),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch {
      console.error('Error guardando orden');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6">Administrar Slider</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <div>
          <label className="block text-sm font-medium mb-2">Tipo de fondo</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setBackgroundType('image');
                setYoutubeUrl('');
              }}
              className={`px-4 py-2 rounded border ${
                backgroundType === 'image'
                  ? 'bg-[#008DD2] text-white border-[#008DD2]'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              Imagen
            </button>
            <button
              type="button"
              onClick={() => {
                setBackgroundType('youtube');
                setImagen(null);
                setPreview(null);
              }}
              className={`px-4 py-2 rounded border ${
                backgroundType === 'youtube'
                  ? 'bg-[#008DD2] text-white border-[#008DD2]'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              YouTube
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          placeholder="Descripcion"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        {backgroundType === 'image' ? (
          <>
            <label className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#008DD2] transition">
              <ImageIcon className="text-gray-400" />
              <span className="text-sm text-gray-600">
                {editingId ? 'Cambiar imagen (opcional)' : 'Arrastra o haz click para subir una imagen'}
              </span>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImagen(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>

            {preview && (
              <img
                src={preview}
                className="w-full h-48 object-cover rounded-xl border"
              />
            )}
          </>
        ) : (
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        )}

        <div className="flex flex-wrap gap-3">
          <button
            disabled={cargando}
            className="bg-[#008DD2] text-white px-6 py-2 rounded hover:bg-[#0070aa]"
          >
            {cargando ? 'Guardando...' : editingId ? 'Actualizar slide' : 'Crear slide'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50 flex items-center gap-2"
            >
              <X size={16} />
              Cancelar
            </button>
          )}
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
        {mensaje && <p className="text-green-600 text-sm">{mensaje}</p>}
      </form>

      <h3 className="font-semibold mb-4">Orden del slider</h3>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={slides.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {slides.map((slide) => (
              <SortableItem
                key={slide.id}
                slide={slide}
                onDelete={handleDelete}
                onEdit={handleEdit}
                isEditing={editingId === slide.id}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SlidersAdmin;
