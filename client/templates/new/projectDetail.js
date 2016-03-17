Template.projectDetail.helpers({
  comments: function() {
    return Comments.find({postId: this._id}); //O comment nao esta bom
  },
  ownPost: function() {
  return this.userId === Meteor.userId();
  }
});

Template.projectDetail.rendered = function(){

    // Initialize i-check plugin
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green'
    });
};

