/*let settings     = Meteor.settings.private.mailgun,
    mg           = new Mailgun( { apiKey: settings.apiKey, domain: settings.domain } ),
    listAddress = `customers@${ settings.domain }`,
    list         = mg.api.lists( listAddress );

Meteor.methods({
  addToMailingList( emailAddress ) {
    check( emailAddress, String );

    if ( Meteor.users.findOne( { 'emails.address': emailAddress } ) ) {
      list.members().create({
        subscribed: true,
        address: emailAddress
      }, ( error, response ) => {
        if ( error ) {
          throw new Meteor.Error( 'mailgun-error', error );
        } else {
          console.log( response );
        }
      });
    } else {
      throw new Meteor.Error( 'bad-email', 'Sorry, you\'re not a registered user.' );
    }
  },

  sendToMailingList() {
    mg.send({
      from: listAddress,
      to: listAddress,
      subject: "Testing out our mailing list!",
      text: "This is where we pass our message to users. If we want to send HTML, we rename this field HTML, or, add it as a separate property (to send text as a backup)."
    }, function( error, body ) {
      console.log( body );
    });
  }

});
*/
Meteor.startup( function() {
  process.env.MAIL_URL = "smtp://postmaster%40sandbox0d74e1036f174ffb8c84d802ce35a325.mailgun.org:604ca184547564763b13a8c5e8428bb1@smtp.mailgun.org:587";
});

Meteor.methods({
  sendEmail: function (to, from){
    check([to, from], [String]);

    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: "OLAA",
      text: "Olá Cami, sou a tua app dos porkinhos."
    });

  }
});
