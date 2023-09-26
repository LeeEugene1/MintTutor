/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
      appDir: true,
    },
    future:{
      webpack5:true,
    },
    webpack(config){
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs:false,
      }
      return config;
    },
    async rewrites(){
      return [
        {
          source: '/:path*',
          destination:'http://localhost:500/:path*'
        }
      ]
    }
  }

module.exports = nextConfig
