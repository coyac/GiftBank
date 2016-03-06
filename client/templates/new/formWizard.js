Template.formWizard.rendered = function(){

    // Initialize steps plugin bbb
    $("#wizard").steps();

    $("#form").steps({
        bodyTag: "fieldset",
        onStepChanging: function (event, currentIndex, newIndex)
        {
            // Always allow going backward even if the current step contains invalid fields!
            if (currentIndex > newIndex)
            {
                return true;
            }

            // Forbid suppressing "Warning" step if the user is to young
            if (newIndex === 3 && Number($("#age").val()) < 18)
            {
                return false;
            }

            var form = $(this);

            // Clean up if user went backward before
            if (currentIndex < newIndex)
            {
                // To remove error styles
                $(".body:eq(" + newIndex + ") label.error", form).remove();
                $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
            }

            // Disable validation on fields that are disabled or hidden.
            form.validate().settings.ignore = ":disabled,:hidden";

            // Start validation; Prevent going forward if false
            return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex)
        {
            // Suppress (skip) "Warning" step if the user is old enough.
            if (currentIndex === 2 && Number($("#age").val()) >= 18)
            {
                $(this).steps("next");
            }

            // Suppress (skip) "Warning" step if the user is old enough and wants to the previous step.
            if (currentIndex === 2 && priorIndex === 3)
            {
                $(this).steps("previous");
            }
        },

        onFinishing: function (event, currentIndex)
        {
            var form = $(this);

            // Disable validation on fields that are disabled.
            // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
            form.validate().settings.ignore = ":disabled";

            // Start validation; Prevent form submission if false
            return form.valid();
        },

        onFinished: function (event, currentIndex)
        {
            var form = $(this);

            var post = {
              NomePork: $(event.target).find('[name=NomePork]').val(),
              NomeBenef: $(event.target).find('[name=NomeBenef]').val(),
              EventType: $(event.target).find('[name=EventType]').val(),
              FinalDate: $(event.target).find('[name=FinalDate]').val(),
              ImagePork: $(event.target).find('[name=ImagePork]').val(),
              PorkDescription: $(event.target).find('[name=PorkDescription]').val(),
              TotalValue: $(event.target).find('[name=TotalValue]').val(),
              UsersEmail: $(event.target).find('[name=UsersEmail]').val(),
              ShareLink: $(event.target).find('[name=ShareLink]').val(),
              SuggestedValue: $(event.target).find('[name=SuggestedValue]').val(),
              PaymentType: $(event.target).find('[name=PaymentType]').val()
            };

            //document.write("This is my first JavaScript!");

            //document.write( $(event.target).find('[name=NomePork]').val());
            //document.write( $(event.target).find('[name=EventType]').val());
            //document.write($("#evento option:selected").text());
            //document.write( $(event.target).find('[name=solidariedade]').val());

            //TESTE
            //document.write( $(event.target).find('[name=options]').val());

            Meteor.call('postInsert', post, function(error, result) {
              // display the error to the user and abort
              if (error)
                return throwError(error.reason);

              // show this result but route anyway
              if (result.postExists)
                throwError('This link has already been posted');

              Router.go('projectDetail', {_id: result._id});
            });

            //form.submit();
        }
    }).validate({
        errorPlacement: function (error, element)
        {
            element.before(error);
        },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });

   $( document.body ).on( 'click', '.dropdown-menu li', function( event ) {

      var $target = $( event.currentTarget );

      $target.closest( '.btn-group' )
         .find( '[data-bind="label"]' ).text( $target.text() )
            .end()
         .children( '.dropdown-toggle' ).dropdown( 'toggle' );

      return false;

   });

    $('.datetimepicker').each(function(){
           $(this).datetimepicker();
    });

};
