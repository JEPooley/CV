var ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/JEPooley/cv.git',
        user: {
            name: 'Josh Pooley',
            email: 'joshpooley@gmail.com'
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)