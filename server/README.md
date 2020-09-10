# MDialy Server

## API Endpoints

### **/user**

| method | auth | endpoint | description |
|:-------|:----:|:---------|:------------|
| GET    |  o   | /:username/profile | プロフィール取得  |
| PUT    |  o   | /:username/profile | プロフィールを編集 |

### **/board**

| method | auth | endpoint                | description        |
|:-------|:----:|:------------------------|:-------------------|
| PUT    | o    | /board/setting      | エディタ設定の更新           |
| GET    |      | /board              | 所有するすべてのボードを取得 |
| POST   | o    | /board              | 新規ボードを作成       |
| GET    |      | /board/:id          | 特定のボードを取得      |
| DELETE | o    | /board/:id          | 特定のボードを削除      |
| GET    |      | /board/:id/note/:id | IDからノートを取得       |
| POST   | o    | /board/:id/note     | 新規ノートを作成       |
| PUT    | o    | /board/:id/note/:id | ノートを編集           |

### **/note**

| method | auth | endpoint                | description        |
|:-------|:----:|:------------------------|:-------------------|
| GET    |      | /note/:id | IDからノートを取得       |
| POST   | o    | /note     | 新規ノートを作成       |
| PUT    | o    | /note/:id | ノートを編集           |

### **/auth**

| method | auth | endpoint  | description |
|:-------|:----:|:----------|:------------|
| POST   |      | /register | 新規ユーザ登録 |
| POST   |      | /signin   | ログイン        |



### **/admin**

## Diagram

![](./model.drawio.svg)


## カスタムエラーハンドラ
