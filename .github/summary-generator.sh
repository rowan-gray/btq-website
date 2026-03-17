#!/bin/bash

# Converts box-drawing multi-column tables to markdown.
# Handles: single-column title rows (skipped), multi-row cells (merged).
convert_table() {
  sed 's/┌.*┐//; s/├.*┤//; s/└.*┘//' "$1" \
    | sed 's/│/|/g; s/─/ /g' \
    | awk 'NF {print}' \
    | awk '
      /^\|.*\|.*\|/ {
        gsub(/^ *\|/,""); gsub(/\| *$/,"");
        n = split($0, cols, "|");

        if (!header_done) {
          print "|" $0 "|";
          sep = "|";
          for (i=1; i<=n; i++) { c=cols[i]; gsub(/./,"-",c); sep=sep c "|" }
          print sep;
          header_done = 1;
          next
        }

        # Continuation row: first column is blank — merge into previous row
        if (cols[1] ~ /^ *$/) {
          for (i=n; i>=1; i--) {
            v = cols[i]; gsub(/^ +| +$/, "", v);
            if (v != "") { gsub(/ \|$/, " " v " |", stored); break }
          }
          next
        }

        if (stored != "") print stored;
        stored = "|" $0 "|";
      }
      END { if (stored != "") print stored }
    '
}

# Converts semgrep box-drawing output (rich text report) to structured markdown.
convert_semgrep() {
  sed 's/┌.*┐//; s/├.*┤//; s/└.*┘//' "$1" \
    | sed 's/^[[:space:]]*│[[:space:]]*//' \
    | sed 's/[[:space:]]*│[[:space:]]*$//' \
    | awk 'NF' \
    | awk '
      # Summary line: "N Code Findings"
      /^[0-9]+ [A-Za-z].*[Ff]inding/ {
        print "**" $0 "**"; print ""; next
      }
      # Rule ID (starts with Unicode arrow chars ❯❱ or ❱)
      /^[❯❱]/ {
        if (in_code) { print "```"; in_code=0; print "" }
        sub(/^[❯❱ ]+/, "")
        print "**`" $0 "`**"; print ""; next
      }
      # Code line (contains ┆ line-number marker)
      /┆/ {
        if (!in_code) { print ""; print "```"; in_code=1 }
        sub(/┆ */, ": ")
        print; next
      }
      # Details URL
      /^Details: / {
        if (in_code) { print "```"; in_code=0; print "" }
        url = $NF
        print "[Details](" url ")"; print ""; next
      }
      # File path: no spaces, contains /, has an extension
      /^[^ ]+\/[^ ]+\.[a-zA-Z0-9]+$/ {
        if (in_code) { print "```"; in_code=0; print "" }
        print ""; print "---"; print ""; print "#### `" $0 "`"; next
      }
      # Description text and everything else
      {
        print
      }
      END { if (in_code) print "```" }
    '
}

# start summary
echo "## 🔒 SecurePR Scan Report" > summary.md
echo "" >> summary.md

echo "### 🔍 Trivy Results" >> summary.md
convert_table trivy-results.txt >> summary.md
echo "" >> summary.md

echo "###   Semgrep Results" >> summary.md
convert_semgrep semgrep-results.txt >> summary.md
echo "" >> summary.md

echo "_Powered by [Starkseek](https://starkseek.com) 🚀_" >> summary.md
echo "_© $(date +%Y) Starkseek. All rights reserved._" >> summary.md
