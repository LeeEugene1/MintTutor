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
          source: '/auth',
          destination:'http://localhost:500/auth'
        },
        {
          source: '/klipResult',
          destination:'http://localhost:500/klipResult'
        },
        {
          source: '/chat',
          destination:'https://api.openai.com/v1/completions'
        },
      ]
    }
  }

module.exports = nextConfig
