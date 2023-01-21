/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    'MYSQL_HOST': 'localhost',
    'MYSQL_PORT': '3306',
    'MYSQL_DATABASE': 'project-1',
    'MYSQL_USER': 'root',
    'MYSQL_PASSWORD': 'uchihamadara123',
  }
}

module.exports = nextConfig
