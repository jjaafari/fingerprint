/* FingerprintPA
 * Joseph Jaafari
 * July 15, 2016
 */

var lookup = function(zip) {
        //borrowed from http://docs.cartodb.com/cartodb-platform/cartodb-js/sql/
        var sql = new cartodb.SQL({
            user: 'jjaafari'
        });

        sql.execute("SELECT county, felon_crimes_no_print_county, total_crimes_not_printed_county, police_department, pd_not_printed, pd_no_print_rate from county_copy where county_id in (SELECT DISTINCT id FROM county where zip = {{zip}}) ORDER BY pd_not_printed desc limit 1", {
            zip: zip
        })
            .done(function(data) {
                var results = data.rows[0]

                console.log(results);

                $("#felons_no_print").html("In " + results.county + " County, there are a total of " + results.total_crimes_not_printed_county + " charges that have no fingerprints attached to them. Out of those, " +
                      results.felon_crimes_no_print_county + " were felonies."); 
                
                $("#biggestOffender").html("The " + results.police_department + " did not fingerprint " + results.pd_not_printed + " people for criminal charges, the highest in the county. The office's average fingerprint rate for all crimes in 2015 was " + results.pd_no_print_rate + "."); 
            })
            
            .error(function(errors) {
                // errors contains a list of errors
                console.log("errors:" + errors);
            });
    }

$(document).ready(function() {

    $("body").on("click", "#calc", function() {
        var zip = parseFloat($("#zipCode").val());
        lookup(zip);
    });

  });