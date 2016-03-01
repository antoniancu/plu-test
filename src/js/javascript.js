$( document ).ready(function(){
  //Toggle Product Variant Dropdown List
  $('.button.select').on('click', function(event){
    event.preventDefault();
    $(this).next('.dropdown-menu').slideToggle('fast');
  });

  //Change Product Image based on the dropdown selection
  $('ul.dropdown-menu li').on('click', function(){
    var variant = $(this).data('variant');
    variantLabel = variant.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase();
    });
    var url;

    switch(variant) {
      case 'lemon' :
        url = 'src/product-images/Lemon.png';
        break;
      case 'sandalwood' :
        url = 'src/product-images/Sandalwood.png';
        break;
      case 'lavender' :
        url = 'src/product-images/Lavender.png';
        break;
    }
    $('#test-variable-image').attr('src', url); //change the url of the product variant Image
    $('.variation').text(variant); //set the Product label on the card
    var parent = $(this).parent();
    parent.prev('button').text(variantLabel); //set the Product label on the button
    parent.slideToggle('fast'); //toggle the menu closed;
  });
  //Toggle an easter egg event when you click a button or an image that's still in dev mode.
  $('.buy-now, #buynow-alert, img').on('click', function(){
    $('#buynow-alert').fadeToggle('medium');
  });
});
