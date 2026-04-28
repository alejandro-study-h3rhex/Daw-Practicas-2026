import { useState } from "react";
import { Button } from "../common/button";

interface TaskFormProps {
    show: boolean;
    onClose: () => void;
    onAddTask: (titulo: string, descripcion?: string, fecha_inicio?: string, fecha_limite?: string) => void;
}

export function TaskForm({ show, onClose, onAddTask }: TaskFormProps) {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_inicio, setFechaInicio] = useState('');
    const [fecha_limite, setFechaLimite] = useState('');

    const handleSubmit = () => {
        if (titulo.trim()) {
            onAddTask(titulo, descripcion || undefined, fecha_inicio || undefined, fecha_limite || undefined);
            setTitulo('');
            setDescripcion('');
            setFechaInicio('');
            setFechaLimite('');
            onClose();
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <h3 className="text-lg font-bold mb-4 text-white">Nueva Tarea</h3>
                <label htmlFor="titulo" className="text-sm text-gray-400 mb-1">Titulo:</label>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-2 mb-2 border rounded bg-gray-700 text-white"
                />
                <label htmlFor="descripcion" className="text-sm text-gray-400 mb-1">Descripción:</label>
                <textarea
                    placeholder="Descripción (opcional)"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full p-2 mb-2 border rounded bg-gray-700 text-white"
                    rows={3}
                />
                <label htmlFor="fecha_inicio" className="text-sm text-gray-400 mb-1">Fecha de inicio:</label>
                <input
                    type="date"
                    placeholder="Fecha de inicio (opcional)"
                    value={fecha_inicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
                />
                <label htmlFor="fecha_limite" className="text-sm text-gray-400 mb-1">Fecha límite:</label>
                <input
                    type="date"
                    placeholder="Fecha límite (opcional)"
                    value={fecha_limite}
                    onChange={(e) => setFechaLimite(e.target.value)}
                    className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
                />
                <div className="flex gap-2">
                    <Button onClick={handleSubmit} className="bg-green-500 text-white hover:bg-green-600 flex-1 cursor-pointer">
                        Añadir
                    </Button>
                    <Button onClick={onClose} className="bg-gray-500 text-white hover:bg-gray-600 flex-1 cursor-pointer">
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
}