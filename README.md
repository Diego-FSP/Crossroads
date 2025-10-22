# Crossroads
 App para planificar viajes

# Diagrama de Base de Datos
```mermaid
erDiagram

    BARRIO{
        int idBarrio PK
        string nombre
    }
    HOTEL{
        int idHotel PK
        int idBarrio FK
        string Nombre
        string descripccion
        int CalificacionPromedio
        string IMG
    }
    TIPO_HABITACION{
        int idTipoHabitacion PK
        int idHotel FK
        string nombre
        string descripccion
        int cantidadPersonas
        int metroscuadrados
        double precio
    }
    SERVICIO{
        int idServicio  PK
        int idHotel FK
        bool Wifi
        bool Pileta
        bool Restaurante
        bool Mascota
        bool CancelacionSinCargo
        bool Desayuno
        bool Terraza
    }
    CALIFICACION{
        int idCalificacion PK
        int idHotel FK
        int idUsuario FK
        string comentario
        int Estrellas
    }
    HABITACION {
        int idHabitacion PK
        int idTipoHabitacion FK
        int numero
        string tipo
        double precio
    }
    RESERVA{
        int idReserva PK
        date fechaInicio
        date fechaFin
        string estado
        int idUsuario FK
        int idHabitacion FK
        int idEstado FK
    }
    ESTADO_RESERVA{
        int idEstado PK
        string nombre
        string descripccion
    }
    USUARIO{
        int idUsuario PK
        string nombre
        string email
        string contrasenia
        int telefono
        int documento
    }

    HISTORIAL{
        int idHistorial PK
        int idUsuario FK
        datetime fecha_guardado
    }
    BARRIO ||--o{ HOTEL : contains
    HOTEL||--o{TIPO_HABITACION:has
    TIPO_HABITACION||--o{HABITACION:has
    USUARIO ||--o{ RESERVA : makes
    USUARIO ||--o{ HISTORIAL: saves
    USUARIO ||--o{CALIFICACION: saves
    HABITACION ||--o{ RESERVA : booked_in
    HOTEL ||--||SERVICIO: saves
    HOTEL ||--o{CALIFICACION: saves
    ESTADO_RESERVA||--||RESERVA:saves
```

# Diagrama de Clases

```mermaid
classDiagram
direction RL

    class Barrio{
    + int idBarrio
    + string nombre
    + list|Hotel| Hoteles
    }

    class Hotel{
    + int idHotel
    + int idBarrio
    + string nombre
    + string descripcion
    + int CalificacionPromedio
    }
```