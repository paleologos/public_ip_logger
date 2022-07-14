var publicip = require('nodejs-publicip');
var fs = require('fs');
var nodemailer = require('nodemailer');

// nodemailer config
var transport = nodemailer.createTransport({
  service:'gmail',
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "SENDER_EMAIL@gmail.com", //gmail adresa
    pass: "GOOGLE_APP_PASSWORD" //lozinka koja se generise 
  }
});

//mail optons
var mailOptions = {
  from: '"Public IP logger" <SENDER_EMAIL@gmail.com>',
  to: 'RECIEVER_EMAIL@gmail.com',
  subject: 'Public IP adress',
  text: 'New Public IP adress: ',
  html: ``
};



var ip='xxx.xxx.xxx.xxx';
const path = "./data/ip.txt";
var pip4=new publicip();



    // Find your current public ip address
    pip4.queryPublicIPv4Address((err, ipaddr) => {
        if (err) {
            console.log(`Error: ${err}`);
            return;
        } else{
            // Check file existance
            fs.access(path, fs.constants.F_OK, (err) => {
                
                // File do not exists- creates new file in w+ mode, and  write new ip in it. Also, sending your current public ip.
                if(err){
                    console.log(`File ${path} do not exists, file creating...`);
                    //Open file in w+ mode
                    fs.open(path, 'w+', function (err, f) {
                        if(err){
                            console.log(err)
                        }else{
                            //writes in (initial) IP
                            fs.writeFile(path, ipaddr, err => {
                                if (err) {
                                  //error writing
                                  console.error(err);
                                }else{
                                    //success write
                                    console.log(`${ipaddr} writted in  ${path}`)
                                        // Send initial public ip
                                        //add ipaddr in mailOption object
                                        mailOptions['html']=`<h1 style='color:green'>Public IP adress: ${ipaddr}</h1>`;

                                        transport.sendMail(mailOptions, (error, info) => {
                                            if (error) {
                                            //return console.log("Error", error);
                                            }
                                            console.log('Email sent: %s', info.messageId);
                                        });
                                }
                              });
                        }
                    });
                        
                   
                }else{
                // File exists- open file and add new ip in array
                    console.log(`File ${path} exists`)
                    // open file in a+ mode
                    fs.open(path, 'a+', function (err, f) {
                        if(err){
                            console.log(err)
                        }else{
                            //Comparing current public ip addr against last public ip in file - if they are different current ip is added in file and send with email                            
                            //read last ip - check ip address
                            fs.readFile(path, 'utf8', (err, file_ip) => {
                                if (err) {
                                  console.error(err);
                                  return;
                                }
                                console.log("Last public IP from file: " ,file_ip);
                                // CHECK IF CURRENT IP  ipaddr  ARE THE SAME OR DIFFERENT FROM LAST AIP FROM FILE file_ip                          
                                var iparray='';
                                //array of ip addresses from file
                                iparray= file_ip.split("\n");
                                iparraylen= iparray.length

                                console.log("Number of IP addresses inside file is: ",iparraylen);

                                //Last IP in file
                                lastip=iparray[iparraylen-1]
                                console.log("Last ip: ", lastip )
                                if(ipaddr == lastip){
                                   console.log("Current public IP an IP from the file are the same");
                                //or they are different  
                                }else{
                                    console.log("Current public IP an IP from the file are the same");

                                    // Add new ip address i file
                                    fs.appendFile(path, `\n${ipaddr}`, err => {
                                        // error in adding new ip address
                                        if (err) {
                                          console.error(err);
                                        // sucessfull adding 
                                        }else{
                                          console.log("New public IP is sucessfull added : ", ipaddr)

                                          // Send new IP

                                          //add new ip in object mailOptions
                                          mailOptions['html']=`<h1 style='color:green'>New public IP adress : ${ipaddr}</h1>`;

                                          transport.sendMail(mailOptions, (error, info) => {
                                            if (error) {
                                              return console.log("Error: ", error);
                                            }
                                            console.log('Email sent: %s', info.messageId);
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

