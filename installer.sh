
echo "========================================================="
echo "Updating system"
echo "========================================================="
read -p "Press enter to continue / Pritisnite Enter da bi ste nastavili:  "
sleep 1 
sudo apt update -y

echo "========================================================="
echo "Installing Nodejs and NPM "
echo "========================================================="
read -p "Press enter to continue / Pritisnite Enter da bi ste nastavili:  "
sleep 1 
sudo apt install nodejs -y
sudo apt install npm -y


nodev=`node -v`
npmv=`npm -v`
sleep 1 
echo "========================================================="
echo "NodeJS version / Nodejs verzija : ${nodev}"
echo "NPM version / NPM verzija : ${npmv}"
echo "========================================================="
echo ""
echo "========================================================="
echo " Installing NodeJS modules"
echo "========================================================="
read -p "Press enter to continue / Pritisnite Enter da bi ste nastavili:  "
sleep 1 
sudo npm install 
