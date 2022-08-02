Lo hice directamente con pm2 ya que por parámetro te deja poner si se desea que sea modo fork o modo cluster.

Generamos 4 clusters en 8082, 8083, 8084 y 8085

```console

┬─[kirk6@DESKTOP-5S9A20K MINGW64 /d/Proyectos/Desafio15]
╰─>$ pm2 start server.js --name="cluster8082" --watch -i 2  -- -p 8082

┬─[kirk6@DESKTOP-5S9A20K MINGW64 /d/Proyectos/Desafio15]
╰─>$ pm2 start server.js --name="cluster8083" --watch -i 2  -- -p 8083

┬─[kirk6@DESKTOP-5S9A20K MINGW64 /d/Proyectos/Desafio15]
╰─>$ pm2 start server.js --name="cluster8084" --watch -i 2  -- -p 8084

┬─[kirk6@DESKTOP-5S9A20K MINGW64 /d/Proyectos/Desafio15]
╰─>$ pm2 start server.js --name="cluster8085" --watch -i 2  -- -p 8085

```

Comprobamos la lista:

```console

┬─[kirk6@DESKTOP-5S9A20K MINGW64 /d/Proyectos/Desafio15]
╰─>$ pm2 list
┌─────┬──────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name             │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼──────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ cluster8082    │ default     │ 1.0.0   │ cluster │ 3364    │ 27s    │ 1    │ online    │ 0%       │ 70.0mb   │ kirk6  │ enabled  │
│ 1   │ cluster8082    │ default     │ 1.0.0   │ cluster │ 13888    │ 27s    │ 1    │ online    │ 0%       │ 70.2mb   │ kirk6  │ enabled  │
│ 2   │ cluster8083    │ default     │ 1.0.0   │ cluster │ 17392    │ 20s    │ 1    │ online    │ 0%       │ 69.5mb   │ kirk6  │ enabled  │
│ 3   │ cluster8083    │ default     │ 1.0.0   │ cluster │ 8704    │ 20s    │ 1    │ online    │ 0%       │ 69.6mb   │ kirk6  │ enabled  │
│ 4   │ cluster8084    │ default     │ 1.0.0   │ cluster │ 2308    │ 15s    │ 0    │ online    │ 0%       │ 70.6mb   │ kirk6  │ enabled  │
│ 5   │ cluster8084    │ default     │ 1.0.0   │ cluster │ 16356    │ 15s    │ 0    │ online    │ 0%       │ 70.7mb   │ kirk6  │ enabled  │
│ 6   │ cluster8085    │ default     │ 1.0.0   │ cluster │ 8416    │ 5s    │ 0    │ online    │ 0%       │ 70.5mb   │ kirk6  │ enabled  │
│ 7   │ cluster8085    │ default     │ 1.0.0   │ cluster │ 12960    │ 5s    │ 0    │ online    │ 0%       │ 71.1mb   │ kirk6  │ enabled  │
└─────┴──────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘

```

Nueva configuracion del nginx config para cuando se vaya a /test/random que vaya a /test/randoms de los servidores cluster.

```console

events {
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    
    upstream desafio {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
    }
    server {
        listen 8080;
        location /desafio14/api/random/ {
            proxy_pass http://desafio/api/randoms/;
        }
    }

}

```