# Todas las visualizaciones a mostrar se encuentran en la pagina “Proyecto”

### Visualización 1 (Felipe Bustos). Esta visualización atomica busca complementar la narración con un mapa de distribución de los gatos para que quien visite conozca qué regiones habita cada gato. La dimensión que apuntamos en comunicar es situa al usuario en un espacio donde los gatos cohabitan, en este caso las regiones de Chile. 
Base de datos: 
https://drive.google.com/file/d/193TOIpwl7lGsd3QU331KsFkoX7yid-z1/view?usp=sharing 
https://drive.google.com/file/d/13rwYl4jiIHA_7hm6lAB7ohxsog3-QRAT/view?usp=sharing 

- Código VIS1: 
crear base de datos csv (proceso explicado en README y scripts)

import pandas as pd
import plotly.express as px

cargar csv 
csv_path = '/content/drive/MyDrive/datos_gatos_latitudes.csv'
df = pd.read_csv(csv_path)

crear puntitos en el mapa
fig = px.scatter_mapbox(df, lat="Latitud", lon="Longitud", text="Region", color="Gato", labels={"Gato": "Categoría"})

arreglar el diseño del mapa segun la pagina de plotly, cambiar el diseño del ciculo a un gato
update: no pude actualizar el circulo a un gato, no supe cómo
fig.update_traces(marker=dict(size=10, opacity=0.7))
fig.update_layout(mapbox_style="open-street-map",mapbox_center={"lat": -30.0, "lon": -70.0}, mapbox_zoom=5,)

guardar el resultado en un html descargable
fig.write_html("mapa_de_gatos.html")




import pandas as pd

Datos de las regiones
regiones = [
    ("Arica y Parinacota", -18.4746, -70.29792),
    ("Tarapaca", -20.2439, -70.1389),
    ("Antofagasta", -23.6508, -70.3950),
    ("Atacama", -27.0658, -70.8258),
    ("Coquimbo", -29.9708, -71.3069),
    ("Valparaiso", -33.0333, -71.6667),
    ("Metropolitana", -33.4372, -70.6572),
    ("O'Higgins", -34.1619, -70.7408),
    ("Maule", -35.4228, -71.6569),
    ("Nuble", -36.6008, -72.1089),
    ("Biobio", -36.8150, -73.0289),
    ("La Araucania", -38.7269, -72.5989),
    ("Los Rios", -39.8142, -73.2458),
    ("Los Lagos", -41.4539, -72.9928),
    ("Aysen", -45.4119, -72.6978),
    ("Magallanes", -53.1478, -70.9069),
]

Datos de los gatos y sus regiones
gatos = {
    "Leopardus colocola": ["Tarapaca", "Coquimbo", "Valparaiso", "Metropolitana", "O'Higgins", "Maule", "Nuble", "Biobio", "La Araucania", "Los Rios", "Los Lagos", "Aysen", "Magallanes"],
    "Leopardus geoffroyi": ["Magallanes", "Aysen"],
    "Leopardus guigna": ["Coquimbo", "Valparaiso", "Metropolitana", "O'Higgins", "Maule", "Nuble", "Biobio", "La Araucania", "Los Rios", "Los Lagos", "Aysen"],
    "Leopardus jacobita": ["Arica y Parinacota", "Tarapaca", "Antofagasta"],
    "Puma concolor": ["Arica y Parinacota", "Tarapaca", "Antofagasta", "Atacama", "Coquimbo", "Valparaiso", "Metropolitana", "O'Higgins", "Maule", "Nuble", "Biobio", "La Araucania", "Los Rios", "Los Lagos", "Aysen", "Magallanes"],
}
organizar los datos por filas de tipo de gato, region, latitud y longitud (es el formato pedido por plotly)
data = {"Gato": [], "Region": [], "Latitud": [], "Longitud": []}

for gato, regiones_gato in gatos.items():
    for region in regiones_gato:
        nombre_region, lat, lon = next(((nombre, lat, lon) for nombre, lat, lon in regiones if nombre == region), (None, None, None))
        if nombre_region is not None:
            data["Gato"].append(gato)
            data["Region"].append(region)
            data["Latitud"].append(lat)
            data["Longitud"].append(lon)

df = pd.DataFrame(data)
df.to_csv('datos_gatos_latitudes.csv', index=False)



### Visualización 2 (Catalina Aliste). De las regiones mostradas en el mapa anterior es posible determinar el uso diario del territorio en kilometros cuadrados. Así como las personas habitan espacios dentro de su rutina los félinos también recorren kilometros en busqueda de comida, para marcar territorio, delimitar sus guaridas o nidales. La dimensión que apuntamos en comunicar es el promedio de uso diario del territorio que los felinos recorren. 

Base de datos: Extraída de papers y presentada entregas anteriores
VERDE: Especie "casi amenazada" (NT)
AMARILLO: Especie "vulnerable" (VU)
NARANJO: Especie "en peliro" (EN)

Gato Andino: 55 km2
Puma: 300 km2
Gato Colo Colo: 11,35 km2
Gato de Geoffroy: 7 km2
Güiña: 33,5 km2

- Codigo VIS2 : 
import numpy as np
import seaborn as sns

Estos son los 5 felinos que estudiareos y exoondremos en nuestro trabajo final
x =["Gato Andino", "Puma", "Colo-Colo", "Gato Geoffroy", "Güiña"]
El eje Y muestra un promedio de los km cuadrados recorridos por estos
y =[55, 300, 11.5, 7, 33.5]

colores=["#ff7f0e", "#FFFF00", "#9ACD32", "#9ACD32", "#9ACD32"]
plt.bar(x,y,color=colores)
 La elección de colores se basa en la categoría en que se encuntra cada una de estas especies:
  VERDE: Especie "casi amenazada" (NT)
  AMARILLO: Especie "vulnerable" (VU)
  NARANJO: Especie "en peliro" (EN)

plt.title ("Promedio de Uso diario del Territorio en felinos endémicos de Chile")
plt.xlabel ("Especies de felinos")
plt.ylabel ("Km cuadrados de uso diario")


plt.show()



### Visualización 3 (Francisca Aqueveque). Entre las cinco especies de félidos, hay unos que recorren más km y otros menos. Para las distancias que pudiste ver anteriormente es necesario entender ¿cuáles son las dimensiones de cada uno? Esta visualización busca caracterizar a los félidos mostrando la longitud comparativa entre ellos. Complementa la narración acercando al usuario a las caracteristicas de cada gato, pudiendo así diferenciarlos y establecer relaciones con el mapa anterior. 
Base de datos: 
Codigo VIS3: 

IMPORTAR LIBRERIAS
import pandas as pd
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt

EJE X REPRESENTA A LOS GATOS, EJE Y REPRESENTA LA LONGITUD MÁXIMA QUE PUEDEN ALCANZAR
x =["gato guiña", "gato colo colo", "gato montes", "gato andino", "puma"]
y =[73, 95, 102, 113, 235]

plt.scatter(x, y, c="purple", alpha= 0.9, s= 80, marker="*", label="cm")
plt.xlabel("Felinos")
plt.ylabel("Longitud en cm")
plt.title ("Felinos y su longitud")
plt.legend (loc= "upper left")
plt.show()

### Visualización 4 (Equipo). Está visualización se está trabajando para dar más interacción y dinamismo al contenido del proyecto. Establece de manera comparativa 3 variables nombre común, el peso máximo y la longitud máxima de cada uno. 
Base de datos: 
Codigo VIS4:
IMPORTAR LIBRERIAS
 import pandas as pd 
import plotly.express as px
TRAER DATA FRAME A TRABAJAR Y AJUSTAR LA SEPARACIÓN ENTRE LOS DATOS
df = pd.read_csv("/content/drive/MyDrive/FÉLIDOS BASE DE DATOS formato 2.csv", sep=";")
df.columns
GENERAR MAPA CON LAS VARIABLES QUE NOS INTERESAN
fig = px.scatter_3d(df, x=df['NOMBRE COMUN'], y=df['PESO MÁXIMO'], z=df['LONGITUD MÁXIMA '], color=df['NOMBRE COMUN'])
fig.show()

## CADA IMAGEN DE LAS VISUALIZACIONES DETALLADAS AQUÍ ESTÁN EN ESTA CARPETA

