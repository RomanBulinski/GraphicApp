
1. Front uruchamianie "ng serve" z lokalizacji
   D:\02_IT\..............\Front\
2. Backend: Wilenska2021backendApplication przez Springa


----------------------------------------------------
            Aplikacja jednomodułowa 
----------------------------------------------------


public class GraphicAppApplication extends SpringBootServletInitializer

1.urucohomienie frontu :
- ng build , a potem
- ng serve


A develope mode na localhoscie-> ustawienie urli w
1. pom:
   <finalName>graphicfront</finalName>
2. index.html:
   <base href="/graphicfront">
3. mvn clean package

2.uruchomienie backendu:  spring przez Service

w przegladarke wpisujemy -> localhost:8080 ( przeskakuje na 8080/graphicfront)


B prod mode do deployu na tomcacie -> ustawienie urli w
1.pom:
    <finalName>graphicfront</finalName>
2.index.html
- prod
    <base href=".">
- dev
    <base href="/graphicfront">

3. pathy do plików audio
- prod
    this.audio.src = 'assets/mp3/mixkit.mp3'
- dev
    this.audio.src = '../../../assets/mp3/mixkit.mp3'

- ng build --prod
- mvn clean packgae
- war do odpowiedniego folderu na Tomcatcie 
- doploy/start


W pliku package.json
 "buildWatch": "ng build --output-path=../target/classes/static --watch"
