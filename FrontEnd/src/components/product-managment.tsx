'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Product = {
  id: string
  name: string
  price: number
  description: string
}

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', price: 0, description: '' })
  const [searchId, setSearchId] = useState('')
  const [editProduct, setEditProduct] = useState<Product | null>(null)

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    // Recupera el token almacenado en localStorage
    const token = localStorage.getItem('token')

    if (!token) {
      alert('No estás autenticado. Inicia sesión para continuar.')
      return
    }

    // Llamada al API para crear el producto, incluyendo el token en los headers
    const response = await fetch('/api/products/add', {
      method: 'POST',
      body: JSON.stringify(newProduct),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Añadir el token aquí
      },
    })

    if (response.ok) {
      const createdProduct = await response.json()
      setProducts([...products, createdProduct])
      setNewProduct({ name: '', price: 0, description: '' })
    } else {
      console.error('Error al crear el producto:', response.statusText)
      alert('No se pudo crear el producto. Verifica tu autenticación.')
    }
  }


  const handleSearchProduct = async () => {
    // Recupera el token almacenado en localStorage
    const token = localStorage.getItem('token')

    if (!token) {
      alert('No estás autenticado. Inicia sesión para continuar.')
      return
    }

    // Llamada al API para buscar el producto por ID, incluyendo el token en los headers
    const response = await fetch(`/api/products/${searchId}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Añadir el token aquí
      },
    })

    if (response.ok) {
      const product = await response.json()
      setProducts([product])
    } else {
      console.error('Error al buscar el producto:', response.statusText)
      alert('No se pudo encontrar el producto. Verifica tu autenticación.')
    }
  }


  const handleListProducts = async () => {
    // Recupera el token almacenado en localStorage
    const token = localStorage.getItem('token')

    if (!token) {
      alert('No estás autenticado. Inicia sesión para continuar.')
      return
    }

    // Llamada al API para listar todos los productos, incluyendo el token en los headers
    const response = await fetch('/api/products/allproducts', {
      headers: {
        'Authorization': `Bearer ${token}`, // Añadir el token aquí
      },
    })

    if (response.ok) {
      const productList = await response.json()
      setProducts(productList)
    } else {
      console.error('Error al listar los productos:', response.statusText)
      alert('No se pudo obtener la lista de productos. Verifica tu autenticación.')
    }
  }


  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editProduct) return

    // Recupera el token almacenado en localStorage
    const token = localStorage.getItem('token')

    if (!token) {
      alert('No estás autenticado. Inicia sesión para continuar.')
      return
    }

    // Llamada al API para modificar el producto, incluyendo el token en los headers
    const response = await fetch(`/api/products/${editProduct.id}`, {
      method: 'PUT',
      body: JSON.stringify(editProduct),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Añadir el token aquí
      },
    })

    if (response.ok) {
      const updatedProduct = await response.json()
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
      setEditProduct(null)
    } else {
      console.error('Error al editar el producto:', response.statusText)
      alert('No se pudo editar el producto. Verifica tu autenticación.')
    }
  }


  const handleDeleteProduct = async (id: string) => {
    // Recupera el token almacenado en localStorage
    const token = localStorage.getItem('token')

    if (!token) {
      alert('No estás autenticado. Inicia sesión para continuar.')
      return
    }

    // Llamada al API para eliminar el producto, incluyendo el token en los headers
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Añadir el token aquí
      },
    })

    if (response.ok) {
      setProducts(products.filter(p => p.id !== id))
    } else {
      console.error('Error al eliminar el producto:', response.statusText)
      alert('No se pudo eliminar el producto. Verifica tu autenticación.')
    }
  }


  return (
      <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-400">Gestión de Productos</h1>
        <Tabs defaultValue="create" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="create" className="bg-gray-800 text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">Crear</TabsTrigger>
            <TabsTrigger value="search" className="bg-gray-800 text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">Buscar</TabsTrigger>
            <TabsTrigger value="list" className="bg-gray-800 text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">Listar</TabsTrigger>
            <TabsTrigger value="edit" className="bg-gray-800 text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">Modificar</TabsTrigger>
            <TabsTrigger value="delete" className="bg-gray-800 text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white">Eliminar</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400">Crear Producto</CardTitle>
                <CardDescription className="text-gray-400">Añade un nuevo producto al inventario.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateProduct} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-200">Nombre</Label>
                    <Input
                        id="name"
                        value={newProduct.name}
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-gray-200">Precio</Label>
                    <Input
                        id="price"
                        type="text"
                        value={newProduct.price}
                        onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                        className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-200">Descripción</Label>
                    <Input
                        id="description"
                        value={newProduct.description}
                        onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">Crear Producto</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="search">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400">Buscar Producto</CardTitle>
                <CardDescription className="text-gray-400">Busca un producto por su ID.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                      value={searchId}
                      onChange={e => setSearchId(e.target.value)}
                      placeholder="ID del producto"
                      className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Button onClick={handleSearchProduct} className="bg-purple-600 hover:bg-purple-700 text-white">Buscar</Button>
                </div>

                {/* Mostrar el producto encontrado */}
                {products.length > 0 && (
                    <div className="mt-4">
                      <h2 className="text-2xl text-gray-200">Producto Encontrado:</h2>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b border-gray-700">
                            <TableHead className="text-gray-300">ID</TableHead>
                            <TableHead className="text-gray-300">Nombre</TableHead>
                            <TableHead className="text-gray-300">Precio</TableHead>
                            <TableHead className="text-gray-300">Descripción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map(product => (
                              <TableRow key={product.id} className="border-b border-gray-700">
                                <TableCell className="text-gray-300">{product.id}</TableCell>
                                <TableCell className="text-gray-300">{product.name}</TableCell>
                                <TableCell className="text-gray-300">{product.price}</TableCell>
                                <TableCell className="text-gray-300">{product.description}</TableCell>
                              </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400">Listar Productos</CardTitle>
                <CardDescription className="text-gray-400">Ver todos los productos en el inventario.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleListProducts} className="mb-4 bg-purple-600 hover:bg-purple-700 text-white">Cargar Productos</Button>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-700">
                      <TableHead className="text-gray-300">ID</TableHead>
                      <TableHead className="text-gray-300">Nombre</TableHead>
                      <TableHead className="text-gray-300">Precio</TableHead>
                      <TableHead className="text-gray-300">Descripción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map(product => (
                        <TableRow key={product.id} className="border-b border-gray-700">
                          <TableCell className="text-gray-300">{product.id}</TableCell>
                          <TableCell className="text-gray-300">{product.name}</TableCell>
                          <TableCell className="text-gray-300">{product.price}</TableCell>
                          <TableCell className="text-gray-300">{product.description}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="edit">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400">Modificar Producto</CardTitle>
                <CardDescription className="text-gray-400">Actualiza la información de un producto existente.</CardDescription>
              </CardHeader>
              <CardContent>
                {editProduct ? (
                    <form onSubmit={handleEditProduct} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-name" className="text-gray-200">Nombre</Label>
                        <Input
                            id="edit-name"
                            value={editProduct.name}
                            onChange={e => setEditProduct({...editProduct, name: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-price" className="text-gray-200">Precio</Label>
                        <Input
                            id="edit-price"
                            type="number"
                            value={editProduct.price}
                            onChange={e => setEditProduct({...editProduct, price: Number(e.target.value)})}
                            className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-description" className="text-gray-200">Descripción</Label>
                        <Input
                            id="edit-description"
                            value={editProduct.description}
                            onChange={e => setEditProduct({...editProduct, description: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">Guardar Cambios</Button>
                    </form>
                ) : (
                    <div>
                      <p className="text-gray-300 mb-4">Selecciona un producto para editar:</p>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-b border-gray-700">
                            <TableHead className="text-gray-300">ID</TableHead>
                            <TableHead className="text-gray-300">Nombre</TableHead>
                            <TableHead className="text-gray-300">Acción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map(product => (
                              <TableRow key={product.id} className="border-b border-gray-700">
                                <TableCell className="text-gray-300">{product.id}</TableCell>
                                <TableCell className="text-gray-300">{product.name}</TableCell>
                                <TableCell>
                                  <Button onClick={() => setEditProduct(product)} className="bg-purple-600 hover:bg-purple-700 text-white">Editar</Button>
                                </TableCell>
                              </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="delete">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-400">Eliminar Producto</CardTitle>
                <CardDescription className="text-gray-400">Elimina un producto del inventario.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-700">
                      <TableHead className="text-gray-300">ID</TableHead>
                      <TableHead className="text-gray-300">Nombre</TableHead>
                      <TableHead className="text-gray-300">Acción</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map(product => (
                        <TableRow key={product.id} className="border-b border-gray-700">
                          <TableCell className="text-gray-300">{product.id}</TableCell>
                          <TableCell className="text-gray-300">{product.name}</TableCell>
                          <TableCell>
                            <Button
                                variant="destructive"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Eliminar
                            </Button>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}