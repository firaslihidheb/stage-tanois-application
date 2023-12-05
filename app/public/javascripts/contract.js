getContracts();
function getContracts() {
    $.ajax({
        url: `${api_url}/contract/all`,
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", auth);
        },
        contentType: 'application/json',
        success: function(data, textStatus, jqXHR){
            if(jqXHR.status === 200){
                $('#contracts-table').dataTable({
                    data: data.data,
                    destroy: true,
                    columns: [
                        {data: 'name'},
                        {data: 'label'},
                        {data: 'description'},
                        {data: 'rate'},
                        {data: 'sku'}
                    ],
                    responsive: true
                });
                $('.no_data_found').hide();
                $('#contracts-table').show();
            }
            else if(jqXHR.status === 204){
                $('#contracts-table').hide();
                $('.no_data_found').html('<h3 class="m-t-15">No Contract Found</h3>');
            }
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseJSON);
            $('#contracts-table').hide();
            $('.no_data_found').html('<h3 class="m-t-15">No Contract Found</h3>');
        }
    });
    return false;
}
$(document).ready(function () {

    $(document).on('submit', '.add-contract-form', function () {
        const name = $('input[name="name"]').val();
        const label = $('input[name="label"]').val();
        const description = $('input[name="description"]').val();
        const rate = $('input[name="rate"]').val();
        const sku = $('input[name="sku"]').val();

        let form_data = {name,label,description,rate,sku};
        form_data = JSON.stringify(form_data);

        $.ajax({
            url: `${api_url}/contract/new`,
            type: 'POST',
            contentType :'application/json',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", auth);
            },
            data: form_data,
            success: function(data, textStatus, jqXHR){
                if(jqXHR.status == 200){
                    $('.contract_alert_div').removeClass('alert-danger').addClass('alert-success');
                    $(".contract_alert_div").html("Inserted successfully").show().fadeTo(2000, 500).slideUp(500).hide(0,function () {
                        getContracts();
                        $('.add-contract-form').hide();
                        $('.add-contract-form').trigger("reset");
                        $('.remove_new_contract').hide();
                        $('.add_new_contract').show();
                    });
                }
                else{
                    $(".contract_alert_div").empty().hide().removeClass('alert-success').addClass('alert-danger');
                    $(".contract_alert_div").text("Something didn't work").show().fadeTo(2000, 500).slideUp(500);
                }
            },
            error: function(jqXHR, textStatus, errorThrown){
                $(".contract_alert_div").empty().hide().addClass('alert-danger').removeClass('alert-success');

                if(jqXHR.hasOwnProperty('responseJSON') && jqXHR.responseJSON.hasOwnProperty('message'))
                    $(".contract_alert_div").text(jqXHR.responseJSON.message).show().fadeTo(5000, 500).slideUp(500);
                else
                    $(".contract_alert_div").text("Something didn't work").show(0).delay(3000).hide(0);
            }
        });
        return false;
    });

    $(document).on('click', ".add_new_contract", function () {
        $('.add-contract-form').show();
        $('.remove_new_contract').show();
        $('.add_new_contract').hide();
    })

    $(document).on('click', ".remove_new_contract", function () {
        $('.add-contract-form').hide();
        $('.add-contract-form').trigger("reset");
        $('.remove_new_contract').hide();
        $('.add_new_contract').show();
    })
});