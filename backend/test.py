import archijson.geometry as ag
from archijson import ArchiServer, ArchiJSON
from sensitive_info import URL, TOKEN
server = ArchiServer(URL, TOKEN, 'ip')

import IPGrid
import json

DM = 3

def on_connect():
    print('exchanging')
    server.send('client', {'msg': 'hello'})


def on_receive(id, body):
    print(id)
    print(body)

    archijson = ArchiJSON(body)
    templates = archijson.properties['templates']
    domain = list(map(tuple, archijson.properties['domain']))
    print(templates)
    print(domain)

    ks, ps = IPGrid.optimize(domain, None, templates, None)

    server.send('client', {'ks': ks, 'ps': ps}, id)


server.on_receive = on_receive
server.on_connect = on_connect
