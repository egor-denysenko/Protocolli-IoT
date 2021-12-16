# Protocolli-IoT-MQTT
# Componenti Gruppo
Davide Viotto davide.viotto@stud.tecnicosuperiorekennedy.it
Egor Denysenko egor.denysenko@stud.tecnicosuperiorekennedy.it
# Mqtt 
Client Davide Viotto 
Server Egor Denysenko

# Gestione Parametri Subscribe Server
Il server avra come parametri di default impostati dalla libreria mqtt.js tranne la clean session che la impostiamo a false; 
In questo modo alla disconessione il broker manterrà i messaggio con QoS1 e QoS2 per il server

# Gestione Parametri Subscribe Dispositivi Edge
I dispositivi edge avranno come parametri di connessione di default utilizzati dalla libreria paho-mqtt, a discapito della clean session che la impostiamo a false, in modo da mantenere l'ultimo comando mandato dal server

# Gestione Parametri Publish Server
Il server Pubblica i dati mantenendo una data QoS descritta successivamente nella gestione dei topics 
è mantiene anche una retain session per l'invio per aver la possibilità di ricorstuire lo storico dei comandi all'interno dell'interfaccia web
# Gestione Parametri Publish Dispositivi Edge
Il dispositivo edge ha una retain session a true in modo da poter ricorstuire in tempo "reale" i dati che vengono mandati al database

# Gestione Topic 
Abbiamo Optato per un topic unico per mandare al broker un JSON con tutte le informazioni di telemetria del dispositivo.

Il nostro topic tipo per il drone è stato impostato come:
protocolli-IoT/telemetry/{drone_id}
La QoS del messaggio mandato dall'edge al server è 0

il payload del topic è un JSON con questo schema:
{  
  "velocity":float,
  "longitude":float,
  "latitude":float,
  "battery":int,
  "timestamp":timestamp
}


# Gestione Command
Per la gestione dei comandi da inviare al drone abbiamo optaro di mandare una stringa come messaggio 

Il nostro topic tipo per il drone è stato impostato come
protocolli-IoT/commands/{drone_id}/

Il drone riceverà la stringa con QoS 2

# Gestione Sicurezza Protocollo MQTT
Per migliorare la sicurezza si può pensare di utilizzare la porta 8883 è gestire la comunicazione attraverso SSL, ma non è stata implementata per mancate conoscenze al riguardo.
