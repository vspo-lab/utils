---
name: quality-check
description: Run the project's quality checks and report only failures that need attention. Use when the user requests check execution, code change verification, or wants to identify the first failing gate.
---

# Trigger Conditions

- When the user requests check execution or code verification
- When checking quality gate status after code changes
- When quickly identifying the first failing check

# Execution Checklist

1. Run `./scripts/post-edit-check.sh`
2. If it fails, identify the first failing command and root cause
3. Suggest a minimal, safe fix
4. Do not auto-commit
