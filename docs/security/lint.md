# Lint / Quality Check

## 概要

このドキュメントは、リポジトリで実施する品質チェックの最小セットを定義します。
コードとドキュメントの両方で、PR前に同じ手順を実行してください。

## 必須チェック（全変更共通）

変更後は、次のコマンドを必ず実行します。

```bash
./scripts/post-edit-check.sh
```

`post-edit-check.sh` は以下を順に実行します。

```bash
pnpm build
pnpm biome:check
pnpm knip
pnpm tsc
```

## ドキュメント変更時の追加チェック

`docs/` を更新した場合は、次も確認してください。

1. 見出し構造（`#` -> `##` -> `###`）が崩れていない
2. 用語のゆれがない（同じ概念は同じ語を使う）
3. 参照リンクが存在し、相対パスが正しい
4. `pnpm textlint` が成功する

textlint の運用方針と導入例は [docs/security/textlint.md](./textlint.md) を参照してください。

## アーキテクチャ lint ルール（AI レビュー対象）

以下のルールは自動 lint では完全に検出できませんが、コードレビューで確認します。
`/code-review` スキルがこれらのルールをチェックします。

| ルール | 対象 | 検出方法 |
| --- | --- | --- |
| 公開関数に JSDoc（事前条件・事後条件）必須 | 全パッケージ | AI レビュー |
| try-catch 禁止（Result 型必須） | 全体 | AI レビュー |
| interface 直接定義禁止（Zod Schema First） | 全体 | AI レビュー |
