'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { register } from '@/services/AuthService'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            // Enviar los datos de registro al backend
            await register(formData)
            // Redirigir al usuario a la página de inicio de sesión
            router.push('/login')
        } catch (error) {
            console.error('Error al registrar usuario:', error)
            // Mostrar un mensaje de error al usuario
            alert('Error al registrar usuario. Inténtalo de nuevo.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-4">
            <Card className="w-full max-w-md bg-gray-800 text-gray-100">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-purple-400">Regístrate en QuickBite</CardTitle>
                    <CardDescription className="text-center text-gray-400">
                        Crea tu cuenta para empezar a disfrutar de entregas rápidas y productos frescos
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-sm font-medium text-gray-200">
                                    Nombre
                                </Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Juan"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-sm font-medium text-gray-200">
                                    Apellido
                                </Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Pérez"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-200">
                                Correo Electrónico
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="juan@ejemplo.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-200">
                                Contraseña
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                            />
                        </div>
                        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                            Crear Cuenta
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-400">
                        ¿Ya tienes una cuenta?{' '}
                        <Link href="/login" className="text-purple-400 hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}