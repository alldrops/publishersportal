$(function () {
	var $entry = $('.entry'),
		$appEntry = $('#app_entry'),
		$bookstoreEntry = $('#bookstore_entry'),
		$wundrReceivesApp = $('#wundr_receives_app'),
		$wundrReceivesBookstore = $('#wundr_receives_bookstore'),
		$othersCollectApp = $('#others_collect_app'),
		$yourRoyaltyApp = $('#your_royalty_app'),
		$yourRoyaltyBookstore = $('#your_royalty_bookstore');

	$entry.each(function(){
		var $this = $(this);
		$this.focus(function(){
			var keyUpListener = function() {
				if(isNaN($this.text())) {
					$wundrReceivesApp.text('-');
					$wundrReceivesBookstore.text('-');
					$yourRoyaltyApp.text('-');
					$yourRoyaltyBookstore.text('-');
					$othersCollectApp.text('-');
				} else {
					var amount = + $this.text();
					var othersCollectApp = Math.ceil(amount * 30) / 100;
					var weCollect = Math.ceil(amount * 15) / 100;
					var yourRoyaltyApp = amount - othersCollectApp - weCollect;
					var yourRoyaltyBookstore = amount - weCollect;
					$wundrReceivesApp.text(weCollect.toFixed(2));
					$wundrReceivesBookstore.text(weCollect.toFixed(2));
					$othersCollectApp.text(othersCollectApp.toFixed(2));
					$yourRoyaltyApp.text(yourRoyaltyApp.toFixed(2));
					$yourRoyaltyBookstore.text(yourRoyaltyBookstore.toFixed(2));
					if(this.id === 'app_entry') {
						$bookstoreEntry.text(amount.toFixed(2));
					} else {
						$appEntry.text(amount.toFixed(2));
					}
				}
			};
			$entry.bind('keyup', keyUpListener);
			var blurListener = function() {
				$entry.unbind('keyup', keyUpListener);
				$entry.unbind('blur', blurListener);
			};
			$entry.blur(blurListener);
		});
	});
});