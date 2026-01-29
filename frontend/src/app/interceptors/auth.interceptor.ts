import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. Buscamos la caja "User" (que es lo que sale en tu Key)
  const userJson = localStorage.getItem('User'); 
  let token = null;

  // 2. Si existe el usuario, abrimos la caja (JSON.parse) y sacamos el token
  if (userJson) {
    try {
      const userObj = JSON.parse(userJson);
      token = userObj.token; // Aquí es donde está realmente el churro largo
    } catch (e) {
      console.error('Error al leer el usuario', e);
    }
  }

  // --- LOGS PARA CONFIRMAR (Verás que ahora sí sale SÍ) ---
  console.log('🕵️ INTERCEPTOR: ¿Encontré token dentro de User?', token ? 'SÍ ✅' : 'NO ❌');

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};