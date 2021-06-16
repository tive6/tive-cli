module.exports = {
  shell: [
    'git status',
    'git add .',
    'git commit -m "配置prettier"',
    'git push origin master',
    'npm publish',
  ],
}
