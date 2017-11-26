
$(document).ready(function() {
    
    displayQuoteFromArray();

    $("#next-quote").click(function() {
        $('#site-wrapper').fadeOut();
        getRandomQuote();
    });
    
    function getRandomQuote() {
        $.ajax({
        type: "POST",
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",
        dataType: "json",
        success: displayQuote, 

        //@todo create a function that will display quotes from an array is AJAX fails
        error: displayQuoteFromArray,
        beforeSend: setHeader,
        
    });

    function setHeader(xhr) {
        xhr.setRequestHeader("X-Mashape-Key", "ZZWf2AAJc3mshrwppIuBXTxset1Wp18Q4b9jsnIYFdEZLEcVf2");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Accept", "application/json");
      }
    }

    function displayQuote(response) {
            
            $("#quote").text(response.quote);
            $('#author').text(response.author);
            //update the tweet href
            tweetQuote();
            $('#site-wrapper').fadeIn(1200); 
        }
	
    function displayQuoteFromArray() {
        var movieQuotes = [
            {
                author: "Malcolm X",
                quote: "We didn't land on Plymouth rock! Plymouth rock landed on us. You've been hoodwinked, bamboozled, run amuck and led astray!"
            },
            {
                author: "The Players Club",
                quote: "Make the money, don't let it make you."
            },
            {
                author: "Lean On Me",
                quote: "This is not a damn democracy! We are in a state of emergency and my word is law! There's only one boss around here, and that's me. The HNIC."
            },
            {
                author: "New Jack City",
                quote: "You're incapable of running this city. Sit your five-dollar ass down before I make change."
            },
            {
                author: "The Color Purple",
                quote: "All my life I had to fight. I had to fight my daddy. I had to fight my uncles. I had to fight my brothers. A girl child ain't safe in a family of men, but I ain't never thought I'd have to fight in my own house! I loves Harpo, God knows I do. But I'll kill him dead fo' I let him beat me."
            }
        ];
        var randomNumber = Math.floor(Math.random() * 5);
        displayQuote(movieQuotes[randomNumber]);
        
    }
    
    function tweetQuote() {
        var twitterURL = 'https://twitter.com/intent/tweet?hashtags=RandomQuoteMachine,freeCodeCamp&related=freecodecamp&text="';
        var quote = $("#quote").text();
        var author = $('#author').text();
        twitterURL +=quote +'" - '+ author;
        

        //attach it the URL to the href attribute
        $('#tweet-quote').attr('href', twitterURL);
    }
}); //end of document ready