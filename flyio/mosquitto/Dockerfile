FROM eclipse-mosquitto

RUN mkdir /etc/mosquitto
ADD mosquitto.conf /etc/mosquitto
ADD acl.conf /etc/mosquitto
ADD passwd /etc/mosquitto

RUN chown -R mosquitto:mosquitto /etc/mosquitto && chmod 600 /etc/mosquitto/acl.conf && chmod 600 /etc/mosquitto/passwd

EXPOSE 1883

CMD ["/usr/sbin/mosquitto", "-c", "/etc/mosquitto/mosquitto.conf"]
