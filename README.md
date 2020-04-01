#### Covid Hrvatska - kako postaviti aplikaciju

Ova aplikacija koristi [Google Firebase](https://firebase.google.com/?gclid=CjwKCAjw95D0BRBFEiwAcO1KDG4U6gFKDtyJoHYMRnTmQUmsKu-cOAwLqgdTzejeRa1LEj3zK4NeNhoCNYcQAvD_BwE). Također
koristi Google Maps. Za ovu aplikaciju su potrebna oba proizvoda da bi radila. Zbog razlog što je napravljena
sa Google Firebase-om, ovu aplikaciju može postaviti svatko koristeći svoju zasebnu bazu.

Setupiranje Google Firebase je dosta jednostavno. Nakon što napravite novi račun i projekt,
u `/src/environments/environment.prod.ts` i jednostavno copy/paste vaših ključeva u ovaj file.

Nakon toga, potrebno je napraviti račun i za Google maps odnosno API key. 

Nakon što postavite gornje postavke, potrebno je deplojati projekt. Projekt deplojate
pomoću [Firebase CLI](https://firebase.google.com/docs/cli). Korištenje ovog CLI-a je poprilično
jednostavno tako da se cijela aplikacija može setupirati u roku od pola sata.


