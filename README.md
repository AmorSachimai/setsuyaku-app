# Setsuyaku App

## 概要

Setsuyaku Appは、ユーザーが節約額を確認できるアプリです。このアプリケーションを通じて、節約目標を設定し、達成状況をモニターすることができます。

## 環境設定

### 必要条件

- Node.js バージョン: 20.0.0
- npm

### インストール手順

1. **Node.jsのインストール**

   Node.jsの推奨バージョン20.0.0をインストールしてください。以下のリンクからダウンロードできます：
   [Node.jsダウンロードページ](https://nodejs.org/)

2. **プロジェクトのクローン**

   プロジェクトをクローンまたはダウンロードします。

   ```bash
   git clone https://github.com/ukasama47/setsuyaku-app.git
   cd setsuyaku-app
   ```
3. **依存関係のインストール**

   プロジェクトディレクトリに移動し、npmを使用して依存関係をインストールします。
   ```bash
   npm install
   ```
4. **Firebaseの設定**

   Firebaseの設定を行います。以下の手順に従ってください：

   1.Firebaseコンソールにアクセスし、新しいプロジェクトを作成します。

   2.プロジェクト設定から、Firebase SDKの設定情報を取得します（firebaseConfig）。

   3.src/firebaseConfig.js ファイルを作成し、以下のように設定情報を追加します。

   ```javascript

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID",
      measurementId: "YOUR_MESUREMENT_ID",
    };

    export default firebaseConfig;

    ```
5. **起動**

    アプリケーションを起動するには、以下のコマンドを実行します。
   ```bash
   npx expo start
     ```
   または
   ```bash
   npx expo tunnel
     ```
6. **主な機能**

-   節約目標の設定

-   節約額の表示

-   ご褒美額の表示

7. **コントリビュート**

   プロジェクトへのコントリビュートを歓迎します。バグの報告や機能の提案は、GitHubのイシューとして報告してください。


Setsuyaku Appを使用して、楽しく節約を始めましょう！