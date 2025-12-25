#!/bin/bash

# helper function to convert box-drawing tables to markdown
convert_table() {
  sed 's/┌.*┐//; s/├.*┤//; s/└.*┘//' "$1" \
    | sed 's/│/|/g; s/─/ /g' \
    | awk 'NF {print}' \
    | awk '
      NR==1 {
        gsub(/^ *\|/,""); gsub(/\| *$/,"");
        print "|" $0 "|";
        n=split($0,cols,"|");
        sep="|";
        for(i=1;i<=n;i++){
          gsub(/[^ ]/,"-",cols[i]);
          sep=sep cols[i] "|"
        }
        print sep;
        next
      }
      {
        gsub(/^ *\|/,""); gsub(/\| *$/,"");
        print "|" $0 "|"
      }'
}

# start summary
echo "## 🔒 SecurePR Scan Report" > summary.md
echo "" >> summary.md

echo "### 🔍 Trivy Results" >> summary.md
convert_table trivy-results.txt >> summary.md
echo "" >> summary.md

echo "### ⚙️ Semgrep Results" >> summary.md
convert_table semgrep-results.txt >> summary.md
echo "" >> summary.md

echo "_Powered by [Starkseek](https://starkseek.com) 🚀_" >> summary.md
echo "_© $(date +%Y) Starkseek. All rights reserved._" >> summary.md