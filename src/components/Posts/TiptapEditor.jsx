import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import "./TiptapEditor.css";

const ToolbarBtn = ({ active, onClick, children, title }) => (
    <button
        type="button"
        title={title}
        onClick={onClick}
        className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors ${
            active
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
        }`}
    >
        {children}
    </button>
);

const Divider = () => <div className="w-px h-6 bg-slate-300 mx-1 self-center" />;

const Toolbar = ({ editor }) => {
    if (!editor) return null;

    const addLink = () => {
        const url = window.prompt("URL del enlace:");
        if (!url) return;
        editor.chain().focus().setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-slate-50">
            {/* Formato de texto */}
            <ToolbarBtn
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
                title="Negrita"
            >
                <strong>B</strong>
            </ToolbarBtn>
            <ToolbarBtn
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title="Cursiva"
            >
                <em>I</em>
            </ToolbarBtn>
            <ToolbarBtn
                active={editor.isActive("strike")}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                title="Tachado"
            >
                <s>S</s>
            </ToolbarBtn>

            <Divider />

            {/* Encabezados */}
            <ToolbarBtn
                active={editor.isActive("heading", { level: 1 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                title="Título 1"
            >
                H1
            </ToolbarBtn>
            <ToolbarBtn
                active={editor.isActive("heading", { level: 2 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                title="Título 2"
            >
                H2
            </ToolbarBtn>
            <ToolbarBtn
                active={editor.isActive("heading", { level: 3 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                title="Título 3"
            >
                H3
            </ToolbarBtn>

            <Divider />

            {/* Listas */}
            <ToolbarBtn
                active={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title="Lista con viñetas"
            >
                • Lista
            </ToolbarBtn>
            <ToolbarBtn
                active={editor.isActive("orderedList")}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                title="Lista numerada"
            >
                1. Lista
            </ToolbarBtn>

            <Divider />

            {/* Blockquote */}
            <ToolbarBtn
                active={editor.isActive("blockquote")}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                title="Cita"
            >
                ❝
            </ToolbarBtn>

            {/* Separador horizontal */}
            <ToolbarBtn
                active={false}
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                title="Línea separadora"
            >
                —
            </ToolbarBtn>

            {/* Link */}
            <ToolbarBtn
                active={editor.isActive("link")}
                onClick={addLink}
                title="Insertar enlace"
            >
                🔗
            </ToolbarBtn>

            <Divider />

            {/* Alineación */}
            <ToolbarBtn
                active={editor.isActive({ textAlign: "left" })}
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                title="Alinear izquierda"
            >
                ≡←
            </ToolbarBtn>
            <ToolbarBtn
                active={editor.isActive({ textAlign: "center" })}
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                title="Centrar"
            >
                ≡↔
            </ToolbarBtn>
            <ToolbarBtn
                active={editor.isActive({ textAlign: "right" })}
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                title="Alinear derecha"
            >
                ≡→
            </ToolbarBtn>

            <Divider />

            {/* Deshacer / Rehacer */}
            <ToolbarBtn
                active={false}
                onClick={() => editor.chain().focus().undo().run()}
                title="Deshacer"
            >
                ↩
            </ToolbarBtn>
            <ToolbarBtn
                active={false}
                onClick={() => editor.chain().focus().redo().run()}
                title="Rehacer"
            >
                ↪
            </ToolbarBtn>
        </div>
    );
};

/**
 * TiptapEditor — editor WYSIWYG reutilizable.
 *
 * Props:
 *   value      string  — contenido HTML inicial
 *   onChange   fn      — recibe el HTML resultante cada vez que cambia
 *   placeholder string — texto de placeholder
 *   minHeight  string  — altura mínima del área editable (default "200px")
 */
export default function TiptapEditor({
    value = "",
    onChange,
    placeholder = "Escribe aquí...",
    minHeight = "200px",
}) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Link.configure({ openOnClick: false }),
        ],
        content: value,
        onUpdate({ editor }) {
            onChange?.(editor.getHTML());
        },
    });

    // Sincronizar valor externo (por ej. cuando carga datos de la API)
    useEffect(() => {
        if (!editor) return;
        if (editor.getHTML() !== value) {
            editor.commands.setContent(value || "", false);
        }
    }, [value, editor]);

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <Toolbar editor={editor} />
            <EditorContent
                editor={editor}
                className="prose max-w-none p-4 bg-white focus-within:outline-none"
                style={{ minHeight }}
            />
        </div>
    );
}
