FROM nginx:alpine
# Copia solo i file necessari per la produzione
COPY ./index.html /usr/share/nginx/html/
COPY ./css/ /usr/share/nginx/html/css/
COPY ./js/ /usr/share/nginx/html/js/
COPY ./img/ /usr/share/nginx/html/img/
# Se hai altri asset come font, etc.
# COPY ./fonts/ /usr/share/nginx/html/fonts/

# Configurazione per SPA (opzionale)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80