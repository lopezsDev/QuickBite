/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://16.16.16.4:8080/api/:path*',
            },
        ]
    },
    // Aquí puedes agregar otras opciones de configuración si lo necesitas
}

module.exports = nextConfig;