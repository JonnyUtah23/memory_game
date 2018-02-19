$(document).ready(function () {

  var cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]
  var tries = 0;
  
  // shuffle cards
  function shuffleCards(){
    var random = 0
    var temp = 0
    for(i = 1; i < cards.length; i++){
      random = Math.round(Math.random() * i)
      temp = cards[i]
      cards[i] = cards[random]
      cards[random] = temp
    }
    assignCards()
    console.log('Shuffled cards: ' + cards)
  }

  // assign cards to elements
  function assignCards(){
    $('.card').each(function(index){
      $(this).attr('data-card-value', cards[index])
      cards[index]
    })
    clickCards()
  }

  // card clicked
  function clickCards(){
    $('.card').on('click', function(){
      // take attribute tag and add element with value when clicked
      $(this).html('<p class="card-number">' + $(this).data('cardValue') + '</p>').addClass('selected')
      checkMatch()
    })
  }

  // check if cards match
  function checkMatch(){
    if ($('.selected').length == 2) {
      if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')){
        //cards matched 
        $('.selected').each(function(){
          $(this).addClass('matched')
          //$(this).attr('disabled', 'true').animate({opacity: 50}, 1000).addClass('matched')
        })
        // remove selected class
        $('.selected').each(function(){
          $(this).removeClass('selected')
        })
        checkMatches()
      } 
      else {
        //cards dont match - flip back over
        setTimeout(function() {
          $('.selected').each(function() {
            $(this).html('').removeClass('selected')
          })
        }, 1500)
      } 
      tries += 1;
      $('.tries').text(tries)
      //console.log(tries)
    }
  }

  function checkMatches(){
    if ($('.matched').length === 18){
      alert("You Won!!!")
    }
  }

  $('#restart-game').on('click', function() {
    $('.card').removeClass('matched')
    $('.card-number').remove();
    shuffleCards()
    assignCards()
    clickCards()
  })
  
  shuffleCards()    
})