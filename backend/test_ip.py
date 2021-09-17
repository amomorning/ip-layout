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
# ************************************************************************************
K = 14
templates = [[(0, 0, 0), (1, 0, 0), (0, 1, 0)],
             [(0, 0, 0), (-1, 0, 0), (0, -1, 0)],
             [(0, 1, 0), (0, 0, 0), (0, -1, 0)],
             [(1, 0, 0), (0, 0, 0), (-1, 0, 0)],
             [(0, 0, 0), (1, 0, 0), (0, 0, 1)],
             [(0, 0, 0), (1, 0, 0), (0, 0, -1)],
             [(0, 0, 0), (-1, 0, 0), (0, 0, 1)],
             [(0, 0, 0), (-1, 0, 0), (0, 0, -1)],
             [(0, 0, 0), (0, 1, 0), (0, 0, 1)],
             [(0, 0, 0), (0, 1, 0), (0, 0, -1)],
             [(0, 0, 0), (0, -1, 0), (0, 0, 1)],
             [(0, 0, 0), (0, -1, 0), (0, 0, -1)],
             [(0, 0, -1), (0, 0, 0), (0, 0, 1)],
             [(0, 0, 0), (0, 0, 1), (0, 0, 2), (0, 1, 0), (0, 1, 1), (0, 1, 2), (0, 2, 0), (0, 2, 1), (0, 2, 2),
              (1, 0, 0), (1, 0, 1), (1, 0, 2), (1, 1, 0), (1, 1, 1), (1, 1, 2), (1, 2, 0), (1, 2, 1), (1, 2, 2),
              (2, 0, 0), (2, 0, 1), (2, 0, 2), (2, 1, 0), (2, 1, 1), (2, 1, 2), (2, 2, 0), (2, 2, 1), (2, 2, 2)]]

print(json.dumps(templates))

assert (K == len(templates))

IPGrid.optimize(P, None, templates, None)
# the same results by Java: testPack/PackCube.java
