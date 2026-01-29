import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Recuperamos el token del navegador
  // OJO: Asegúrate de que en tu login lo guardaste con el nombre 'token' o 'access_token'
  // Si no estás seguro, mira en tu navegador -> F12 -> Application -> Local Storage
  const token = localStorage.getItem('token'); 

  // 2. Si existe el token, clonamos la petición y le inyectamos la cabecera
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // 3. Enviamos la petición modificada
    return next(cloned);
  }

  // 4. Si no hay token, enviamos la original
  return next(req);
};