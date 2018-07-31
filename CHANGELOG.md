# Registro de cambios
Sistema de archivos administrativos - plantillas formly.



## [1.1.0] - 2017-02-22
### Agregado

- Modelo de datos para registrar la visitas denominado monitoreo.
- Servicios REST:
    - Reporte de documentosmas vistos por mes.
    - Reporte de usuarios que mas documentos ven.
    - Reporte de documentos mas vistos.
    - Reporte de documentos con cite mas vistos por un usuario en especifico.

### Modificado
- Servicios de aprobacion y derivacion, donde ahora se realiza el registro de la visita.
- Servicios de aprobacion y cierre, donde ahora se realiza el registro de la visita.
- Servicio de obtencion del documento por identificador, donde ahora se registra la visita
- La forma de uso de identificadores de direccion y director, estos ahora se deben agregar en el archivo configuracion.
- Se debe agregar una sola vez en el archivo de configuracion, los parametros de cite_ceros (define la cantidad de digitos numericos que posee el cite) y cite_principal (define el cite guia principal).

### Corregido
- Test's unitarios para cada endpoint(Servicios REST)



[1.1.0]: https://gitlab.geo.gob.bo/agetic/plantillas-formly-backend/commits/plantillas-formly_v1.1.0
