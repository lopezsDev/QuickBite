import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-4">
            <main className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-6 text-purple-400">Bienvenido a QuickBite</h1>
                <p className="text-xl mb-8">Tu supermercado en línea de confianza</p>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-purple-300">¿Por qué elegir QuickBite?</h2>
                    <ul className="text-left list-disc list-inside mb-4">
                        <li>Entrega rápida en menos de 30 minutos</li>
                        <li>Amplia selección de productos frescos y de calidad</li>
                        <li>Ofertas exclusivas para miembros</li>
                        <li>Servicio al cliente 24/7</li>
                    </ul>
                    <p className="italic text-gray-400">
                        &apos;QuickBite ha revolucionado la forma en que hago mis compras. ¡Es rápido, conveniente y los productos siempre son de primera calidad!&apos; - Cliente satisfecho
                    </p>
                </div>

                <div className="flex justify-center space-x-4">
                    <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2">
                        <Link href="/login">Iniciar Sesión</Link>
                    </Button>
                    <Button asChild className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
                        <Link href="/signup">Registrarse</Link>
                    </Button>
                </div>
            </main>

            <footer className="mt-12 text-gray-400 text-sm">
                <p>&copy; 2023 QuickBite. Todos los derechos reservados.</p>
            </footer>
        </div>
    )
}
