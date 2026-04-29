import { useState } from "react";
import { Button } from "../common/button";

interface ProjectFormProps {
    show: boolean;
    onClose: () => void;
    onAddProject: (titulo: string, precio: number, tipo: 'web' | 'mobile' | 'desktop' | 'otro', fecha_inicio?: string, fecha_fin?: string) => void;
}

export function ProjectForm({ show, onClose, onAddProject }: ProjectFormProps) {
    const [titulo, setTitulo] = useState('');
    const [precio, setPrecio] = useState(0);
    const [tipo, setTipo] = useState<'web' | 'mobile' | 'desktop' | 'otro'>('web');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const handleSubmit = () => {
        if (titulo.trim()) {
            onAddProject(titulo, precio, tipo, fechaInicio || undefined, fechaFin || undefined);
            setTitulo('');
            setPrecio(0);
            setTipo('web');
            setFechaInicio('');
            setFechaFin('');
            onClose();
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full mx-4 border">
                <h3 className="text-lg font-bold mb-4 text-card-foreground">Nuevo Proyecto</h3>
                <label htmlFor="titulo" className="text-sm text-muted-foreground mb-1">Titulo:</label>
                <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-2 mb-2 border border-input rounded bg-input text-foreground"
                />
                <label htmlFor="precio" className="text-sm text-muted-foreground mb-1">Precio:</label>
                <input
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(parseInt(e.target.value) || 0)}
                    className="w-full p-2 mb-2 border border-input rounded bg-input text-foreground"
                />
                <label htmlFor="tipo" className="text-sm text-muted-foreground mb-1">Tipo:</label>
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as 'web' | 'mobile' | 'desktop' | 'otro')}
                    className="w-full p-2 mb-2 border border-input rounded bg-input text-foreground"
                >
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="desktop">Desktop</option>
                    <option value="otro">Otro</option>
                </select>
                <label htmlFor="fecha_inicio" className="text-sm text-muted-foreground mb-1">Fecha de inicio (opcional):</label>
                <input
                    type="date"
                    id="fecha_inicio"
                    name="fecha_inicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    className="w-full p-2 mb-2 border border-input rounded bg-input text-foreground"
                />
                <label htmlFor="fecha_fin" className="text-sm text-muted-foreground mb-1">Fecha de fin (opcional):</label>
                <input
                    type="date"
                    id="fecha_fin"
                    name="fecha_fin"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    className="w-full p-2 mb-4 border border-input rounded bg-input text-foreground"
                />
                <div className="flex gap-2">
                    <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1">
                        Añadir
                    </Button>
                    <Button onClick={onClose} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex-1">
                        Cancelar
                    </Button>
                </div>
            </div>
        </div>
    );
}