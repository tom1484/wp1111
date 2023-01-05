# WP1111 Final Project - Money Manager

## Repositories

> This repo has the clone of the following repos

| Component | URL |
| --- | --- |
| Backend server | https://github.com/tom1484/money-manager-server |
| Frontend | https://github.com/tom1484/money-manager |

## Deployment Information

| Component | Deployment Method | URL |
| --- | --- | --- |
| Backend server | Deploy on Railway | https://money-manager-server-production.up.railway.app |
| Frontend | Release APK on GitHub | https://github.com/tom1484/money-manager/releases/tag/rev.1 |

## How to Use This Repository

### Backend Server

> Remember to configure the port and MongoDB URL in `.env`<br>
> The following commands should be executed under `money-manager-server/`

```bash
# install dependencies
yarn
# start server
yarn start
```

### Frontend

> Remember to configure the server URL in `.env` according to your settings<br>
> The following commands should be executed under `money-manager/`

```bash
# install dependencies
yarn
# start frontend
yarn start
```

> The following actions require that your computer has proper Internet connection<br>
> The port of the frontend (usually `19000`) should be available to access

After the frontend started, you should see Expo App QR code, for example

<img src="https://user-images.githubusercontent.com/58879171/210759137-d445d323-ddd1-4c3c-8e30-9d4682d33fc3.png" alt="drawing" width="400"/>

Now, install [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=zh_TW&gl=US) in Google Play Store<br>
Then scan the QR code in Expo Go or enter URL manually

<img src="https://user-images.githubusercontent.com/58879171/210759481-2dfecf3c-8774-474b-b591-8100b1699b02.jpg" alt="drawing" width="400"/>

If your Internet connection works properly, you should be able to open the APP now

<img src="https://user-images.githubusercontent.com/58879171/210760362-52a0b028-9ec6-4672-9f40-d9dbf3df5d46.jpg" alt="drawing" width="400"/>


