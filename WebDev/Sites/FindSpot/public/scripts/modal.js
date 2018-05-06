$(function() {
	$('#regpassword, #confpassword').keyup(checkPassMatch);

	$('#regusername').tooltip({
		trigger: 'hover focus',
		placement: 'right'
	});
});

function checkPassMatch() {
	var pass = $('#regpassword').val();
	var confpass = $('#confpassword').val();
	var len = confpass.length;

	if ( len < 1 ) {
		$('#regpassword, #confpassword').removeClass('inputError');
		$('#signupBtn').removeClass('formDenied');
	}
	else if ( len > 0) {
		if ( pass != confpass ){
			$('#regpassword, #confpassword').removeClass('passMatched');
			$('#regpassword, #confpassword').addClass('inputError');
			$('#signupBtn').removeClass('formAccepted')
			$('#signupBtn').addClass('formDenied')
		}
		else {
			$('#regpassword, #confpassword').removeClass('inputError');
			$('#regpassword, #confpassword').addClass('passMatched');
			$('#signupBtn').removeClass('formDenied');
			$('#signupBtn').addClass('formAccepted');
		}
	}
}
