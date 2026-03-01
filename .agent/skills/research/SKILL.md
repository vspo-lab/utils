---
name: research
description: Technical research and spec verification using Context7 MCP. Use for checking latest library/framework documentation, validating API specs, verifying version differences, and gathering evidence for implementation decisions. Especially useful for "latest", "recommended", "breaking change", and "migration" investigations.
---

# Trigger Conditions

- When asked to research latest specs or official recommendations
- When compatibility checks are needed before introducing or upgrading a library/framework
- When implementation decisions need evidence backed by primary sources

# Research Flow

1. Clarify the target library name, version, and implementation purpose
2. Resolve the library ID with `mcp__context7__resolve-library-id`
3. Query documentation per use case with `mcp__context7__query-docs`
4. Verify key findings against English primary sources (official docs / blog / release notes / RFC)
5. Organize the answer as: Conclusion -> Evidence -> Impact Scope -> Open Items

# Key Rules

- Primary source for technical research is Context7 MCP
- Prefer English versions of technical documentation
- Treat non-primary sources as supplementary; limit assertions to information verified against primary sources
- For "latest" or "as of today" requests, include the reference date, update date, and target version
- For breaking changes, deprecations, and security fixes, verify against release notes / changelog
- Do not mix speculation with facts. Clearly label speculation

# Fallback (Context7 Unavailable)

- Prefer official documentation, official GitHub, and official release notes
- Annotate information obtained through alternative research as "Context7 not used"
- Separate weakly-supported information as additional verification tasks before implementation

# Output Format

- `Conclusion`: key points for the quickest decision
- `Evidence`: source links (English preferred) and key takeaways
- `Impact scope`: affected layers, files, and configuration
- `Open items`: items requiring further investigation

# Quality Checklist

- Library name, version, and runtime environment (Node/Browser/Edge, etc.) are stated
- Sources are primarily first-party
- Dates and versions are consistent
- Speculation and facts are separated
- Actionable next steps directly tied to implementation are provided
