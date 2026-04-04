#!/usr/bin/env python3
"""
append_to_daily_note.py
Aqua Voice で入力した整形済みテキストを Obsidian のデイリーノートに追記する。

使い方:
    python append_to_daily_note.py "<テキスト>" "<vaultパス>" [<デイリーノートフォルダ名>]

例:
    python append_to_daily_note.py "今日は晴れでした。" "/sessions/abc/mnt/kabaran_brain"
    python append_to_daily_note.py "Meeting notes." "/sessions/abc/mnt/kabaran_brain" "Journal"
"""

import sys
import os
from datetime import datetime
from pathlib import Path


# ── 設定 ──────────────────────────────────────────────────
DEFAULT_NOTES_FOLDER = "Daily Notes"  # Vaultルート直下のフォルダ名
DATE_FORMAT = "%Y-%m-%d"           # ファイル名形式: 2026-04-03.md
TIME_FORMAT = "%H:%M"              # タイムスタンプ形式: 14:35
# ─────────────────────────────────────────────────────────


def get_daily_note_path(vault_path: str, notes_folder: str) -> Path:
    """今日のデイリーノートのパスを返す。フォルダがなければ作成する。"""
    today = datetime.now().strftime(DATE_FORMAT)
    notes_dir = Path(vault_path) / notes_folder
    notes_dir.mkdir(parents=True, exist_ok=True)
    return notes_dir / f"{today}.md"


def create_note_header(today: str) -> str:
    """デイリーノートの初期ヘッダーを生成する。"""
    return f"# {today}\n\n"


def build_entry(text: str) -> str:
    """タイムスタンプ付きのエントリーブロックを生成する。"""
    timestamp = datetime.now().strftime(TIME_FORMAT)
    return f"\n## {timestamp}\n\n{text.strip()}\n"


def append_to_note(note_path: Path, text: str) -> None:
    """デイリーノートが存在しない場合は作成し、末尾にテキストを追記する。"""
    if not note_path.exists():
        today = note_path.stem  # ファイル名（拡張子なし）= 日付
        header = create_note_header(today)
        note_path.write_text(header, encoding="utf-8")

    entry = build_entry(text)
    with open(note_path, "a", encoding="utf-8") as f:
        f.write(entry)


def main():
    if len(sys.argv) < 3:
        print("使い方: python append_to_daily_note.py <テキスト> <vaultパス> [<ノートフォルダ>]")
        sys.exit(1)

    text = sys.argv[1]
    vault_path = sys.argv[2]
    notes_folder = sys.argv[3] if len(sys.argv) > 3 else DEFAULT_NOTES_FOLDER

    vault_dir = Path(vault_path)
    if not vault_dir.exists():
        print(f"エラー: Vaultパスが見つかりません: {vault_path}")
        print("Coworkでフォルダを選択してからもう一度実行してください。")
        sys.exit(2)

    note_path = get_daily_note_path(vault_path, notes_folder)
    append_to_note(note_path, text)

    timestamp = datetime.now().strftime(TIME_FORMAT)
    print(f"[OK] 追記完了: {note_path.name}  ({timestamp})")
    print(f"   場所: {note_path}")


if __name__ == "__main__":
    main()
