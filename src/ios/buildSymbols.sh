#!/bin/bash

# Set source and destination directories
INPUT_DIR="./svgs"
OUTPUT_DIR="./dist/ios"

# Loop through all SVG files in the source directory
# Loop through all SVG files in the directory
for file in "$INPUT_DIR"/*.svg; do
  # Check if there are any SVG files
  if [[ -e "$file" ]]; then
    # Extract the filename without the path and extension
    filename=$(basename -- "$file")
    filename_no_ext="${filename%.*}"

    output_sfsymbol="$OUTPUT_DIR/${filename_no_ext}.svg"

    # Run the swiftdraw command on each file
    echo "Processing $file..."
    swiftdraw "$file" --format sfsymbol --output "$output_sfsymbol"

  else
    echo "No SVG files found in $INPUT_DIR"
    break
  fi

echo "Conversion complete!"

done