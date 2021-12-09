# Protocolli-IoT-MQTT
# Componenti Gruppo
Davide Viotto davide.viotto@stud.tecnicosuperiorekennedy.it
Egor Denysenko egor.denysenko@stud.tecnicosuperiorekennedy.it
# Http 
Client Davide Viotto 
Server Egor Denysenko

# Gestione Topic 
Abbiamo Optato per un topic unico per mandare al broker un JSON con tutte le informazioni di telemetria del dispositivo.

Il nostro topic tipo per il drone è stato impostato come:
protocolli-IoT/{drone_id}/telemetry/

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
protocolli-IoT/{drone_id}/command

Il drone riceverà la stringa con QoS 1