public_ip_logger

(SRB) - Serbian language

(EN) - English language

(SRB) Loger dinamicke javne IP adrese.

O APLIKACIJI

Za algoritam toka izvrsavanja programa pogledati public_ip_logger.png

Aplikacija se sastoji iz 4 glavna dela:

    1. installer.sh

    2. app.js

    3. create-service.sh

    4. package.json i package-lock.json

Ostali delovi nisu bitni za samo funkcionisanje servisa i kao sto im i naziv kaze, deskriptivne su prirode, odnosno sluze za laksu analizu i moguce otklanjanje gresaka u glavnom fajlu app.js. Posto su sa strane logike identicni, s tim sto su dodati deskriptivne funkcije console.log() i komentari.

    5. app_descriptive_eng.js

    6. app_descriptive_srb.js


INSTALACIJA

Naredni  koraci se mogu sprovesti rucno, azuriranje sistema, instalacija nodejs i npm, instalacija nodejs modula, kreiranje linux servisa, ali su automatizovani pokretanjem 2 skripta:


Naredne operacije pokretati kao sudo

1. Najpre je neophodno pokrenuti fajl installer.sh
On ce nakolikojpre pokrenuti azuriranje operativnog sistema, zatim pokrenuti instalaciju NodeJS i NPM, prikazati njihove verzije, a u zadnjem koraku iz fajla package.json instalirati neophodne module, i kreirati direktorijum node_modules.

2. Nakon instalacije, potrebno je u app.js fajlu promeniti parametre vezane za gmail autentifikaciju, kao i email posiljaoca i primaoca. Napomena, Google je od 30.05.2022 iskljucio opciju za Less secure apps. Sada je potrebno kreirati aplikativnu lozinku za koriscenje gmail naloga u aplikacijama, vise o tome na linku:
https://support.google.com/accounts/answer/185833?hl=en

             // nodemailer config

            var transport = nodemailer.createTransport({

                service:'gmail',

                host: "smtp.gmail.com",

                port: 465,

                auth: {

                user: "YOUR_GMAIL_ADDRESS@gmail.com", //gmail address

                pass: "GOOGLE_APP_PASSWORD" //gmail generated password

                }

            });
            

            //mail optons

            var mailOptions = {

                from: '"Public IP logger" <SENDER_GMAIL_ADDRESS@gmail.com>',

                to: 'RECIEVER_GMAIL_ADDRESS@gmail.com',

                subject: 'Public IP adress',

                text: 'New Public IP adress: ',

                html: ``

            };

3. Nakon uspesne instalacije pokrenuti create-service.sh. On kreira Linux servisni fajl piplogger.service u direktorijumu u kome je pokrenut, takodje kreira jednu kopiju u /etc/systemd/system/ direktorijum (sto je i najbitnije). Ponovo ucitava systemctl daemon, startuje, restartuje servis, i ponovo ucitava daemon. Takodje prikazuje status piplogger.service servisa 

NACIN RADA

Nacin rada je graficki prikazan u algoritmu toka, u fajlu public_ip_logger

    1. U prvom delu je ucitavanje neophodnih modula iz direktorijuma node_modules

    2. Konfiguracija opcija za email

    3. Deklarisanje potrebnih varijabli i postavljanje podrazumevanih vrednosti
    
    4. Vrsi se upit javne IP adrese, ukoliko postoji greska program se zavrsava nesupesno

    5. Ukoliko je vracena IP adresa, sledeci korak je upit da li postoji fajl ip.txt u direktorijumu data, u koji ce ona biti upisana

    6. Ukoliko fajl ip.txt ne postoji, on se otvara

        6.1 Ukoliko postoji greska otvaranja fajla, program se zavrsava nesupesno

        6.2 Ukoliko je fajl uspesno otvoren u modu citanja i pisanja w+ vrsi se upisivanje u fajl

        6.3 Ukoliko postoji greska upisa program se zavrsava nesupesno

        6.4 Ukoliko je upis inicijlne IP adrese u fajl uspesan, pristupa se slanju te adrese email-om

        6.5 Ukoliko postoji greska u slanju email-a, program se zavrsava nesupesno

        6.6 Ukoliko je email uspesno poslat, program se zavrsava uspesno

    7. Ukoliko fajl ip.txt postoji, on se otvara u a+ modu - za citanje i dodavanje

        7.1 Ukoliko postoji greska otvaranja fajla program se zavrsava nesupesno

        7.2 Ukoliko ne postoji greska iscitava se sadrzaj fajla ip.txt

        7.3 Ukoliko postoji greska citanja fajla program se zavrsava nesupesno

        7.4 Ukoliko ne postoji greska , iz fajla se icitava poslednja ip adresa lastip

        7.5 lastip se poredi sa trenutnom ip adresom ipaddr

        7.6 Ukoliko su adrese iste, nista se ne upisuje u fajl, niti se sta salje koriniku, program se zavrsava

        7.7 Ukoliko su adrese razlicite trenutna adresa se dodaje u fajl na kraj.

        7.8 Ukoliko postoji greska sa dodavanje adrese u fajla program se zavrsava nesupesno

        7.9 Ukoliko je adresa dodata u fajl, pristupa se slanju email-a sa novom adresom korisniku

        7.10 Ukoliko postoji greska prilikom slanja email-a, program se zavrsava nesupesno

        7.11 Ukoliko nema greske program se zavrsava uspesno.



(ENG) Dynamc public IP address logger

APPLICATION

For flow chart, please open public_ip_logger.png

Application consists from 4 main parts:

    1. installer.sh

    2. app.js

    3. create-service.sh

    4. package.json and package-lock.json

    Other parts os app are not so much important, like it's name says, they are for analysis and debuging in main service file app.js. In aspect of program logic they are same as app.js, differences are, that they have descriptive parts like console.log() functions and comments.

    5. app_descriptive_eng.js

    6. app_descriptive_srb.js

    INSTALLATION

    Next steps you can do manualy, updating system, Nodejs and NPM installation, NodeJS module installation and creating linux service, but they are automatized (scripted), by running two scripts.

    Next operations you must run as sudo.

1. First, you need to run installer.sh file. It will run system update, after that it will starts nodejs and npm installation, download node modules, and create node_modules directory

2. After sucessfull installation you need to change gmail parameters in app.js file. It is very important to specify gmail authetication account, gmail sender and reciever account. Note, Beginning from 30.05.2022, Google do not allow you to use Less secure apps option. You need to create Application password for using gmail account in your application. More info about:

https://support.google.com/accounts/answer/185833?hl=en

            // nodemailer config

            var transport = nodemailer.createTransport({

                service:'gmail',

                host: "smtp.gmail.com",

                port: 465,

                auth: {

                user: "YOUR_GMAIL_ADDRESS@gmail.com", //gmail address

                pass: "GOOGLE_APP_PASSWORD" //gmail generated password

                }

            });
            

            //mail optons

            var mailOptions = {

                from: '"Public IP logger" <SENDER_GMAIL_ADDRESS@gmail.com>',

                to: 'RECIEVER_GMAIL_ADDRESS@gmail.com',

                subject: 'Public IP adress',

                text: 'New Public IP adress: ',

                html: ``

            };

3. After sucessfull instalation you need to start second script, create-service.sh. It will create servce file piplogger.service in current directory, which is most important, create copy of that service file in /etc/systemd/system direcotry. It also reload systemctl daemon, start service, restart and again reload daemon.Finally it will display service status.

    PROGRAM LOGIC

    Program logic is graphicaly represented in public_ip_logger.png

    1. At the same beginning of program is part where node modules are loaded

    2. Email configuration

    3. Variable declaration and set default values

    4. Query for public IP address

    5. If public IP don't exists, program fails. If IP exists, then program check if exists file ip.txt, inside data directory. ip.txt is location where public ip adresses are stored.
    
    6. If file ip.txt don't exists, then program create file ip.txt
        
        6.1 If error occurred during file opening, then program fails.

        6.2 If file is successful opened in w+ (read+write) mode, then program write in current public ip

        6.3 If error occurred during writting in file program fails

        6.4 If writting of initial public IP address is successfull, then program sends email

        6.5 If error occurred during email sending program fails

        6.6 If mail is sent sucessfull, program ends with success

    7. If file ip.txt exists, then , program open ip.txt in a+ mode (read+append)

        7.1 If error occurred during file opening, program fails

        7.2 If there are no error, program read the file ip.txt

        7.3 If there are error during readin file program fails

        7.4 If there are no reading error, program get last ip from file - lastip

        7.5 Program compare lastip and current ip ipaddr

        7.6 If adresses are the same, nothing will be writted to the file , and nothing will be sent to the user

        7.7 If adresses are different, then current public ip is added to the end of the ip.txt file

        7.8 If error occurred during appending ip address to the file program fails

        7.9 If address is apended to the file, then program send email to the user with this new public ip

        7.10 If error occurred during email sending, program fails

        7.11 If mail is sent sucessfull, program ends with success










