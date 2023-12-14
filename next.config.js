/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {hostname: "images.unsplash.com"}
        ]
    },
    compiler:
    {
        styledComponents: true
    }
}

module.exports = nextConfig
