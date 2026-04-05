---
name: aqua-voice-to-obsidian
description: >
  Aqua Voice（または他の音声入力ツール）で録音・テキスト化した音声メモを整形し、
  ObsidianのデイリーノートにMarkdown形式で追記するスキル。
  ユーザーが「音声メモをObsidianに追記して」「デイリーノートに保存して」
  「Aqua Voiceのテキストを整形して」などと言った場合に必ず使うこと。
  音声テキストの貼り付けを伴う場合も積極的に適用すること。
---

# Aqua Voice → Obsidian デイリーノート追記スキル

音声テキストを整形し、Obsidianのデイリーノート（`kabaran_brain` Vault）へ
タイムスタンプ付きで追記するワークフロー。

## Vault情報

- **Vaultパス（Windows）**: `C:\Users\mhc01\OneDrive\デスクトップ\kabaran_brain`
- **デイリーノートフォルダ**: `日記`（Vaultルート直下）
- **ファイル名形式**: `YYYY-MM-DD.md`

---

## Step 1: Vaultへのアクセスを確保する

まず、Vaultがマウントされているか確認する。

```python
import os
from pathlib import Path

cwd = os.getcwd()  # 例: /sessions/dreamy-exciting-mayer
mnt_path = Path(cwd) / "mnt" / "kabaran_brain"
daily_notes_path = mnt_path / "日記"
vault_accessible = mnt_path.exists()
```

もし `kabaran_brain` フォルダが見つからない場合は、
`request_cowork_directory` ツールを使ってユーザーにフォルダ選択を促す：

> 「Obsidian Vaultフォルダ（`C:\Users\mhc01\OneDrive\デスクトップ\kabaran_brain`）を選択してください」

フォルダが選択されると、`/sessions/<id>/mnt/kabaran_brain/` がVaultのルートになる。

---

## Step 2: 音声テキストを整形する

ユーザーが貼り付けた音声テキストを、読みやすい文章に整形する。

### 整形ルール

**削除・修正するもの:**
- フィラーワード（「えーと」「あの」「そのー」「えー」/ "um", "uh", "like", "you know"）
- 重複した単語・フレーズ（「そのその」「でで」など）
- 明らかな言い淀み（「あ、違う」の後に続く正しい内容だけ残す）

**追加・修正するもの:**
- 文頭の大文字化（英語の場合）
- 文末に句点・ピリオドがない場合は付加
- 長い一文は自然な区切りで段落分け（意味の切れ目で改行）
- 固有名詞・専門用語は正しいスペルに修正（例: "obsidian" → "Obsidian"）

**保持するもの:**
- 元の口調・トーン（話し言葉のままでよい）
- 内容・事実は一切変えない
- 日本語・英語の混在はそのまま

### 整形例

入力:
```
えーと今日はそのプロジェクトの進捗なんだけどえーその田中さんとミーティングして
でそのobsidianのプラグインのことで話し合いをしたんだよねで次回は来週の月曜日に
またミーティングする予定
```

出力:
```
今日はプロジェクトの進捗について、田中さんとミーティングした。
Obsidianのプラグインについて話し合いをした。
次回は来週の月曜日にまたミーティングする予定。
```

---

## Step 3: デイリーノートに追記する

整形したテキストを `scripts/append_to_daily_note.py` で追記する。
スクリプトのパスはこのSKILL.mdと同じディレクトリの `scripts/` フォルダ内にある。

```python
import subprocess, os
from pathlib import Path

cwd = os.getcwd()  # /sessions/<id>
vault_path = f"{cwd}/mnt/kabaran_brain"
skill_dir = "<available_skillsリストに記載のbase directory>"
formatted_text = """（整形済みテキスト）"""

result = subprocess.run(
    ["python3", f"{skill_dir}/scripts/append_to_daily_note.py", formatted_text, vault_path],
    capture_output=True, text=True
)
print(result.stdout or result.stderr)
```

---

## Step 4: 完了を報告する

追記が成功したら、ユーザーに次の情報を伝える：
- 追記先のファイル名（例: `2026-04-03.md`）
- 追記した時刻
- 整形後のテキスト（確認用に表示）

### 失敗時の対処

| エラー | 対処 |
|--------|------|
| `kabaran_brain` が見つからない | Vaultフォルダ未マウント → `request_cowork_directory` で `C:\Users\mhc01\OneDrive\デスクトップ\kabaran_brain` を要求 |
| `PermissionError` | ファイルが書き込み禁止 → ユーザーに確認を求める |
| `UnicodeEncodeError` | エンコード問題 → スクリプトのUTF-8設定を確認 |

---

## 注意事項

- デイリーノートが存在しない場合は新規作成する（ヘッダー付き）
- 追記は常にファイル末尾に行う（既存の内容は一切変更しない）
- タイムスタンプは `## HH:MM` 形式の見出しで区切る
