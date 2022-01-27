# Architettura del progetto
Abbiamo necessità di tracciare il completamento di certe piste da parte degli
sciatori che partecipano al consorso, ogni partecipante sara munito di un bracialetto che comunica con un totem piazzato verso la fine della pista mediante RFID.

# Soluzioni da ricercare
Permettere l'invio dei dati e la loro sucessiva consultazione da parte dello staff.

# Vincoli presenti
I totem sono disposti in un area in cui non è garantita la loro costante connettività inoltre il dispositivo non è provvisto di tanta potenza computazionale.

# Protocolli Validi per la soluzione 
Sono stati individuati i seguenti protocolli come possibili validi candidati per mandare i dati dal dispositivo al cloud 

## Coap
Coap permette di utilizzare il modello RESTful, questo può rivelarsi utile per capire e differenziare i dati che il dispositivo mette a disposizione come per esempio scan RFID o stato del totem. Ed è anche un protocollo valido per il suo piccolo overhead e la sua innata velocità in quanto utilizza UDP.

Quest'ultimo però è un problema che non possiamo permetterci, in quanto non avendo quella sicurezza che il dato arrivi al cloud,
il cliente potrebbe non avere la sicurezza che il suo tracciato sia stato correttamente inserito all'interno del database.
Proprio per questo Coap verrà scartato nella scelta da ora 
## MQTT
Il protocollo in questione ha il vantaggio di essere pub / sub, ed avere un payload relativamente piccolo ma non quanto Coap, però abbiamo la possibilità di garantire la ricezione del messaggio attraverso il parametro QoS. Anche la presenza di un last will and un last statament ci permette di tracciare in maniera più snella e veloce una disconessione e nel caso fosse prolungata di presumere un malfunzionamento del dispositivo. 

Un motivo che sconsiglierebbe l'uso di MQTT in questo approccio è il fatto che i dati se manca la connessione, non hanno una possibilità sicura di immagazinare i dati e mandarli successivamente come per esempio un sistema di code. per l'uso di mqtt si potrebbe optare per utilizzare un piccolo buffer interno nel dispositivo per ovviare a questo problema, ed non appena la connesione è presente permettere al dispositivo di inviare al cloud.

## AMQP 
Questo protocollo non è il più adatto per essere utilizzato per la communicazione però ci può essere di aiuto all'interno del cloud, in quando ci permette grazie al broker RabbitMQ di gestire sia un sistema di code basate su AMQP, sia di poter essere utilizzato mediante un plugin come broker MQTT, permettendo di poter ricevere e gestire i messaggi inviati dai totem attraverso MQTT.

# Protocolli scelti
Per mandare i messaggi sceglieremo MQTT per la sua velocità e legerezza pensando di accoppiare una coda a livello di totem, mentre per il cloud e per la ricezione dei messaggi optiamo di usare AMQP per la gestione delle informazioni all'interno del cloud e della loro affidabilit.
# Gestione Topic MQTT
Visto che abbiamo più totem presenti sul campo optiamo per un topic unico per ogni totem.

data/totem1/RFIDScan questo topi servira per mandare al cloud l'informazione dello scan RFID che è stato fatto, verrà
mandato con una QoS 2 in modo che arrivi una sola volta al cloud.

## MQTT Last Will Topic & Message
Per capire come diagnostticare eventuali malfunzionamenti o disconessioni del totem, utilizziamo il seguente last will topic per mandare informazioni sul momento in cui è avvenuta la disconnesisone.

status/totem1/disconnection il QoS del last will message lo gesitremo con un QoS 1 visto che non abbiamo l'assoluta necessità di avere solamente un messaggio ma è importante che almeno ne riceviamo uno.

## MQTT Connection message  
Per capire se il problema della disconessione è durato troppo nel tempo, il totem alla connessione manderà un messaggio al topic 
status/totem1/connection per inviare il momento quando la connessione è stata effettuata, anche'esso come il messaggio alla disconnessione viene mandato con una QoS 1, questo grazie al messaggio di disconessione se la disconessione è durata troppo nella logica del cloud sara possibile creare un allert in modo da segnalare questo problema ed andare a fare una suppervisione sul campo.

# Gestione Exchange AMQP

Il tutto verrà gestito da un topic exchange che filtrera per le code in base ai topic dei messaggi MQTT convertiti come descritto nella [documentazione](https://www.rabbitmq.com/mqtt.html#implementation) da / a . es status.totem1.connnection

## Indirizzamento topic exchange
un topic per cui l'exchange filtera sarà data.+.RFIDScan utilizziamo la wild card per ricevere per ora (salvo sucessiva scalibiltà su più impanti si crea un topic più specifico). tutti gli scan e portatli sulla coda totemRFIDScans e tutti all'applicativo che si occupa di salvare sul database.

Un altro topic per la gestione degli statu delle conessioni sara status.+.connection per monitorare le connesioni e salvarle nel db
status.+.disconnection per salvare nel db le disconnessioni.


# Gestione Database.