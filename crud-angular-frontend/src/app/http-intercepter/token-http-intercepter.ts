import { HttpInterceptorFn } from "@angular/common/http";

export const tokenHttpInterceptor : HttpInterceptorFn = (req, next) => { 
    const token = localStorage.getItem('token');
    console.log("Interceptor token ", token);
    req = req.clone(
       { setHeaders : {
            Authorization: `Bearer ${token}`,
            // "Authorization":"Bearer " +token
        }}
    );
    return next(req);
}