.:: Plantillas Formly Backend ::.

A continuación se detalla la actualización de la aplicación.


## A. ACTUALIZACIÓN DE LA APLICACIÓN 24/02/2017


Ingresar al directorio 'plantillas-formly-backend'

Parar el servicio con el siguiente comando:

Ejeutar el siguiente comando:

    git pull origin master

Agregar estos nuevos parametros en los archivos de configuracion en el siguiente directorio __/src/config/config.production.js__ y configurar con los datos correctos:

    sistema:{
      director:1,
      direccion:2,
      cite_ceros:4,
      cite_principal:'AGETIC'
    },

Ejecutar el siguiente comando que realizara la creacion de la tabla monitor.

    npm run crear-tabla

Después iniciar el servicio:

    sudo supervisorctl restart plantillas-backend
