#!/bin/bash
touch piplogger.service
echo "[Unit]" > piplogger.service
echo "Description=Public IP logger" >>piplogger.service
echo "After=network.target" >> piplogger.service
echo "StartLimitIntervalSec=0" >> piplogger.service
echo "[Service]">> piplogger.service
echo "Type=simple" >>piplogger.service
echo "Restart=always" >>piplogger.service
echo "RestartSec=1" >> piplogger.service
echo "User=$USER" >> piplogger.service
servicedir=`pwd`
echo "WorkingDirectory=$servicedir" >> piplogger.service
nodeloc=`which node`
# u slucaju da se node trazi preko whereis - in case locating nodejs whit 'whereis' command
# duzina stringa - string length
#nodeloclen=${#nodeloc}
#odsecanje stringa radi lokacije - slice the string
#nodelocsliced=${nodeloc:5:nodeloclen-5}
applocation=`readlink -f app.js`
echo "ExecStart=$nodeloc $applocation" >>piplogger.service
echo "" >>piplogger.service
echo "[Install]" >> piplogger.service 
echo "WantedBy=multi-user.target" >> piplogger.service

# copy to service directory
sudo cp ./piplogger.service /etc/systemd/system

# reload daemon 
sudo systemctl daemon-reload

# service status
sudo systemctl status piplogger.service

# enable service on reboot
sudo systemctl enable piplogger.service

# service start
sudo systemctl start piplogger.service

# reload daemon 
sudo systemctl daemon-reload

# service restart
sudo systemctl restart piplogger.service

# service status
sudo systemctl status piplogger.service