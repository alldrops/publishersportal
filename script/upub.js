$(function(){
	var $third_party_retail_price = $('.third_party_retail_price'),
		$wundrbooks_retail_price = $('.wundrbooks_retail_price'),
		$third_party_apple_collects = $('.third_party_apple_collects'),
		$third_party_wundr_receives = $('.third_party_wundr_receives'),
		$wundrbooks_wundr_receives = $('.wundrbooks_wundr_receives'),
		$third_party_your_royalty = $('.third_party_your_royalty'),
		$wundrbooks_your_royalty = $('.wundrbooks_your_royalty');

	var originalValue = 10.00;
	$third_party_retail_price.keyup(function(){
		var newVal = parseFloat($third_party_retail_price.html());
		if(newVal === null || newVal === "") {
			$third_party_retail_price.html("10.00");
		}
		if(!isNaN(newVal) && newVal > 0){
			originalValue = newVal;
			//$third_party_retail_price.html(newVal.toFixed(2));
			$wundrbooks_retail_price.html(newVal.toFixed(2));
			$third_party_apple_collects.html((newVal * 0.3).toFixed(2));
			$third_party_wundr_receives.html((newVal * 0.05).toFixed(2));
			$wundrbooks_wundr_receives.html((newVal * 0.15).toFixed(2));
			$third_party_your_royalty.html((newVal - newVal * 0.3 - newVal * 0.05).toFixed(2));
			$wundrbooks_your_royalty.html((newVal - newVal * 0.15).toFixed(2));
		}
	});

	$third_party_retail_price.focusout(function(){
		var newVal = parseFloat($third_party_retail_price.html());
		if(isNaN(newVal)) {
			newVal = 0;
			$third_party_retail_price.html("0.00");
			originalValue = newVal;
			//$third_party_retail_price.html(newVal.toFixed(2));
			$wundrbooks_retail_price.html(newVal.toFixed(2));
			$third_party_apple_collects.html((newVal * 0.3).toFixed(2));
			$third_party_wundr_receives.html((newVal * 0.05).toFixed(2));
			$wundrbooks_wundr_receives.html((newVal * 0.15).toFixed(2));
			$third_party_your_royalty.html((newVal - newVal * 0.3 - newVal * 0.05).toFixed(2));
			$wundrbooks_your_royalty.html((newVal - newVal * 0.15).toFixed(2));
		}
	});

});