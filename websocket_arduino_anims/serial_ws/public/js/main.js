$(function(){

   $("[data-template]").each(function(){

   	 $(this).html(
   	 	$(
   	 		"#"+
   	 		$(this).data("template")
   	 		).html())
   })

 })