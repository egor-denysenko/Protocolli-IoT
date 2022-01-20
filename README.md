# Protocolli-IoT-MQTT
# Componenti Gruppo
Davide Viotto davide.viotto@stud.tecnicosuperiorekennedy.it
Egor Denysenko egor.denysenko@stud.tecnicosuperiorekennedy.it
# AMQP 
Client Davide Viotto 
Server Egor Denysenko

# Implementazione AMQP Lato Drone
Lato edge applichiamo una coda lato applicativo e dopo un sucessivo processo 
si occupera di spedire il dato anche qui attraverso amqp verso il cloud, questa
scelta seppur non ottimale è utile nel momento in cui dobbiamo andare a simulare 
entrambi i casi in maniera didattica.

exchange bufferAMQP: droneBuffer

routing key: droneBuffer

tipo di coda utilizzata: Direct 
la scelta è stata fatta principalmente lato didattico in quanto ci ritroviamo con un drone unico 
e simuliamo nel cloud la coda del drone.

# Implementazione AMQP Lato Cloud 
Lato cloud anche qui utilizziamo un coda per poter ricevere i dati, in quanto il drone non mandera 
direttamente i dati al server in cloud ma prima li mandiamo attraverso AMQP (anchessa scelta non ottimale 
in quanto si sarebbe potuto optare per un protocollo MQTT) verso l'exchange protocolliIoTAMQP anch'essa di 
tipo direct, con routing key droneTelemetry.

# Invio Comandi Drone
Partendo da un eventuale applicativo web o da un api le potenziali opzioni disponibili sono:
- Creare un exchange direct che va a filtrare i comandi con una routing key basata sul drone, in modo da centralizzare una coda per ogni drone

# Parametri Gestione Comandi Drone
Abbiamo utilizzato un exchange direct di nome droneCommand ed in base alla key andremo a creare una nuova coda per il drone se mancante, 
ed andremmo ad inserire il messaggio attraverso la routing key che rappresentera il nome del drone