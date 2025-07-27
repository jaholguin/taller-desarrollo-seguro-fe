import { useEffect, useState, useCallback } from 'react';

type NotesProps = { token: string };
type Note = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    grade: number | null;
};

function Notes({ token }: NotesProps) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [grade, setGrade] = useState<number | ''>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedGrade, setEditedGrade] = useState<number | ''>('');
    const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);

    // 1) Memoizamos fetchNotes
    const fetchNotes = useCallback(async () => {
        const res = await fetch('http://localhost:3000/api/notes', {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
            setNotes(await res.json());
        }
    }, [token]);

    // 2) Lo llamamos en useEffect sin warnings
    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const handleCreate = async () => {
        await fetch('http://localhost:3000/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                content,
                grade: grade === '' ? null : grade
            })
        });
        setTitle('');
        setContent('');
        setGrade('');
        await fetchNotes();
    };

    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        await fetchNotes();
    };

    const startEditing = (note: Note) => {
        setEditingNoteId(note.id);
        setEditedTitle(note.title);
        setEditedContent(note.content);
        setEditedGrade(note.grade ?? '');
        setIsEditingModalOpen(true);
    };

    const handleUpdate = async () => {
        if (editingNoteId === null) return;
        await fetch(`http://localhost:3000/api/notes/${editingNoteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                title: editedTitle,
                content: editedContent,
                grade: editedGrade === '' ? null : editedGrade
            })
        });
        setEditingNoteId(null);
        setEditedTitle('');
        setEditedContent('');
        setEditedGrade('');
        setIsEditingModalOpen(false);
        await fetchNotes();
    };

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* FORMULARIO HORIZONTAL DE CREACIÓN */}
            <div
                style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '16px',
                    alignItems: 'flex-start'
                }}
            >
                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={{ flex: 1, padding: '8px' }}
                />
                <input
                    type="text"
                    placeholder="Contenido"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    style={{ flex: 1, padding: '8px' }}
                />
                <input
                    type="number"
                    placeholder="Calificación"
                    value={grade}
                    onChange={e => setGrade(Number(e.target.value))}
                    style={{ width: '120px', padding: '8px' }}
                />
                <button
                    onClick={handleCreate}
                    style={{
                        backgroundColor: '#807e7e',
                        color: '#fff',
                        border: 'none',
                        padding: '8px 16px',
                        cursor: 'pointer'
                    }}
                >
                    Crear Nota
                </button>
            </div>
            <div className="divider" />

            {/* BUSCADOR + CONTADOR */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px',
                    gap: '8px'
                }}
            >
                <label style={{ marginRight: '8px' }}>Buscar Nota:</label>
                <input
                    type="text"
                    placeholder="Buscar nota por título o contenido"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: '8px' }}
                />
                <span style={{ fontWeight: 'bold' }}>
                    Total notas: {filteredNotes.length}
                </span>
            </div>
            <div className="divider" />

            {/* TABLA DE NOTAS */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th style={{ textAlign: 'center', padding: '8px' }}>Título</th>
                        <th style={{ textAlign: 'center', padding: '8px' }}>Contenido</th>
                        <th style={{ textAlign: 'center', padding: '8px' }}>Calificación</th>
                        <th style={{ textAlign: 'center', padding: '8px' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredNotes.map(note => (
                        <tr key={note.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '8px' }}>{note.title}</td>
                            <td style={{ padding: '8px' }}>{note.content}</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>{note.grade ?? 'N/A'}</td>
                            <td style={{ padding: '8px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                <button
                                    onClick={() => startEditing(note)}
                                    style={{ backgroundColor: '#807e7e', color: '#fff', padding: '4px 8px' }}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(note.id)}
                                    style={{ backgroundColor: '#807e7e', color: '#fff', padding: '4px 8px' }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <div className="divider" />
            {isEditingModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0, left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 999
                    }}
                    onClick={() => setIsEditingModalOpen(false)}
                >
                    <div
                        style={{
                            background: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '400px',
                            boxSizing: 'border-box',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Editar Nota</h2>

                        <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
                            Título:
                            <input
                                type="text"
                                value={editedTitle}
                                onChange={e => setEditedTitle(e.target.value)}
                                style={{
                                    width: '360px',
                                    padding: '8px',
                                    marginTop: '4px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </label>

                        <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '12px' }}>
                            Contenido:
                            <textarea
                                value={editedContent}
                                onChange={e => setEditedContent(e.target.value)}
                                style={{
                                    width: '360px',
                                    height: '100px',
                                    padding: '8px',
                                    marginTop: '4px',
                                    boxSizing: 'border-box',
                                    resize: 'vertical'
                                }}
                            />
                        </label>

                        <label style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
                            Calificación:
                            <input
                                type="number"
                                value={editedGrade}
                                onChange={e => setEditedGrade(Number(e.target.value))}
                                style={{
                                    width: '360px',
                                    padding: '8px',
                                    marginTop: '4px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </label>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
                            <button
                                onClick={handleUpdate}
                                style={{
                                    backgroundColor: '#333',
                                    color: '#fff',
                                    padding: '8px 16px'
                                }}
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setIsEditingModalOpen(false)}
                                style={{
                                    backgroundColor: '#eee',
                                    color: '#333',
                                    padding: '8px 16px'
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notes;
