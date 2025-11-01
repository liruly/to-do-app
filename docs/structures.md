# Structures（構成・設計方針）

## 概要
ToDoアプリのディレクトリ構成とファイルの役割を定義する。  
MVPをシンプルに構築し、可読性と拡張性を両立することを目的とする。

---

## ディレクトリ構成

```
/to-do-app
├── docs/
│   ├── requirements.md    # 要件定義
│   ├── data_structures.md # データ設計
│   └── structures.md      # 構成設計
├── index.html             # エントリーポイント
├── styles.css             # スタイルシート
├── app.js                 # メインスクリプト
└── README.md              # 開発の概要
```

---

## ファイルの役割

| ファイル名 | 役割 |
|-------------|------|
| `index.html` | UI構造とフォーム・リストの定義 |
| `styles.css` | レイアウト・配色・レスポンシブ対応 |
| `app.js` | 状態管理・イベント処理・レンダリング |
| `docs/requirements.md` | 機能要件・非機能要件の整理 |
| `docs/data_structures.md` | データモデル・永続化仕様 |
| `docs/structures.md` | 構成・設計方針の記録 |
| `README.md` | プロジェクト概要・セットアップ手順 |

---

## コーディング方針

- HTML/CSS/JavaScript のみで実装（フレームワーク不使用）  
- 関数・変数命名は英語、キャメルケース統一  
- DOM操作は `document.createElement()` を中心に行う  
- レンダリング戦略は `render()` による全リスト再描画方式（差分更新は行わない）  
- コメントで主要処理ブロックを明示する  

---

## 実装モジュール構造（JavaScript）

```js
// app.js 概要

// ---- ストレージ操作 ----
function save(tasks) { ... }
function load() { ... }

// ---- 状態管理 ----
let state = { tasks: [], filter: 'all' };

// ---- 操作関数 ----
function addTask(title) { ... }
function toggleTask(id) { ... }
function deleteTask(id) { ... }
function setFilter(type) { ... }

// ---- 描画 ----
function render() { ... }

// ---- 初期化 ----
function init() {
  state.tasks = load();
  render();
}
init();
```

---

## 開発方針

1. **MVP優先**：最小限の機能（追加・完了・削除・保存）を最初に完成させる  
2. **モジュール分割**：機能単位で関数を整理し、将来的に ES Modules に移行可能にする  
3. **UI改善は後工程**：ロジックを安定させてからデザインを調整  
4. **コメントと命名**：読みやすいコードを優先し、コメントで意図を補足  

---

## 今後の拡張計画

- **構造改善**：`components/` ディレクトリを追加し、UIパーツを分割  
- **スタイル統合**：Sass または Tailwind CSS 導入検討  
- **ビルド導入**：Vite や Parcel などの軽量ビルドツールを検討  
- **テスト**：Jest / Vitest によるユニットテスト追加  
- **TypeScript移行**：データ構造の厳密化  
