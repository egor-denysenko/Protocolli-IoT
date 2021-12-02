# Protocolli-IoT-MQTT
# Componenti Gruppo
Davide Viotto davide.viotto@stud.tecnicosuperiorekennedy.it
Egor Denysenko egor.denysenko@stud.tecnicosuperiorekennedy.it
# Http 
Client Davide Viotto 
Server Egor Denysenko

# Gestione Topic 
Abbiamo Optato per un topic unico per mandare al broker un JSON con tutte le informazioni di telemetria del dispositivo.

Il nostro topic tipo per il drone è stato impostato come 
protocolli-IoT/{drone_id}/telemetry/

il payload del topic è un JSON con questo schema:
{
"velocity":float,
"longitude":float,
"latitude":float,
"battery":int,
"timestamp":timestamp
}
