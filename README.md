# website template

- gulp
- webpack
- Pug
- Sass
- TypeScript

で構成される、静的なウェブサイトを作るときのテンプレート。  
こちらを参考にさせていただきました。 -> [manabuyasuda/website-template](https://github.com/manabuyasuda/website-template)

アコーディオンなどよく使いそうな動作がJavaScriptとCSSで実装済みです。

---

## 組み込まれている動作

インストール、`npm run start`実行後に/test/で確認できます。(準備中)

### アコーディオン

- JavaScript: [src/assets/js/module/common/common-accordion.ts](src/assets/js/module/common/common-accordion.ts)
- CSS: [src/assets/css/object/component/_accordion.scss](src/assets/css/object/component/_accordion.scss)

JSは対象の要素のクラスを変更するだけで、動き自体はCSSで実装する系です。

```pug
div.c-accordion.js-acc
  div.c-accordion__head.js-acc__trg
  div.c-accordion__body
```
 
`.js-acc__trg`をクリックすると`.js-acc`に`is-open`がトグルされます。

### 画像の場所確保

- JavaScript: [src/assets/js/module/common/placeholder.ts](src/assets/js/module/common/placeholder.ts)

上手い表現が思いつかないのですが、いわゆるpadding-topで画像の比率を保持するハック的なやつです。

```pug
div.p-placeholder.js-get-ratio
  div.p-placeholder__spacer.js-get-ratio__spacer
  img.p-placeholder__image.js-get-ratio__item(src=`${_relativePath}assets/img/hoge/fuga.jpg` data-ratio="514/660" alt="")
```

`.js-get-ratio__item`のdata属性`data-ratio`の値を計算して`.js-get-ratio__spacer`に`padding-top`を設定します。  
`data-ratio`の値は`width/height`の形で設定します。  
※`.js-get-ratio__item`などには別途CSSでスタイルを当てる必要があります。

### widthをJSでレスポンシブ指定

- JavaScript: [src/assets/js/module/common/placeholder.ts](src/assets/js/module/common/set-width.ts)

ブレイクポイント768pxを境にJSでwidthを2種類持たせます。主に画像に使います。

```pug
div.js-set-width(data-width="7rem/7rem")
  img(src=`${_relativePath}assets/img/hoge/fuga.jpg` alt="")
```

`.js-set-width`のdata属性`data-width`に値を設定します。  
`/`を境に左辺が768px以下用、右辺が768pxより上用です。

### タブ

- JavaScript: [src/assets/js/module/common/common-tab.ts](src/assets/js/module/common/common-tab.ts)

アコーディオンと同じく、JSはクラスの切り替えを担当し、動作はCSSで行う想定です。

```pug
div.p-tab.js-tab
  div.p-tab__head
    ul.p-tab-labels
      li.p-tab-labels__item.is-current.js-tab__trg
        ~
      li.p-tab-labels__item.js-tab__trg
        ~
      li.p-tab-labels__item.js-tab__trg
        ~
  div.p-tab__body
    div.p-tab__cont.js-tab__cont.is-current
      ~
    div.p-tab__cont.js-tab__cont
      ~
    div.p-tab__cont.js-tab__cont
      ~
```

`.js-tab__trg`をクリックすると、クリックした要素とそれに対応した`.js-tab__cont`に`.is-current`がトグルされます。
※それぞれの要素の順番と数は一致させておく必要があります。

### スムーススクロール

- JavaScript: [src/assets/js/module/common/smooth-scroll.ts](src/assets/js/module/common/smooth-scroll.ts)

普通のスムーススクロールです。href属性が`#`から始まるaタグを対象とし、`.js-go-to-top`を付けるとページ最上部に移動します。

### ローディング

- JavaScript: [src/assets/js/module/common/loading.ts](src/assets/js/module/common/loading.ts)

[imagesLoaded](https://github.com/desandro/imagesloaded)を利用したローディング画面です。`#js-loading`という要素がない場合はローディングを省略できます。

---

## 環境

- Node.js 14.17.4

Node.jsのバージョンはnodenvで固定しています。

---

## 始め方

```bash
npm install
```

---

## ファイル構成

開発を`src`ディレクトリで行い、そこで作業した分はコンパイルされ`htdocs`ディレクトリに出力されます。  
CSSは`/src/assets/css/`、JavaScriptは`/src/assets/js/`にあります。  

---

## タスクについて

### 基本

インストール後、次のコマンドを実行すると開発に必要なgulpとwebpackのタスクが実行されます。

```bash
npm run start
```

- PugをHTMLにコンパイル
- SassをCSSにコンパイル
- TypeScriptをJavaScript ES5にコンパイル
- Browsersyncで動作の確認
- 画像の圧縮

コマンドの詳細については`/package.json`、タスクは`/gulpfile.js`を参照してください。

### 本番環境用

```bash
npm run release
```

SassやTypescriptが圧縮された形でコンパイルされます。

### Typescriptのコード整形

```bash
npm run fix-js
```

### Sassのコード整形

```bash
npm run fix-css
```

---

## TypescriptとSassのコード整形について

PrettierとESLint、Stylelintを併用しています。  
`npm run fix-js`でTypescript、`npm run fix-css`でSassの整形が行われます。それぞれPrettier -> ESLint / StyleLintの順番に実行されます。  
また、[Husky](https://github.com/typicode/husky)と[lint-staged](https://github.com/okonet/lint-staged)を利用して、git commit時には自動で実行されます。

以下、備忘録。

### 併用について

> [FYI]現在は非推奨のライブラリ群
> 参考までですが、昔の記事とかを見ると出てくる、現在は非推奨になったライブラリたちを紹介しておきます。使わないように気をつけましょう。
> - prettier-eslint
>   - prettierで処理した結果を、eslint —fixに渡すことができるが、実行が遅いので推奨ではないらしい
> - eslint-plugin-prettier
>   - eslint --fix実行時に、prettierを実行するプラグイン。現在は非推奨
> - stylelint-prettier
>   - styleint実行時にprettierを実行するものだが、現在は非推奨
>   - https://prettier.io/docs/en/integrating-with-linters.html#notes

- 「PrettierとESLint・Stylelintの併用」 [https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html](https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html)

### 参考

- 「マナリンクのソースコード整形（Prettier, ESLint, StyleLint）設定-2021年5月版」 [https://zenn.dev/manalink/articles/manalink-prettier-stylelint-eslint-202105](https://zenn.dev/manalink/articles/manalink-prettier-stylelint-eslint-202105) (参照: 2022-02-21)
- 「Prettier と ESLint の組み合わせの公式推奨が変わり plugin が不要になった」 [https://blog.ojisan.io/prettier-eslint-cli/#%E7%B5%90%E5%B1%80%E3%81%A9%E3%81%86%E8%A8%AD%E5%AE%9A%E3%81%97%E3%81%9F%E3%82%89%E3%81%84%E3%81%84%E3%81%AE%E3%81%8B](https://blog.ojisan.io/prettier-eslint-cli/#%E7%B5%90%E5%B1%80%E3%81%A9%E3%81%86%E8%A8%AD%E5%AE%9A%E3%81%97%E3%81%9F%E3%82%89%E3%81%84%E3%81%84%E3%81%AE%E3%81%8B) (参照: 2022-02-18)
- 「Prettier 入門 ～ESLintとの違いを理解して併用する～」 [https://qiita.com/soarflat/items/06377f3b96964964a65d](https://qiita.com/soarflat/items/06377f3b96964964a65d) (参照: 2022-02-21)
- 「PrettierとESLint・Stylelintの併用」 [https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html](https://rinoguchi.net/2021/12/prettier-eslint-stylelint.html) (参照: 2022-02-21)
- 「husky v7とlint-stagedでコミット時にリント実行」 [https://rinoguchi.net/2021/12/husky-and-lint-staged.html](https://rinoguchi.net/2021/12/husky-and-lint-staged.html) (参照: 2022-02-22)

---

## Prettierについて

> Prettier の一番の特徴は、Opinionated（独断的な） コードフォーマッターであることを標榜していることです。 これは、ユーザーに自由なカスタマイズを許さず、「Prettier 自身が定義しているスタイルに強制的にフォーマットするよ」ということです（セミコロンの有無など最低限の設定はできます）。 これにより、コーディングスタイルに関する不毛な議論を避けることができ、プロジェクト内のコーディングスタイルを簡単に統一することができます。  
> もちろん、自分がベストだと思っているスタイルでフォーマットすることはできなくなるかもしれませんが、そんな些細なことよりも、アプリケーション（成果物）を作り上げることに集中すべきだという考え方です。

「TypeScript コードを Prettier で自動整形する」 [https://maku.blog/p/au8iu6u/](https://maku.blog/p/au8iu6u/)

### .prettierrc.yml

設定ファイル。  
内容: [Options / Prettier](https://prettier.io/docs/en/options.html)

> このプロジェクトが Prettier を使用していることを知らせるために、設定ファイル（.prettierrc.json や .prettierrc.yml）を作成しておきます。 拡張子を省略して .prettierrc というファイル名にすると、JSON 形式と YAML 形式のどちらでも記述できますが、エディタの補完機能などを有効にするために、.prettierrc.yml のように拡張子は明示しておいた方がよいでしょう。 特別な設定をしないのであれば、設定内容は空っぽで構いません（JSON 形式であれば {}、YAML 形式であれば本当に何も書かないで OK）。
> コメントを入れるために YAML 形式で記述しています

「TypeScript コードを Prettier で自動整形する」 [https://maku.blog/p/au8iu6u/](https://maku.blog/p/au8iu6u/)

### 参考

- 「TypeScript コードを Prettier で自動整形する」 [https://maku.blog/p/au8iu6u/](https://maku.blog/p/au8iu6u/) (参照: 2022-02-18)

---

## ESLintについて

主に[TypeScript + Node.jsプロジェクトにESLint + Prettierを導入する手順2020](https://qiita.com/notakaos/items/85fd2f5c549f247585b1)を参考にさせていただきました。

- VSCodeのESLintプラグインを入れているとリアルタイムでリントしてくれる
- `tsconfig.json -> tsconfig.eslint.json -> .eslintrc.js`の3つで1つの設定ファイルのイメージ(?)
- jsonはコメントを書けないが、`tsconfig.json`や`.eslintrc.json`にはコメントが書ける(*1)(*2)

同じディレクトリに複数の構成ファイルがある場合ESLintは1つだけを使用する。優先順位は次の通り。

1. eslintrc.js
1. eslintrc.cjs
1. eslintrc.yaml
1. eslintrc.yml
1. eslintrc.json
1. package.json

### tsconfig.eslint.json

TypeScriptのESLint設定ファイル。

> 当記事のように、tsconfig.eslint.json（eslint用のTypeScriptのコンパイルファイル。名前はなんでも良い）を作成するか、コンパイルしたいファイルを全てtsconfigファイルのincludesに含める方法があるそうです。  
> なので、includesをTypeScriptのコンパイルと分けて設定したい場合やVSCodeのパフォーマンスを上げたい場合などに設定すると良いと自分は理解しています(なくてもそんなに気にするほどでもないとは思います)。  
> なので別になくてもeslintは動くので、なければ動かないといった性質のものではないです。  
> VSCodeのlintのパフォーマンスが悪い場合などに検討しても良いとは思いますので、直接tsconfig.jsonをeslintrc.jsなどに設定しても良いかもしれませんね（記事を書いておいてなんですが）。

「prettier,eslintを導入する際にハマったこと2021新年」 [https://zenn.dev/ryusou/articles/nodejs-prettier-eslint2021](https://zenn.dev/ryusou/articles/nodejs-prettier-eslint2021)  (参照: 2022-02-22)

### .eslintrc.js

ESLintの設定ファイル。プロジェクトディレクトリ直下に作成する。  
(別のルールを設定したい場合は対象のディレクトリに追加する)

#### extends

あらかじめ用意されたESLintルールのセット。とりあえず次のルールを適用。

- [eslint:recommended](https://eslint.org/docs/rules/)
- [plugin:@typescript-eslint/recommended](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts)
- [plugin:@typescript-eslint/recommended-requiring-type-checking](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts)

#### rules

`extends`に加えて独自に追加するルール。  
今回追加しているのは全てプラグイン[eslint-plugin-eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments)のもの。

### 注釈

- *1 [「tsconfig.jsonはJSONじゃないと言う話」](https://syumai.hateblo.jp/entry/2020/03/31/024751) (参照: 2022-02-18)
- *2 [「Configuration File Formats」](https://eslint.org/docs/user-guide/configuring/configuration-files#configuration-file-formats) (参照: 2022-02-18)

### 参考

- 「TypeScript + Node.jsプロジェクトにESLint + Prettierを導入する手順2020」 [https://qiita.com/notakaos/items/85fd2f5c549f247585b1](https://qiita.com/notakaos/items/85fd2f5c549f247585b1) (参照: 2022-02-18)
- 「eslintを最大限活用してTypeScriptの型安全を少しずつ高める方法」 [https://tech.ga-tech.co.jp/entry/2020/01/refactoring-type-safety-with-eslint](https://tech.ga-tech.co.jp/entry/2020/01/refactoring-type-safety-with-eslint) (参照: 2022-02-18)
- 「prettier,eslintを導入する際にハマったこと2021新年」 [https://zenn.dev/ryusou/articles/nodejs-prettier-eslint2021](https://zenn.dev/ryusou/articles/nodejs-prettier-eslint2021)  (参照: 2022-02-22)
- 「mysticatea/eslint-plugin-eslint-comments」 [https://github.com/mysticatea/eslint-plugin-eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments) (参照: 2022-02-18)
- 「ESLint プラグイン紹介: eslint-plugin-eslint-comments」 [https://qiita.com/mysticatea/items/a2c2deab39d2bea3ca2e](https://qiita.com/mysticatea/items/a2c2deab39d2bea3ca2e) (参照: 2022-02-18)

---

## Stylelintについて

### .stylelintrc.yml

設定ファイル。  

#### extends

ルールに関するところは[stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss)だけを指定(すればOKらしい)。というのも  

- `stylelint-config-standard-scss`は[stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard)と[stylelint-config-recommended-scss](https://github.com/stylelint-scss/stylelint-config-recommended-scss)を継承している
- `stylelint-config-standard`は[stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended)を継承している
- `stylelint-config-recommended-scss`は[stylelint-config-recommended](https://github.com/stylelint/stylelint-config-recommended)を継承している

これら3つ理由のため。  
その他、[stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order)でプロパティの記述順を整頓する。


#### rules

とりあえず実行してみて軽く調整。上書きするルールの確認で結構時間が掛かったのに加えて結局オレオレルールになってることに疑問。  
ルールは次を参照。

- CSS: [List of rules | Stylelint](https://stylelint.io/user-guide/rules/list/)
- SCSS: [stylelint-scss/stylelint-scss](https://github.com/stylelint-scss/stylelint-scss#list-of-rules)

### 参考

- 「Stylelint を導入したときのあれこれ」 [https://lab.astamuse.co.jp/entry/stylelint](https://lab.astamuse.co.jp/entry/stylelint) (参照: 2022-02-21)
