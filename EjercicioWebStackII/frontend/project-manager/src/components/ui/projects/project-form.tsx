import { useState } from "react";
import { Button } from "../common/button";

interface ProjectFormProps {
    show: boolean;
    onClose: () => void;
    onAddProject: (titulo: string, precio: number, tipo: 'web' | 'mobile' | 'desktop' | 'otro') => void;
}

export function ProjectForm({ show, onClose, onAddProject }: ProjectFormProps) {
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState(0);
    const [tipo, setTipo] = useState<'web' | 'mobile' | 'desktop' | 'otro'>('web');

    const handleSubmit = () => {
        if (titulo.trim()) {
            onAddProject(titulo, precio, tipo);
            setTitulo('');
            setPrecio(0);
            setTipo('web');
            onClose();
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                <h3 className="text-lg font-bold mb-4 text-white">Nuevo Proyecto</h3>
                <label htmlFor="titulo" className="text-sm text-gray-400 mb-1">Titulo:</label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-2 mb-2 border rounded bg-gray-700 text-white"
                />
                <label htmlFor="precio" className="text-sm text-gray-400 mb-1">Precio:</label>
                <input
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(parseInt(e.target.value) || 0)}
                    className="w-full p-2 mb-2 border rounded bg-gray-700 text-white"
                />
                <label htmlFor="tipo" className="text-sm text-gray-400 mb-1">Tipo:</label>
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as 'web' | 'mobile' | 'desktop' | 'otro')}
                    className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
                >
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="desktop">Desktop</option>
                    <option value="otro">Otro</option>
                </select>
                <div className="flex gap-2">
                    <Button onClick={handleSubmit} className="bg-green-500 text-white hover:bg-green-600 flex-1">
                        Añadir
                    </Button>
                    <Button onClick={onClose} className="bg-gray-500 text-white hover:bg-gray-600 flex-1">
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
}