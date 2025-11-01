# Data Structures（データ構造）

## 概要
ToDoアプリで扱うデータ型と、状態管理・永続化の仕様を定義する。  
MVPでは `Task` オブジェクトを中心に扱い、localStorageで保存・復元を行う。

---

## Taskオブジェクト構造

```js
Task = {
  id: string,          // 一意のID（UUID）
  title: string,       // タスク名（1〜100文字）
  completed: boolean,  // 完了状態（true/false）
  due?: string,        // 期限（任意、YYYY-MM-DD）
  priority?: 'low' | 'mid' | 'high' // 優先度（任意）
}
```

### 説明
| フィールド | 型 | 必須 | 説明 |
|-------------|----|------|------|
| `id` | string | ✅ | 一意の識別子（UUIDなど） |
| `title` | string | ✅ | タスク名（入力値） |
| `completed` | boolean | ✅ | 完了状態フラグ |
| `due` | string | 任意 | 期日。MVPでは未使用可 |
| `priority` | string | 任意 | 優先度（low/mid/high） |

---

## 状態構造（State）
アプリ全体の状態を管理するオブジェクト。

```js
state = {
  tasks: Task[],                // 登録されたタスク一覧
  filter: 'all' | 'active' | 'completed' // 表示フィルタ
}
```

### 状態遷移（例）
1. `addTask(title)` → `tasks` に新しいTaskを追加  
2. `toggleTask(id)` → 指定タスクの `completed` を反転  
3. `deleteTask(id)` → 指定タスクを配列から削除  
4. `setFilter(type)` → 表示状態を更新  
5. `render()` → フィルタ済みのリストを描画

---

## 永続化仕様（Persistence）

| 項目 | 内容 |
|------|------|
| 保存先 | `localStorage` |
| キー名 | `todo.tasks.v1` |
| 保存形式 | JSON配列 |
| 保存タイミング | 各操作（追加・削除・編集・完了切替）後 |
| 読み込みタイミング | ページロード時（初期化処理内） |
| 破損時の挙動 | JSONパースに失敗した場合は空配列で再初期化 |

```js
// 保存・読込ユーティリティ例
const STORAGE_KEY = 'todo.tasks.v1';

function save(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}
```

---

## データフロー概要

```
ユーザー入力 → Task作成 → state更新 → localStorage保存 → 再レンダリング
```

1. 入力フォームでタイトルを入力し追加ボタンを押下  
2. 新しい `Task` オブジェクトが生成され、`state.tasks` に追加  
3. 状態変更後、`save()` により `localStorage` に保存  
4. 表示フィルタ条件に基づいてリストを再描画  
5. ページ再読み込み時、`load()` により復元

---

## 今後の拡張（Backlog）
- 完了日時（`completedAt`）の追加  
- タグ／カテゴリー（`tags: string[]`）の導入  
- 並び順（手動ソート用 `order` プロパティ）  
- サーバー同期（IndexedDBまたはAPI連携）  