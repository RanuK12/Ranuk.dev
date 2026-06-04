// =========================================================
// Cloudflare Worker — Security Headers para ranuk.dev
// Deploy: Dashboard → Workers & Pages → Create Worker
// Nombre: ranuk-security-headers
// =========================================================

export default {
  async fetch(request) {
    const response = await fetch(request);
    
    // Clonar la respuesta para poder modificar headers
    const newResponse = new Response(response.body, response);
    
    const securityHeaders = {
      // HSTS — Forzar HTTPS por 2 años
      'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
      
      // Prevenir MIME sniffing
      'X-Content-Type-Options': 'nosniff',
      
      // Prevenir clickjacking
      'X-Frame-Options': 'DENY',
      
      // XSS legacy (0 es la recomendación actual)
      'X-XSS-Protection': '0',
      
      // Controlar referrer
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      
      // Restringir APIs del navegador
      'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), vr=(), battery=()',
      
      // Cross-Origin isolation
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      
      // Content Security Policy
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' https://www.googletagmanager.com https://cdnjs.cloudflare.com https://www.google-analytics.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
        "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://www.google-analytics.com https://vitals.vercel-insights.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self' https://formspree.io mailto:",
        "upgrade-insecure-requests"
      ].join('; '),
      
      // CORS — Solo nuestro dominio (no *)
      'Access-Control-Allow-Origin': 'https://ranuk.dev'
    };
    
    // Aplicar headers de seguridad
    for (const [key, value] of Object.entries(securityHeaders)) {
      newResponse.headers.set(key, value);
    }
    
    // Remover headers sensibles del servidor
    newResponse.headers.delete('X-Powered-By');
    newResponse.headers.delete('Server');
    newResponse.headers.delete('X-AspNet-Version');
    
    return newResponse;
  }
};
