"devDependencies": {
    "@commitlint/cli": "^14.1.0", // https://github.com/conventional-changelog/commitlint#getting-started
    "@commitlint/config-conventional": "^14.1.0",
    "eslint-config-prettier": "^8.3.0", // https://prettier.io/docs/en/related-projects.html#eslint-integrations
    "husky": "^7.0.4", // https://prettier.io/docs/en/precommit.html
    "lint-staged": "^11.2.6",
    "prettier": "2.4.1" // https://prettier.io/docs/en/install.html
},
"eslintConfig": { // create-create-app 自带 eslint,eslint 主要用来代码检测，包含格式化代码的功能，prettier 功能为格式化代码，同时使用会引起冲突，引入 eslint-config-prettier 解决冲突
"extends": [
    "react-app",
    "react-app/jest",
    "prettier" // eslint-config-prettier 的设置放在这里，这样能保证 eslint 和 prettier 的格式化能正常工作
]
},
"husky": { // husky 用于控制 git hook
    "hooks": {
        "pre-commit": "lint-staged", // 这里在预提交时调用 lint-staged
        "commit-msg": "commitlint -e $HUSKY_GIT_PARAMS" // git message不符合规范时提交会被拒绝,commit-msg配置在commitlint.config.js文件中
    }
},
"lint-staged": { // lint-staged 用于在 git 提交时运行 prettier,且文件范围仅在{}文件之中
    "\*.{js,css,md,ts,tsx}": "prettier --write"
}
