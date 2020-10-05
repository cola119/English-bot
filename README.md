# English Bot Service

### bootstrap

```sh
docker-compose up --build -d
```

### kafka

```sh
# in kafka-docker repo
export HOST_IP=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1) && docker-compose up -d --build
docker-compose scale kafka=2
./start-kafka-shell.sh $HOST_IP ${HOST_IP}:[zookeeper port]

# create topic
$KAFKA_HOME/bin/kafka-topics.sh --create --topic get.message.event --partitions 4 --zookeeper $ZK --replication-factor 2
```

### ngrok

```sh
ngrok http -host-header="0.0.0.0:3001" 3001
```

### nginx

```sh
ssh sakura.com
cd etc/nginx/conf.d/sites-available/
vim english-bot.koheiueno.dev.conf

# kafka-docker
docker-compose up -d --build
docker-compose scale kafka=2
./start-kafka-shell.sh 160.16.68.237 160.16.68.237:[zookeeper port]

# brokers
bash-4.4# broker-list.sh
# 160.16.68.237:32770,160.16.68.237:32768
```
