export default function cloudinaryLoader({ src, width, quality }) {
    const cloudName = 'dtccopacz'; // Replace with your Cloudinary cloud name
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/`;
    const params = `c_limit,w_${width},q_${quality || 'auto'}/`;

    // Remove the base URL if it's already included in the src
    const imagePath = src.replace(baseUrl, '');

    return `${baseUrl}${params}${imagePath}`;
}