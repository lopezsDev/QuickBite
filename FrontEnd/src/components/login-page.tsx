'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'  // Importa el hook useRouter
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authenticate } from '@/services/AuthService'
import Link from "next/link";


export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // El token ya se guarda en localStorage dentro de authenticate
            await authenticate({ email, password })
            router.push('/products')
        } catch (error) {
            console.error('Error al autenticar:', error)
            alert('Error al iniciar sesión. Verifica tus credenciales.')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
            {/* Fondo animado y desenfocado */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-black animate-gradient-x"></div>
            <div className="absolute inset-0 backdrop-blur-sm"></div>

            {/* Contenedor del formulario */}
            <div className="z-10 w-full max-w-md p-8 rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                            Correo Electrónico
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="tu@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                            Contraseña
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 transition-colors">
                        Iniciar Sesión
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-400">
                    ¿No tienes una cuenta?{' '}
                    <a href="#" className="text-purple-400 hover:underline">
                        <Link href="/signup">Registrarse</Link>
                    </a>
                </p>
            </div>
        </div>
    )
}
