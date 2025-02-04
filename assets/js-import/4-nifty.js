var toolkit = {
    do:function(on, id, fun){
        $(document).on(on, id, function(e){
            fun(e)
        });
    },
    request:function(url, type, data, success, error){
        $.ajax({
            url: url,
            type: type,
            data: data,
            success: function(results){
                success(results)
            },
            error: function(results){
                error(results.responseText);
            }
        });     
        
    },
    error:function(e){
        $('.error-block').text(e);
        $('.error-block').slideDown();
        setTimeout(function(){
            $('.error-block').slideUp();
        }, 5000);
    },
    generateUid: function (separator) {
        /// http://stackoverflow.com/a/12223573
        /// <summary>
        ///    Creates a unique id for identification purposes.
        /// </summary>
        /// <param name="separator" type="String" optional="true">
        /// The optional separator for grouping the generated segmants: default "-".    
        /// </param>

        var delim = separator || "-";

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    }
}