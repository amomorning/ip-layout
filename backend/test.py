import archijson.geometry as ag
from archijson import ArchiServer, ArchiJSON
from sensitive_info import URL, TOKEN
server = ArchiServer(URL, TOKEN, 'ip')

import IPGrid
import json

DM = 3
P = []  # available cells
mx = 8
my = 6
mz = 14
xx = 6
yy = 3
zz = 8
for x in range(xx):
    for y in range(my):
        for z in range(mz):
            if z > zz - 1 and x > 3 and y < yy:
                continue
            P.append((x, y, z))
for x in range(xx, mx):
    for y in range(yy, my):
        for z in range(zz, mz):
            P.append((x, y, z))

def on_connect():
    print('exchanging')
    server.send('client', {'msg': 'hello'})


def on_receive(id, body):
    print(id)
    print(body)

    archijson = ArchiJSON(body)
    templates = archijson.properties['templates']
    print(templates)
    ks, ps = IPGrid.optimize(P, None, templates, None)

    server.send('client', {'ks': ks, 'ps': ps}, id)

    
    # directly use geom in geometries
    # for geom in archijson.geometries:
    #     print(geom)

server.on_receive = on_receive
server.on_connect = on_connect
