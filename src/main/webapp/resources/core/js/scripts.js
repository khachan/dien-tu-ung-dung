$('.paging').bootpag({
   total: 23,
   page: 3,
   maxVisible: 10
}).on('page', function(event, num){
    $(".content2").html("Page " + num); // or some ajax content loading...
});