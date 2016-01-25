/**
 * Currently the git functionality feeds off of the post-commit script. This is
 * then limited to capturing things as they are committed. It cannot pick up
 * on new functionality that already happened (the event happened and did
 * not land in UC at anypoint).
 */
var git = {
  newMessage: function(event) {
    if (event.has('git')) {

    }
  },
};

module.exports = git;
