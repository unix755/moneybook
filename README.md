```
░█▀▄▀█░▄▀▀▄░█▀▀▄░█▀▀░█░░█░░░█▀▀▄░▄▀▀▄░▄▀▀▄░█░▄
░█░▀░█░█░░█░█░▒█░█▀▀░█▄▄█░░░█▀▀▄░█░░█░█░░█░█▀▄
░▀░░▒▀░░▀▀░░▀░░▀░▀▀▀░▄▄▄▀░░░▀▀▀▀░░▀▀░░░▀▀░░▀░▀
```

- Power financial application

## Install

```sh
# install nodejs curl and unzip
apt update && apt install -y nodejs curl

# download and install compiled files
mkdir -p /usr/local/bin/moneybook
curl -sL "https://github.com/unix755/moneybook/releases/download/latest/moneybook.tar.gz" | tar -zxvC /usr/local/bin/moneybook

# run test
node /usr/local/bin/moneybook/index.js -a 0.0.0.0 -p 8000 -d mysql://root:root@192.168.1.2:3306/moneybook
```

## Usage

```sh
Usage: moneybook [options]

Options:
  -d, --database <string>  database source url
  -a, --address [string]   ip address (default: "127.0.0.1")
  -p, --port [number]      port (default: 8000)
  -h, --help               display help for command

Dev start:
  npm run start -- -a 0.0.0.0 -p 8000 -d mysql://root:root@192.168.1.2:3306/moneybook
```

## Service

### systemd

```sh
curl -Lo /etc/systemd/system/moneybook.service https://raw.githubusercontent.com/unix755/moneybook/main/configs/systemd/moneybook.service
systemctl enable moneybook.service && systemctl restart moneybook.service
```

### openrc

```sh
curl -Lo /etc/init.d/moneybook https://raw.githubusercontent.com/unix755/moneybook/main/configs/openrc/moneybook
chmod +x /etc/init.d/moneybook
rc-update add moneybook && service moneybook restart
```

## FAQ

### How to use it?

- This app is a backend server, you also need to install https://github.com/unix755/moneybookUI

## License

- **GPL-3.0 License**
- See `LICENSE` for details

## Credits

- [webstorm](https://www.jetbrains.com/webstorm/)
- [vscode](https://code.visualstudio.com/)
