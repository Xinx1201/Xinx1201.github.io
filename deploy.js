const shell = require("shelljs")
shell.exec("git push origin --delete gh-pages", {}, function () {
  shell.exec("git branch -D gh-pages", {}, function () {
    shell.exec("npm run build", {}, function () {
      shell.exec("git checkout -b gh-pages", {}, function () {
        shell.exec("git add -f dist", {}, function () {
          shell.exec("git commit -m 'Jx3_Tool'", {}, function () {
            shell.exec("git subtree push --prefix dist origin gh-pages", {}, function () {
              shell.exec("git checkout main", {}, function () {
              })
            })
          })
        })
      })
    })
  })
})