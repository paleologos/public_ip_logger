var publicip = require('nodejs-publicip');
var fs = require('fs');
var nodemailer = require('nodemailer');

// nodemailer konfiguracija
var transport = nodemailer.createTransport({
    service:'gmail',
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "EMAIL_POSILAJOCA@gmail.com", //gmail adresa
      pass: "GOOGLE_APP_LOZINKA" //lozinka koja se generise (nije lozinka gmail-a)
    }
  });

//mail opcije
  var mailOptions = {
    from: '"Public IP logger" <EMAIL_POSILJAOCA@gmail.com>',
    to: 'EMAIL_PRIMAOCA@gmail.com',
    subject: 'Public IP adresa',
    text: 'Nova Public IP adresa: ',
    html: ``
};




var ip='xxx.xxx.xxx.xxx';
const path = "./data/ip.txt";
var pip4=new publicip();

    // Pronalazenje public IP adrese
    pip4.queryPublicIPv4Address((err, ipaddr) => {
        if (err) {
            console.log(`Greska: ${err}`);
            return;
        } else{
            // Provera da li fajl postoji
            fs.access(path, fs.constants.F_OK, (err) => {
                
                // Fajl ne postoji -  kreira se novi u w+ rezimu, i u njega se upisuje nova ip i salje email
                if(err){
                    console.log(`Fajl ${path} ne postoji, kreiranje fajla...`);
                    //Otvara se u w+ rezimu
                    fs.open(path, 'w+', function (err, f) {
                        if(err){
                            console.log(err)
                        }else{
                            //Upisuje se nova (prva) IP
                            fs.writeFile(path, ipaddr, err => {
                                if (err) {
                                  //greska upisa
                                  console.error(err);
                                }else{
                                    //uspesan upis
                                    console.log(`${ipaddr} je upisana u fajl ${path}`)
                                        // Slanje prve ip adrese
                                        //dodavanje ipaddr u mail optios
                                        mailOptions['html']=`<h1 style='color:green'>Public IP adresa je: ${ipaddr}</h1>`;

                                        transport.sendMail(mailOptions, (error, info) => {
                                            if (error) {
                                            //return console.log("Greska", error);
                                            }
                                            console.log('Poruka poslata: %s', info.messageId);
                                        });
                                }
                              });
                        }
                    });
                        
                   
                }else{
                // Fajl postoji - otvara se i dodaje se nova ip adresa u listu
                    console.log(`Fajl ${path} postoji`)
                    // Otvara se u a+ rezimu
                    fs.open(path, 'a+', function (err, f) {
                        if(err){
                            console.log(err)
                        }else{
                            //Proverava trenutnu IP adresu sa poslednjom iz fajla - ukoliko je razlicita dodaje se u fajl i salje email
                            
                            //citanje poslednje adrese - provera adrese
                            fs.readFile(path, 'utf8', (err, file_ip) => {
                                if (err) {
                                  console.error(err);
                                  return;
                                }
                                console.log("IP adresa iz fajla: " ,file_ip);
                                // PROVERA DA LI JE TRENUTNA ADRESA ipaddr ISTA ILI RAZLICITA OD ADRESE IZ FAJLA file_ip
                                
                                //iste su
                                var iparray='';
                                //niz ip adresa iz fajla
                                iparray= file_ip.split("\n");
                                iparraylen= iparray.length

                                console.log("Broj IP adresa u fajlu je ",iparraylen);

                                //poslednja ip adresa u fajlu
                                lastip=iparray[iparraylen-1]
                                console.log("poslednja IP", lastip )
                                if(ipaddr == lastip){
                                   console.log("Trenutna Public IP adresa i adresa iz fajla su iste");
                                //razlicite su     
                                }else{
                                    console.log("Trenutna Public IP adresa i adresa iz fajla su razlicite");

                                    // dodaje novu ip adresu u fajl i salje mail obavestenja korisniku
                                    fs.appendFile(path, `\n${ipaddr}`, err => {
                                        // greska u dodavanju nove ip adrese u fajl
                                        if (err) {
                                          console.error(err);
                                        // uspesno dodavanje nove ip adrese u fajl
                                        }else{
                                          console.log("Uspesno dodavanje nove ip addrese u fajl ", ipaddr)

                                          // Salje novu IP adresu

                                          //dodavanje ip adrese u objekat mailOptions
                                          mailOptions['html']=`<h1 style='color:green'>Nova public IP adresa je: ${ipaddr}</h1>`;

                                          transport.sendMail(mailOptions, (error, info) => {
                                            if (error) {
                                              return console.log("Greska", error);
                                            }
                                            console.log('Poruka poslata: %s', info.messageId);
                                          });
                                        }
                            
                                      });
                                }
                              });
                        
                        }
                    });

                }
              });


        }
  
});

