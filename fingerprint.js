/* FingerprintPA
 * Joseph Jaafari
 * July 15, 2016
 */
var lookup = function(zip) {
        //borrowed from http://docs.cartodb.com/cartodb-platform/cartodb-js/sql/
        var sql = newcartodb.SQL({
            user: 'jjaafari'
        });

        sql.execute("SELECT county, felon_crimes_no_print_county, total_crimes_not_printed_county, police_department, pd_not_printed, pd_no_print_rate from county_copy where county_id in (SELECT DISTINCT id FROM county where zip = {{zip}}) ORDER BY pd_no_print_rate desc limit 1"
        ,{zip:zip})
            .done(function(data) {
                var results = data.rows[0]

                console.log(results);

                $("#felons_no_print").html("In " + results.county + ", there are a total of " + results.total_crimes_not_printed_county + " charges that have no fingerprints attached to them. Out of those, " +
                      results.felon_crimes_no_print_county + " were felonies."); 
                
                $("#biggestOffender").html("The " + results.police_department + " had the lowest fingerprinting rate at " + results.pd_no_print_rate + ". The office did not print " +  results.pd_not_printed + 
                    " people who were charged with crimes in 2015."); 
            })
            
            .error(function(errors) {
                // errors contains a list of errors
                console.log("errors:" + errors);
            });
    }

$(document).ready(function() {

    $("body").on("click", "#calc", function() {
        var zip = parseFloat($("#zipCode").val());
        lookup(zip);})
    });