FROM lewangdev/folotoy-server:23.49.1.2-beta

RUN mkdir /config && mkdir /audio
ADD roles.json /config 

EXPOSE 8085
EXPOSE 80

CMD ["python3", "folotoy/main.py"]
