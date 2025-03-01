#!/bin/bash

# pdfmakeをブラウザで利用するために必要なフォントを生成するスクリプト。
# ブラウザでPDFを生成する場合は Virtual file system を使って、その中にフォントのデータが無いといけない
# PDF内に日本語を使えるようにしたいためにカスタムフォントを使う必要がある
# 参考: https://pdfmake.github.io/docs/0.1/fonts/custom-fonts-client-side/vfs/

# ワーキングディレクトリをPJルートに固定
cd "$(dirname "$0")/.."
PDFMAKE_ROOT_PATH='./node_modules/pdfmake'
FONT_NAME='KosugiMaru-Regular.ttf'

mkdir -p ${PDFMAKE_ROOT_PATH}/examples/fonts
cp ./tool/${FONT_NAME} ${PDFMAKE_ROOT_PATH}/examples/fonts/

cd ${PDFMAKE_ROOT_PATH}
node build-vfs.js ./examples/fonts/

# PDFMAKE_ROOT_PATHの下のbuild/vfs_fonts.jsが新しくなるので、それを手動でコピーして使うこと
