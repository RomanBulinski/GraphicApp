
1. Front uruchamianie "ng serve" z lokalizacji
   D:\02_IT\..............\Front\
2. Backend: Wilenska2021backendApplication przez Springa


----------------------------------------------------
            Aplikacja jednomodułowa 
----------------------------------------------------


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


w przegladarke wpisujemy -> localhost:8080 ( przeskakuje na 8080/Heb)


B prod mode do deployu na tomcacie -> ustawienie urli w
1.pom:
    <finalName>graphicfront</finalName>
2.index.html
    <base href="."> (?)


W pliku package.json
 "buildWatch": "ng build --output-path=../target/classes/static --watch"
