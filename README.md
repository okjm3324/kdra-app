##  サービス概要

韓国ドラマファンのための

聖地巡礼を効率化する

ロケスポットサーチサービス

好きな韓国ドラマのロケスポットを投稿し、聖地巡礼プランを立てるお手伝いをするアプリ

## ユーザーが抱える課題

韓国ドラマは好きだけど、韓国に土地感がなく、旅行中にロケスポットを回る計画がたてられない。

## 課題に対する仮説

- スポットを巡る際の所要時間がわからないため、無理な計画を立ててしまう。
- 好きなドラマのスポット自体がどこにあるかわからない
- 好きなドラマのスポット情報がブログだけのため、ひとつひとつgoogleマップで検索するのがおっくう

## 解決方法

- naverマップを利用して、韓国の交通機関をつかったスポット間の所要時間を確認できるようにする
- お気に入りのドラマのタイトルごとにスポットを検索できるようにする

## メインのターゲットユーザー

韓国ドラマが好きで、聖地巡礼したいが、どこにロケのスポットがあるかわからないまま旅行プランを立てられない人

韓国ドラマのタイトルごとにロケスポットを確認したい人

## 実装予定の機能

- 一般ユーザー
- ロケスポットを投稿できる (MVP)
- 新しいドラマを追加できる　(MVP)
- マップにスポットをマーカーで表示できる　(MVP)
- セレクトボックスで選択したドラマに関連するマーカーのみ表示できる
- サインアップできる　(MVP)
- ログイン　ログアウトできる　(MVP)
- 好きな韓国ドラマをお気に入りに追加できる
- 好きな韓国ドラマのロケスポットのみをマップで表示できる
- 行きたいロケスポットをマイスポット（お気に入り）に登録できる
- 複数のマイスポットを選択し、naverマップでその移動時間を検索できる
- 旅行プランを立てられる
- （旅行プランをシェアできる）
- 管理ユーザー
- 一般ユーザーの検索、一覧、詳細、編集
- スポットの一覧、詳細、作成、編集、削除
- 管理ユーザーの一覧、詳細、作成、編集、削除
- ドラマの一覧、詳細、作成、編集、削除

## なぜこのサービスを作りたいのか？

先日初の韓国旅行に行き、私自身韓国ドラマが好きなので、旅行中に聖地巡礼しようと考えました。

ロケスポットの主な情報源は韓ドラファンのブログ記事、韓国旅行の書籍からでした。

そして、実際計画をたててロケスポットを回る際に以下の点で不便を感じました。

- 未視聴の韓ドラのスポットの情報は必要としていない（不要な情報が目立つ）
- 好きな韓ドラのスポットの住所をいちいちマップアプリに住所をいれて検索するのが億劫だった
- 土地感がないため、現在地に近い韓ドラスポットがどこに存在するのかわからない

これらの問題を解決すれば、よりスムーズに効率よく聖地巡礼ができると思い、韓ドラのロケスポットのデータベースを兼ねた、聖地巡礼アプリを作ろうと思いました。

## スケジュール

企画~技術調査: 12/19〆切

README~ER図作成 12/20〆切

メイン機能実装12/20~1/30〆切

β版をRUNTEQ内リリース (MVP) : 2/10

本番リリース　3/1

## 技術選定

- Rails api
- postgresql
- next.js
- MaterialUI
- heroku
- vercel
- google map api
- geocoding api
- themoviedb api
- aws S3

## ER図
https://gyazo.com/b0ca5d9f7c75a44ab7bf1ff1ff06e254