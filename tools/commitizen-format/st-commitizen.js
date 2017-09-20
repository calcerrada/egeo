"format cjs";

// based in cz-conventional-changelog
const wrap = require('word-wrap');
const _ = require('lodash');
const commitTypes = require('./types.json');

function getMaxLenght(list) {
   return list.reduce((prev, curr) => Math.max(prev, curr.length), 0);
}

module.exports = (function() {

   const keys = Object.keys(commitTypes.types);
   const choices = keys.map(key => ({
      name: `${_.padEnd(key, getMaxLenght(keys))}: ${commitTypes.types[key].description}`,
      value: key
   }));

   return {
      prompter: function(cz, commit) {
         console.log('\nLine 1 will be cropped at 100 characters. All other lines will be wrapped after 120 characters.\n');
         cz.prompt([{
               type: 'input',
               name: 'issue',
               message: 'Jira issue (example: CCT-164) In case of not have related issue use "NA":\n'
            },
            {
               type: 'list',
               name: 'type',
               message: 'Select the type of change that you\'re committing:',
               choices: choices
            }, {
               type: 'input',
               name: 'scope',
               message: 'Denote the scope of this change ($location, $browser, $compile, etc.):\n'
            }, {
               type: 'input',
               name: 'subject',
               message: 'Write a short, imperative tense description of the change:\n'
            }, {
               type: 'input',
               name: 'body',
               message: 'Provide a longer description of the change:\n'
            }, {
               type: 'input',
               name: 'breaking',
               message: 'List any breaking changes:\n'
            }
         ]).then(function(answers) {

            const maxLineWidth = 120;
            const wrapOptions = {
               trim: true,
               newline: '\n',
               indent: '',
               width: maxLineWidth
            };

            // parentheses are only needed when a scope is present
            const scope = answers.scope.trim() ? `(${answers.scope.trim()})` : '';

            // Hard limit this line
            const head = `[${answers.issue}]${answers.type}${scope}: ${answers.subject.trim().slice(0, maxLineWidth)}`;

            // Wrap these lines at 120 characters
            let body = wrap(answers.body, wrapOptions);

            // Apply breaking change prefix, removing it if already present
            const breaking = wrap(answers.breaking.trim() ? '**BREAKING CHANGE:**\n\n' + answers.breaking.trim() : '', wrapOptions);

            commit(head + '\n\n' + body + '\n\n' + breaking);
         });
      }
   };
})();
