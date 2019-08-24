# House Hotel

## 下載與安裝
```
$ git clone https://github.com/mingjunlu/house-hotel.git
$ cd house-hotel
$ npm install
```

## 前置作業
1. 自[活動官網](https://challenge.thef2e.com)登入後，進入「個人檔案」頁面，點選左手邊的「個人資料編輯」
2. 複製頁面底部「API TOKEN」欄位的數值（沒用過的話請先點「獲取新 Token」後再複製）
3. 進入 `house-hotel` 資料夾，新增一個 `.env.development.local` 檔案，輸入以下內容：
```
HTTPS=true
REACT_APP_API_URL=https://challenge.thef2e.com/api/thef2e2019/stage6
REACT_APP_API_KEY=Bearer enterYourApiTokenHere
```
4. 將 `enterYourApiTokenHere` 改成自己的 token 後存檔（記得前面的 `Bearer ` 要留著）

## 進入開發模式
```
$ npm run lambda-serve
$ npm start
```
