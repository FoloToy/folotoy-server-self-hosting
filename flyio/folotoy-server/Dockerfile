FROM lewangdev/folotoy-server:23.49.1.2-beta

# Install and Config Mosquitto
RUN apt update && apt-get install -y mosquitto
RUN mkdir -p /etc/mosquitto
ADD mosquitto.conf /etc/mosquitto
ADD acl.conf /etc/mosquitto
ADD passwd /etc/mosquitto
RUN chown -R mosquitto:mosquitto /etc/mosquitto && chmod 600 /etc/mosquitto/acl.conf && chmod 600 /etc/mosquitto/passwd
RUN /usr/bin/mosquitto_passwd -U /etc/mosquitto/passwd

# Config FoloToy Server
RUN mkdir /config && mkdir /audio
ADD roles.json /config 

ADD start.sh /src
RUN chmod +x /src/start.sh

EXPOSE 8085
EXPOSE 8082
EXPOSE 1883

CMD ["./start.sh"]
